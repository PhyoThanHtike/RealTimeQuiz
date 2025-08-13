import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: String, // matches FastAPI
  options: [String],
  correctAnswer: Number, // matches FastAPI
  explanation: String,
  timeLimit: { type: Number, default: 10 }, // seconds
});

const ParticipantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userName: { type: String },
  score: { type: Number, default: 0 },
  responseTimes: [Number], // time taken for each question in ms
});

const RoomSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  roomName: { type: String, required: true },
  documents: [String], // paths to uploaded files
  questions: [QuestionSchema],
  participants: [ParticipantSchema],
  quizCount: { type: Number, default: 5 },
  quizTime: { type: Number, default: 10 },
  currentQuestion: { type: Number, default: -1 },
  status: {
    type: String,
    enum: ["waiting", "active", "started", "finished"],
    default: "waiting",
  },
  phase: {
    type: String,
    enum: ["waiting", "question", "leaderboard", "finished"],
    default: "waiting",
  },
  createdAt: { type: Date, default: Date.now },
  startedAt: { type: Date },
  finishedAt: { type: Date },
});
const Room = mongoose.model("Room", RoomSchema);
export default Room;

// models/Room.js
// const QuestionSchema = new mongoose.Schema({
//   text: String,
//   options: [String],
//   correctAnswer: Number, // index of correct option
//   timeLimit: Number // in seconds
// });
