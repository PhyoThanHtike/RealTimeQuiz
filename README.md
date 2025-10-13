# RealTimeQuiz 🎓⚡

[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=for-the-badge)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwind-css&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-FC2C2C?logo=framer&logoColor=white&style=for-the-badge)](https://www.framer.com/motion/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=for-the-badge)](https://expressjs.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?logo=socket.io&logoColor=white&style=for-the-badge)](https://socket.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge)](https://www.mongodb.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white&style=for-the-badge)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white&style=for-the-badge)](https://fastapi.tiangolo.com/)
[![LangChain](https://img.shields.io/badge/LangChain-4B0082?logo=python&logoColor=white&style=for-the-badge)](https://www.langchain.com/)
[![ChromaDB](https://img.shields.io/badge/ChromaDB-FF6F61?logo=python&logoColor=white&style=for-the-badge)](https://www.trychroma.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?logo=google&logoColor=white&style=for-the-badge)](https://gemini.google/)

## 📝 About

Real-Time Quiz App with creating/joining quiz rooms, featuring **AI-generated quizzes** for engaging multiplayer learning experiences.  
Designed for **teachers and students** to make learning fun, interactive, and competitive.

## 🚀 Features

- Real-time quiz with multiple players  
- Quiz creation and management  
- Leaderboard  
- Timer per question  
- Authentication / OAuth (Google login)  
- AI-generated quizzes powered by **Google Gemini + LangChain**  

## 🛠 Tech Stack

| Frontend | Backend | Database | AI & Tools |
|----------|---------|----------|------------|
| React, TypeScript, TailwindCSS, Framer Motion, Redux | Node.js, Express.js, Socket.IO, FastAPI, Python | MongoDB, ChromaDB | Google Gemini, LangChain, Cloudinary, JWT, OAuth |

## 📂 Folder Structure
- **frontend/**: Modern React application with Tailwind CSS for styling and Redux for state management
- **server/**: Node.js backend with Express framework and Socket.IO for real-time communication
- **GenerateQuiz/**: Python service using FastAPI, LangChain, and ChromaDB for AI-powered quiz generation


## ⚡ Quick Start

### Prerequisites
- Node.js & npm installed  
- Python 3.10+  
- MongoDB instance  
- Google OAuth credentials  
- Cloudinary account (optional for image uploads)  

### Installation & Setup


## 1. Clone the repository
```bash
git clone https://github.com/PhyoThanHtike/RealTimeQuiz.git
cd RealTimeQuiz
```
## 2. Setup Backend
```bash
cd server
npm install

# Create .env file with following variables:
# PORT=5000
# MONGO_URL=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key
# GOOGLE_CLIENT_ID=your_google_oauth_client_id
# GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
# GOOGLE_CALLBACK_URL=your_google_oauth_callback_url
# SESSION_SECRET=your_session_secret
# CLOUDINARY_CLOUD_NAME=your_cloudinary_name
# CLOUDINARY_API_KEY=your_cloudinary_api_key
# CLOUDINARY_API_SECRET=your_cloudinary_api_secret

npm run dev
```
## 3. Setup Frontend (in new terminal)
```bash
cd ../frontend
npm install
# Create .env file
# VITE_BASE_URL=http://localhost:5000
npm run dev
```
##4. Setup AI Quiz Generator (in new terminal)
```bash
cd ../GenerateQuiz
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
## 🖥️ Usage
Start all services (Backend, Frontend, and AI Generator)

Host / Admin creates a room where users can join with AI generated questions & time limits

Participants join using a quiz code

Start quiz → questions are delivered in real-time

Players submit answers within the time limit

Results and leaderboard are displayed live

## 🤝 Contributing

Welcome contributions from the community! Here's how you can help:

## Development Process

1. **Fork the repository**
2. **Create a feature branch**  
   `git checkout -b feature/foo`
3. **Commit your changes**  
   `git commit -m "Add foo feature"`
4. **Push to the branch**  
   `git push origin feature/foo`
5. **Open a Pull Request**

## 📄 License

This project is licensed under the **MIT License**.

## ❤️ Acknowledgements

This project was inspired by and built with:

- **Inspiration**: Real-time quiz platforms like Kahoot
- **AI Technology**: Quiz generation powered by Google Gemini, LangChain, and ChromaDB
- **Real-time Infrastructure**: Socket.IO + FastAPI for seamless real-time interactions
