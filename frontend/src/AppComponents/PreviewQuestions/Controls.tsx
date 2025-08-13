import React from "react";
import { motion } from "framer-motion";

interface ControlsProps {
  currentIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onStart: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  currentIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onStart,
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-between items-center mt-6"
      >
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded-lg ${
            currentIndex === 0
              ? "bg-gray-200 text-gray-400 cursor-pointer"
              : "bg-blue-500 text-white cursor-pointer"
          } shadow-sm`}
        >
          Previous
        </button>
        <span className="text-gray-600 font-medium">
          {currentIndex + 1} / {totalQuestions}
        </span>
        {currentIndex === totalQuestions - 1 ? (
          <button
            onClick={onStart}
            className="px-6 py-2 cursor-pointer bg-shade text-white rounded-lg shadow-sm hover:bg-green-600 transition-colors"
          >
            Start Quiz
          </button>
        ) : (
          <button
            onClick={onNext}
            className="px-4 cursor-pointer w-[100px] py-2 bg-purple text-white rounded-lg shadow-sm"
          >
            Next
          </button>
        )}
      </motion.div>
      <div className="flex items-center justify-center py-8">
        <button className="bg-shade cursor-pointer text-white rounded-lg shadow-sm hover:bg-green-600 transition-colors px-6 py-2 w-full" onClick={onStart}>Jump To Game Room!</button>
      </div>
    </>
  );
};

export default Controls;
