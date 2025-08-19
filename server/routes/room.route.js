import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createRoom,
  deleteRoom,
  generateQuizForRoom,
  generateQuizForRoomFile,
  getRoomFromId,
  getRooms,
  joinRoom,
  resetRoom,
} from "../controller/room.controller.js";
import {
  fileUploadMiddleware,
  validateFileUpload,
} from "../middleware/fileUpload.middleware.js";

const router = express.Router();

router.post("/create", protectRoute, createRoom); //Create Room
router.post("/join/:roomId", protectRoute, joinRoom); //Join Room
router.get("/getrooms", protectRoute, getRooms); //Get All Rooms
router.get("/getroomfromid/:roomId", protectRoute, getRoomFromId); //Get Room By ID
router.post("/generate-quiz/json/:roomId", protectRoute, generateQuizForRoom); //Generate Quiz For Room no file
router.post(
  "/generate-quiz/file/:roomId",
  protectRoute,
  (req, res, next) => req.app.upload.single("file")(req, res, next),
  generateQuizForRoomFile
); //Generate Quiz for room with file
router.delete("/delete-room/:roomId", protectRoute, deleteRoom); //Delete Room
router.put("/reset-room/:roomId", protectRoute, resetRoom); //Reset Room

export default router;
