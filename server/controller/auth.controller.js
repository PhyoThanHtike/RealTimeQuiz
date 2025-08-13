import axios from "axios";
import User from "../models/auth.model.js";
import express from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const verifyUser = async (req, res) => {
  const { idToken } = req.body;

  try {
    const verifyResponse = await axios.post(
      "https://api.line.me/oauth2/v2.1/verify",
      new URLSearchParams({
        id_Token: idToken,
        client_id: process.env.LINE_CHANNEL_ID,
      }).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { name, picture, sub: userId } = verifyResponse.data;
    const user = await User.findOneAndUpdate(
      { userId },
      { name, picture },
      { new: true, upsert: true }
    );
    return res.json({ message: "User verified", user });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Token verification failed", details: err });
  }
};

export const signUp = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("password: ", password);
    console.log("hashedPassword: ", hashedPassword);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid Credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(404).json({
        message: "Incorrect Password",
      });
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logOut = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      message: "Logged Out successfully",
    });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) =>{
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkin controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}