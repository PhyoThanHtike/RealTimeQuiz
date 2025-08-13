import React from "react";
import { motion } from "framer-motion";
import type { roomData } from "@/apiEndpoints/Room";

interface HeaderProps {
  room: roomData;
}

const Header: React.FC<HeaderProps> = ({ room }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 rounded-xl shadow-lg mb-8"
    >
      <h1 className="text-2xl font-bold mb-2">Quiz Preview: {room.roomName}</h1>
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="bg-white text-gray-600 bg-opacity-20 px-3 py-1 rounded-full">
          <span className="font-medium">Questions:</span> {room.quizCount}
        </div>
        <div className="bg-white text-gray-600 bg-opacity-20 px-3 py-1 rounded-full">
          <span className="font-medium">Created by:</span> {room.creator}
        </div>
        <div className="bg-white text-gray-600 bg-opacity-20 px-3 py-1 rounded-full">
          <span className="font-medium">Participants:</span>{" "}
          {room.participants.length}
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
