import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { roomData } from "@/apiEndpoints/Room";
import Header from "./Header";
import QuestionCard from "./QuestionCard";
import Controls from "./Controls";

interface PreviewQuizComponentProps {
  room: roomData | null;
  loading: boolean;
  error: string | null;
  onStartQuiz: () => void;
}

const PreviewQuizComponent: React.FC<PreviewQuizComponentProps> = ({
  room,
  loading,
  error,
  onStartQuiz,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    if (room && currentQuestionIndex < room.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg"
      >
        {error}
      </motion.div>
    );
  }

  if (!room) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Header room={room} />

      <AnimatePresence mode="wait">
        <QuestionCard
          key={currentQuestionIndex}
          question={room.questions[currentQuestionIndex]}
          index={currentQuestionIndex}
        />
      </AnimatePresence>

      <Controls
        currentIndex={currentQuestionIndex}
        totalQuestions={room.questions.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onStart={onStartQuiz}
      />
    </div>
  );
};

export default PreviewQuizComponent;
