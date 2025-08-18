import Room from "../models/room.model.js";
import { io } from "../lib/socket.js";
import axios from "axios";
import fs from "fs";
import path from "path";
import cloudinary from "../lib/cloudinary.js";

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
      return res
        .status(200)
        .json({ room, message: "Room joined successfully" });
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

export const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    if (!roomId) {
      return res.status(400).json({ message: "Room ID is required" });
    }

    const response = await Room.findOneAndDelete({ _id: roomId });

    if (!response) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({
      message: "Room deleted successfully",
    });
  } catch (error) {
    console.log("Error in Room controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user._id;

    // Validate roomId
    if (!roomId) {
      return res.status(400).json({ message: "Room ID is required" });
    }

    // Find the room
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Check if the user is the creator
    if (room.creator.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Only the creator can reset the room" });
    }

    // Reset the room fields
    room.status = "active";
    room.phase = "waiting";
    room.currentQuestion = 0;
    room.participants = [];

    // Save the updated room
    await room.save();

    return res.status(200).json({ message: "Room has been reset successfully", room });
  } catch (error) {
    console.error("Error resetting room:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////GENERATE QUIZZES FOR ROOMS//////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
// GENERATE QUIZ WITH FILE USING CLOUDINARY
export const generateQuizForRoomWithFile = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { prompt, topic } = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const file = req.files.file;

    // Upload file to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(file.tempFilePath || file.tempFilePath || file.tempFilePath || file.tempFilePath, {
      resource_type: "raw",
      folder: "quiz_uploads",
    });

    const uploadedFileUrl = cloudinaryResult.secure_url;

    // Download the uploaded file to a temporary path
    const responseFromCloudinary = await axios.get(uploadedFileUrl, {
      responseType: "stream",
    });

    const tempPath = path.resolve(`./temp/${file.name}`);
    const writer = fs.createWriteStream(tempPath);
    await new Promise((resolve, reject) => {
      responseFromCloudinary.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    // Prepare FormData
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("num_questions", room.quizCount);
    formData.append("topic", topic || "");
    formData.append("file", fs.createReadStream(tempPath));

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

    // Clean up local file
    fs.unlinkSync(tempPath);

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
