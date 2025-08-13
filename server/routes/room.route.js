import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { createRoom, generateQuizForRoom, getRoomFromId, getRooms, joinRoom } from "../controller/room.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createRoom);
router.post("/join/:roomId", protectRoute, joinRoom);
router.get("/getrooms", protectRoute, getRooms);
router.get("/getroomfromid/:roomId", protectRoute, getRoomFromId);
router.post("/generate-quiz/json/:roomId", protectRoute, generateQuizForRoom);

export default router;