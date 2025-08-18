import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import authRoutes from './routes/auth.route.js';
import roomRoutes from './routes/room.route.js';
import cookieParser from "cookie-parser";
import { app, server } from './lib/socket.js';
import expressFileUpload from "express-fileupload";

dotenv.config()

// const app = express();
app.use(cookieParser());
app.use(expressFileUpload());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/room", roomRoutes);

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        server.listen(process.env.PORT, ()=>{
            console.log(`Server listening on port ${process.env.PORT}`);
        })
    })
    .catch((err)=>console.error("MONGODB error", err));