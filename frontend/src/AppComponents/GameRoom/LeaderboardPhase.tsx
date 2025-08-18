import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { participant, question } from "@/apiEndpoints/Room";

// export interface question {
//   question: string; // matches FastAPI
//   options: string[];
//   correctAnswer: number; // matches FastAPI
//   explanation: string;
//   timeLimit: number; // seconds
// }

interface LeaderboardPhaseProps {
  isHost: boolean;
  questionIndex: number;
  totalQuestions: number;
  currentQuestion: question;
  leaderboard?: participant[]; // Make it optional
  onNext: () => void;
}

const LeaderboardPhase: React.FC<LeaderboardPhaseProps> = ({
  isHost,
  questionIndex,
  currentQuestion,
  totalQuestions,
  leaderboard = [], // Default empty array
  onNext,
}) => {
  // Sort leaderboard by score (highest first)
  const sortedLeaderboard = [...(leaderboard || [])].sort(
    (a, b) => b.score - a.score
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold text-white">
            <span className="bg-clip-text flex text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Leaderboard
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {questionIndex + 1 < totalQuestions ? (
            <>
              {sortedLeaderboard.length > 0 ? (
                <ul className="space-y-3">
                  {sortedLeaderboard.map((entry, idx) => (
                    <motion.li
                      key={entry.userId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`flex justify-between items-center px-4 py-3 rounded-lg ${
                        idx === 0
                          ? "bg-gradient-to-r from-yellow-600 to-yellow-500 shadow-lg"
                          : idx === 1
                          ? "bg-gradient-to-r from-gray-600 to-gray-500"
                          : idx === 2
                          ? "bg-gradient-to-r from-amber-800 to-amber-700"
                          : "bg-gray-700"
                      }`}
                    >
                      <span className="font-medium text-white">
                        {idx + 1}. {entry.userName}
                      </span>
                      <span className="font-bold text-white">
                        {entry.score} pts
                        {idx === 0 && <span className="ml-2">👑</span>}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-6 text-gray-400">
                  No participants yet
                </div>
              )}
            </>
          ) : (
            <>
              <motion.span
              className="inline-block text-xl transform-gpu bg-clip-text text-transparent text-center bg-gradient-to-r from-blue-400 to-blue-600"
              animate={{ y: [0, -3, 0], scale: [1, 1.02, 1] }}
              transition={{
                duration: 1,
                times: [0, 0.3, 0.4],
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              Who's Gonna Win?
            </motion.span>
            </>
          )}
        </CardContent>
        <CardFooter className="justify-center">
          {isHost ? (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg"
                onClick={onNext}
              >
                {questionIndex + 1 < totalQuestions
                  ? "Next Question →"
                  : "Finish Quiz 🎉"}
              </Button>
            </motion.div>
          ) : (
            <motion.p
              className="text-gray-400 italic"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Waiting for host...
            </motion.p>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default LeaderboardPhase;
