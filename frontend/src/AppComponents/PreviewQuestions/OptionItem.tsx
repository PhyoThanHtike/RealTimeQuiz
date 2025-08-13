import React from "react";
import { motion } from "framer-motion";

interface OptionItemProps {
  option: string;
  index: number;
  isCorrect: boolean;
}

const OptionItem: React.FC<OptionItemProps> = ({ option, index, isCorrect }) => {
  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`p-4 rounded-lg mb-2 border ${
        isCorrect
          ? "bg-green-200 border-green-600"
          : "bg-white border-gray-200"
      } shadow-sm`}
    >
      <div className="flex items-center">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
            isCorrect ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          {String.fromCharCode(65 + index)}
        </div>
        <span className="text-gray-800">{option}</span>
        {/* <span>{isCorrect}</span> */}
      </div>
    </motion.div>
  );
};

export default OptionItem;

