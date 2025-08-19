import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.route.js';
import roomRoutes from './routes/room.route.js';
import cookieParser from "cookie-parser";
import { app, server } from './lib/socket.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Make sure uploads folder exists
const uploadFolder = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Configure multer to save files with original names
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    // Save the file as its original name
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Add multer to app
app.upload = upload;

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/room", roomRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("MONGODB error", err));
