import express from "express";
import passport from "passport";
import { generateToken } from "../lib/utils.js";

const router = express.Router();
const FRONTEND_URL = "http://localhost:5173";

// Start OAuth flow
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${FRONTEND_URL}/auth`, // or frontend fallback
  }),
  (req, res) => {
    try {
      generateToken(req.user._id, res);
      
      const userData = {
        _id: req.user._id.toString(),
        userName: req.user.userName,
        email: req.user.email,
        profilePicture: req.user.profilePicture || ""
      };

      // URL encode the data for safety
      const queryParams = new URLSearchParams(userData).toString();
      res.redirect(`${FRONTEND_URL}/auth/success?${queryParams}`);
    } catch (error) {
      console.error("Google callback error:", error);
      res.redirect(`${FRONTEND_URL}/auth`);
    }
  }
);

export default router;
