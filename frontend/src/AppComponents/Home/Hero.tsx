// src/components/Hero.tsx
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CreateRoom from "../CreateRoom/CreateRoom";
import JoinRoom from "../CreateRoom/JoinRoom";

// Super simple particle config - we'll make these VERY visible
const PARTICLES = Array.from({ length: 120 }).map((_, i) => ({
  id: i,
  size: Math.random() * 10 + 10, // Larger size
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 10 + 5,
  color: `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(
    Math.random() * 200
  )}, 255, 0.4)`, // Bright blueish colors
}));

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const textVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const buttonVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "backOut",
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
  },
};
// console.log("I'm rendered")

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-purple-950">
      {/* BIG VISIBLE PARTICLES */}
      <div className="absolute inset-0 z-0">
        {PARTICLES.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: particle.color,
            }}
            animate={{
              x: [0, 50, 0, -50, 0],
              y: [0, 25, 50, 25, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content - positioned ABOVE particles */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 h-full flex items-center justify-center"
      >
        <div className="text-center max-w-3xl mx-auto px-4">
          <motion.h1
            variants={textVariants}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white"
          >
            Test Your{" "}
            <motion.span
              className="text-purple"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Knowledge
            </motion.span>{" "}
            in Realtime
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="text-lg text-gray-400 mb-8"
          >
            Create, join, and compete in live quizzes with friends.
            <motion.span
              className="block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Instant results, leaderboards, and endless fun!
            </motion.span>
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="flex gap-4 justify-center"
          >
            <motion.div variants={buttonVariants}>
              <CreateRoom trigger={<Button>Create Room</Button>} />
            </motion.div>
            <motion.div variants={buttonVariants}>
              <JoinRoom trigger={<Button variant="outline">Join Room</Button>}/>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
