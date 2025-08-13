import { motion, type Variants } from "framer-motion";
import React from "react";

const ProTips = () => {
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  return (
    <motion.div
      variants={itemVariants}
      className="mt-12 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm p-8"
    >
      <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-3 text-lg">
        <div className="p-2 rounded-full bg-blue-100 text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        Pro Tips for Best Results
      </h3>
      <ul className="text-gray-700 space-y-3 pl-2">
        <motion.li whileHover={{ x: 5 }} className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">•</span>
          <span>
            Be specific about question types (e.g., "5 true/false and 5 multiple
            choice")
          </span>
        </motion.li>
        <motion.li whileHover={{ x: 5 }} className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">•</span>
          <span>
            Specify difficulty level (beginner, intermediate, advanced)
          </span>
        </motion.li>
        <motion.li whileHover={{ x: 5 }} className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">•</span>
          <span>Upload reference documents for context-aware questions</span>
        </motion.li>
        <motion.li whileHover={{ x: 5 }} className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">•</span>
          <span>Combine topic and detailed prompt for optimal results</span>
        </motion.li>
      </ul>
    </motion.div>
  );
};

export default ProTips;
