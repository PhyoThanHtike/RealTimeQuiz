from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import json
import os
import tempfile
import re
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import PyPDFLoader, TextLoader, Docx2txtLoader
# from langchain_community.document_loaders import PyPDFLoader
from langchain.vectorstores import Chroma
from dotenv import load_dotenv

load_dotenv()
geminiApi = os.getenv("GEMINI_API_KEY")
if not geminiApi:
    raise RuntimeError("GEMINI_API_KEY not found in environment variables")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuizRequestJSON(BaseModel):
    prompt: str
    num_questions: int = 5
    topic: Optional[str] = None

class Question(BaseModel):
    question: str
    options: List[str]
    correct_answer: int
    explanation: Optional[str] = None

QUIZ_PROMPT_TEMPLATE = """
You are an expert quiz generator. Generate {num_questions} multiple choice questions based on the following context.

{context}

Additional instructions: {prompt}

For each question:
1. Make it clear and concise
2. Provide exactly 4 plausible options
3. Mark the correct answer with its index (0-3)
4. Include an explanation

Return ONLY a valid JSON array of questions. 
Example format:
[
  {{
    "question": "Question text",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correct_answer": 1,
    "explanation": "Explanation text"
  }}
]
"""

def generate_from_context(context: str, prompt: str, num_questions: int):
    prompt_template = PromptTemplate(
        template=QUIZ_PROMPT_TEMPLATE,
        input_variables=["num_questions", "context", "prompt"]
    )
    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash-001", google_api_key=geminiApi)
    chain = LLMChain(llm=llm, prompt=prompt_template)
    return chain.run(num_questions=num_questions, context=context, prompt=prompt)

def clean_json_output(text: str) -> str:
    """Remove Markdown fences and extract only JSON."""
    text = re.sub(r"^```(?:json)?", "", text.strip(), flags=re.IGNORECASE)
    text = re.sub(r"```$", "", text.strip())
    text = text.strip()

    match = re.search(r"(\[.*\]|\{.*\})", text, re.DOTALL)
    if match:
        return match.group(1).strip()
    return text

def ensure_complete_questions(questions_data: List[dict]) -> List[dict]:
    """Fill in missing fields with defaults so Pydantic won't fail."""
    fixed = []
    for q in questions_data:
        fixed.append({
            "question": q.get("question", "").strip(),
            "options": q.get("options", []) if isinstance(q.get("options"), list) else [],
            "correct_answer": q.get("correct_answer", 0),
            "explanation": q.get("explanation", None)
        })
    return fixed

@app.post("/generate-quiz/json")
async def generate_quiz_json(request: QuizRequestJSON):
    context = f"The topic is: {request.topic}" if request.topic else f"General topic based on: {request.prompt}"

    result = generate_from_context(context, request.prompt, request.num_questions)
    cleaned_result = clean_json_output(result)

    try:
        raw_questions = json.loads(cleaned_result)
        if not isinstance(raw_questions, list):
            raise ValueError("Expected a JSON array of questions")
        questions_data = ensure_complete_questions(raw_questions)
        questions = [Question(**q) for q in questions_data]
    except Exception:
        raise HTTPException(status_code=500, detail="Invalid JSON from LLM")

    return {"questions": [q.model_dump() for q in questions]}

@app.post("/generate-quiz/file")
async def generate_quiz_file(
    prompt: str = Form(...),
    num_questions: int = Form(5),
    topic: Optional[str] = Form(None),
    file: UploadFile = File(...)
):
    # Read uploaded file into a temp file
    contents = await file.read()
    with tempfile.NamedTemporaryFile(delete=False, suffix=file.filename) as tmp:
        tmp.write(contents)
        tmp_path = tmp.name

    print("Wrote file to:", tmp_path, "size:", len(contents))

    # Choose loader based on extension
    ext = os.path.splitext(file.filename)[1].lower()
    if ext == ".pdf":
        loader = PyPDFLoader(tmp_path)
    elif ext == ".txt":
        loader = TextLoader(tmp_path)
    elif ext in [".docx", ".doc"]:
        loader = Docx2txtLoader(tmp_path)
    else:
        os.unlink(tmp_path)
        raise HTTPException(status_code=400, detail="Unsupported file type")

    docs = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(docs)

    # Init embeddings with higher timeout
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=geminiApi,
        request_timeout=60,   # prevent early timeout
    )

    # Batch embed to avoid 504 errors
    batch_size = 50
    all_embeddings = []
    for i in range(0, len(chunks), batch_size):
        batch = chunks[i:i+batch_size]
        try:
            db = Chroma.from_documents(batch, embedding=embeddings, persist_directory=None)
            if not all_embeddings:
                all_embeddings = db
            else:
                all_embeddings.add_documents(batch)
        except Exception as e:
            print(f"Embedding batch {i//batch_size+1} failed: {e}")

    if not all_embeddings:
        os.unlink(tmp_path)
        raise HTTPException(status_code=500, detail="Embedding failed for all chunks")

    # Search for relevant docs
    relevant_docs = all_embeddings.similarity_search(prompt or "key concepts", k=3)
    context = "\n".join([doc.page_content for doc in relevant_docs])

    # Clean up temp file
    os.unlink(tmp_path)

    # Generate quiz
    result = generate_from_context(context, prompt, num_questions)
    cleaned_result = clean_json_output(result)

    try:
        raw_questions = json.loads(cleaned_result)
        if not isinstance(raw_questions, list):
            raise ValueError("Expected a JSON array of questions")
        questions_data = ensure_complete_questions(raw_questions)
        questions = [Question(**q) for q in questions_data]
    except Exception:
        raise HTTPException(status_code=500, detail="Invalid JSON from LLM")

    return {"questions": [q.model_dump() for q in questions]}
