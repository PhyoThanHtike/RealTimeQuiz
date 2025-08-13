import Room from "../models/room.model.js";
import { io } from "../lib/socket.js";
import axios from "axios";

export const createRoom = async (req, res) => {
  try {
    const { roomName, quizCount, quizTime } = req.body;
    const room = new Room({
      creator: req.user._id,
      roomName: roomName,
      quizCount: quizCount,
      quizTime: quizTime,
      status: "waiting",
    });
    await room.save();
    res.status(201).json({
      room,
      message: "Room created successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: err.message });
  }
};

export const joinRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);

    if (room.status !== "active" && room.status !== "started") {
      return res.status(400).json({ message: "Room is not active" });
    }

    // Skip adding creator as a participant
    if (room.creator.toString() === req.user._id.toString()) {
      return res.status(200).json({ room, message: "Room joined successfully" });
    }

    const existingParticipant = room.participants.find(
      (p) => p.userId.toString() === req.user._id.toString()
    );

    if (!existingParticipant) {
      room.participants.push({
        userId: req.user._id,
        userName: req.user.userName,
        score: 0,
        responseTimes: [],
      });
      await room.save();
    }

    res.status(200).json({ room, message: "Room joined successfully" });
  } catch (error) {
    console.log("Error in Room controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getRooms = async (req, res) => {
  try {
    const creator = req.user._id;
    const rooms = await Room.find({ creator });
    if (!rooms) {
      return res
        .status(404)
        .json({ message: "No rooms have been created for this user!" });
    }
    res.status(200).json({
      rooms,
      message: "Rooms found!",
    });
  } catch (error) {
    console.log("Error in Room controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRoomFromId = async (req, res) => {
  try {
    // const creator = req.user._id;
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room Not Found!" });
    }
    res.status(200).json({
      room,
      message: "Room Found!",
    });
  } catch (error) {
    console.log("Error in Room controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GENERATE QUIZ WITHOUT FILE
export const generateQuizForRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { prompt, topic } = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Call FastAPI /generate-quiz/json
    const response = await axios.post(
      "http://localhost:8000/generate-quiz/json",
      {
        prompt,
        num_questions: room.quizCount,
        topic,
      }
    );

    const questions = response.data.questions.map((q) => ({
      question: q.question,
      options: q.options,
      correctAnswer: q.correct_answer,
      explanation: q.explanation,
      timeLimit: room.quizTime,
    }));

    room.questions = questions;
    room.status = "active";
    await room.save();

    res.status(200).json({
      message: "Quiz generated successfully",
      room,
    });
  } catch (err) {
    console.error("Error generating quiz:", err.response?.data || err.message);
    return res.status(500).json({ error: err.message });
  }
};

// GENERATE QUIZ WITH FILE
export const generateQuizForRoomWithFile = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { prompt, topic } = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const filePath = path.resolve(req.file.path);

    // Prepare FormData for file upload
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("num_questions", room.quizCount);
    formData.append("topic", topic || "");
    formData.append("file", fs.createReadStream(filePath));

    const response = await axios.post(
      "http://localhost:8000/generate-quiz/file",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    const questions = response.data.questions.map((q) => ({
      question: q.question,
      options: q.options,
      correctAnswer: q.correct_answer,
      explanation: q.explanation,
      timeLimit: room.quizTime,
    }));

    room.questions = questions;
    await room.save();

    res.status(200).json({
      message: "Quiz generated successfully from file",
      room,
    });
  } catch (err) {
    console.error(
      "Error generating quiz with file:",
      err.response?.data || err.message
    );
    return res.status(500).json({ error: err.message });
  }
};
