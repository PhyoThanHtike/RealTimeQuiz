import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { question } from "@/apiEndpoints/Room";
import OptionItem from "./OptionItem";

interface QuestionCardProps {
  question: question;
  index: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, index }) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg mb-6"
    >
      <div className="overflow-hidden rounded-xl">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <span className="bg-purple text-white px-3 py-1 rounded-full text-sm font-medium">
              Question {index + 1}
            </span>
            <span className="ml-auto bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
              {question.timeLimit}s
            </span>
          </div>

          <h3 className="text-xl font-semibold text-gray-200 mb-4">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, i) => {
              console.log("index: ",i);
              console.log("correctIndex: ", question.correctAnswer);
              return (
                <OptionItem
                  key={i}
                  option={option}
                  index={i}
                  isCorrect={i === question.correctAnswer}
                />
              );
            })}
            {/* {question.options.map((option, i) => (
              <OptionItem
                key={i}
                option={option}
                index={i}
                // isCorrect={i === question.correct_answer}
                isCorrect={true}
              />
            ))} */}
          </div>

          {question.explanation && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100"
            >
              <h4 className="font-medium text-blue-800 mb-2">Explanation</h4>
              <p className="text-blue-700">{question.explanation}</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
