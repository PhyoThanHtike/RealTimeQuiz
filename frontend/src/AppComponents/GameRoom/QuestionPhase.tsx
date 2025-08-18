import { motion, useAnimationControls } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TimerBadge from "./TimerBadge";
import { useState, useEffect, useCallback, useMemo } from "react";
import type { question } from "@/apiEndpoints/Room";
import React from "react";

interface QuestionPhaseProps {
  isHost: boolean;
  currentQuestion: question;
  questionIndex: number;
  onSubmit: (selectedIndex: number, timeLimit: number) => void;
  onNext: () => void;
}

const QuestionPhase: React.FC<QuestionPhaseProps> = ({
  isHost,
  currentQuestion,
  questionIndex,
  onSubmit,
  onNext,
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const controls = useAnimationControls();

  const handleTimeUp = useCallback(() => {
    setTimeUp(true);
    controls.start("visible");
  }, [controls]);

  const handleSubmit = useCallback(() => {
    if (selected === null) return;
    setIsSubmitting(true);
    onSubmit(selected, currentQuestion.timeLimit);
    setIsSubmitting(false);
    setSelected(null);
  }, [selected, onSubmit, currentQuestion.timeLimit]);

  const handleOptionSelect = useCallback((idx: number) => {
    if (!isHost && !timeUp) {
      setSelected(idx);
    }
  }, [isHost, timeUp]);

  // Memoize option buttons to prevent unnecessary re-renders
  const optionButtons = useMemo(() => (
    currentQuestion.options.map((opt, idx) => (
      <motion.div 
        key={idx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + idx * 0.1 }}
        whileHover={{ scale: timeUp ? 1 : 1.03 }}
        whileTap={{ scale: timeUp ? 1 : 0.98 }}
      >
        <Button
          variant={
            timeUp && idx === currentQuestion.correctAnswer 
              ? "correct" 
              : selected === idx 
                ? "default" 
                : "outline"
          }
          className={`w-full h-16 text-lg font-medium transition-all duration-200 ${
            timeUp && idx === currentQuestion.correctAnswer
              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg border-2 border-emerald-400"
              : selected === idx 
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                : "bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
          }`}
          onClick={() => handleOptionSelect(idx)}
          disabled={timeUp}
        >
          <span className="mr-3 font-bold">{String.fromCharCode(65 + idx)}.</span> 
          {opt}
        </Button>
      </motion.div>
    ))
  ), [currentQuestion.options, currentQuestion.correctAnswer, selected, timeUp, handleOptionSelect]);

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-2xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Question {questionIndex + 1}
              </span>
            </CardTitle>
            <TimerBadge 
              key={`timer-${questionIndex}`}
              initialTime={currentQuestion.timeLimit} 
              onTimeUp={handleTimeUp}
            />
          </div>
        </CardHeader>
        <CardContent>
          <motion.p 
            className="text-xl mb-6 text-white font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {currentQuestion.question}
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {optionButtons}
          </div>

          {timeUp && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 bg-gray-800 rounded-lg border-l-4 border-emerald-500"
            >
              <h3 className="text-lg font-semibold text-emerald-400 mb-2">Explanation:</h3>
              <p className="text-gray-300">{currentQuestion.explanation}</p>
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-3">
          {isHost ? (
            <motion.div whileHover={{ scale: timeUp ? 1 : 1.05 }} whileTap={{ scale: timeUp ? 1 : 0.95 }}>
              <Button 
                className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all ${
                  timeUp 
                    ? "hover:from-blue-600 hover:to-purple-600" 
                    : "hover:from-blue-700 hover:to-purple-700 opacity-70 cursor-not-allowed"
                }`}
                onClick={onNext}
                disabled={!timeUp}
              >
                Show Leaderboard
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              whileHover={{ scale: (selected !== null && !timeUp) ? 1.05 : 1 }}
              whileTap={{ scale: (selected !== null && !timeUp) ? 0.95 : 1 }}
            >
              <Button
                className={`font-bold py-3 px-6 rounded-full shadow-lg transition-all ${
                  selected !== null && !timeUp
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
                disabled={selected === null || isSubmitting || timeUp}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    ⏳
                  </motion.span>
                ) : (
                  timeUp ? "Time's Up!" : "Submit Answer"
                )}
              </Button>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default React.memo(QuestionPhase);
