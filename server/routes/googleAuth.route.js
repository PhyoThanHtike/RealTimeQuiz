import express from "express";
import passport from "passport";
import { generateToken } from "../lib/utils.js";

const router = express.Router();

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
    failureRedirect: "/login", // or frontend fallback
  }),
  (req, res) => {
    // Send JWT cookie
    generateToken(req.user._id, res);

    // Redirect after success
    res.redirect("http://localhost:5173"); // or your frontend dashboard
  }
);

export default router;
