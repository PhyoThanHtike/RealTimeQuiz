import express from "express";
import { checkAuth, login, logOut, signUp, verifyUser } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/verify", verifyUser);
router.post("/login", login);
router.post("/signup", signUp);
router.post("/logout", logOut);
router.get("/check", protectRoute, checkAuth);

export default router;