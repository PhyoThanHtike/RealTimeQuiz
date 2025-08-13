import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/Store";
import type { participant } from "@/apiEndpoints/Room";

interface QuizFinishedProps {
  isHost: boolean;
  onLeave: () => void;
  onCreateQuiz: () => void;
}

const Confetti = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
            animation: `confetti-fall ${Math.random() * 3 + 2}s linear forwards`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
};

const QuizFinished: React.FC<QuizFinishedProps> = ({ isHost, onLeave, onCreateQuiz }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { leaderboard } = useAppSelector(state => state.room);
  
  // Sort leaderboard by score (highest first)
  const sortedLeaderboard = [...(leaderboard || [])].sort((a, b) => b.score - a.score);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {showConfetti && <Confetti />}
      
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-2xl relative overflow-hidden">
        <CardHeader className="text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Quiz Finished 🎉
            </CardTitle>
          </motion.div>
          <motion.p 
            className="text-gray-300 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Here are the final results!
          </motion.p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Top 3 Winners */}
          {sortedLeaderboard.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {sortedLeaderboard.slice(0, 3).map((entry, idx) => (
                <motion.div
                  key={entry.userId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className={`flex flex-col items-center p-4 rounded-lg ${
                    idx === 0 
                      ? "bg-gradient-to-b from-yellow-500 to-yellow-600 shadow-lg"
                      : idx === 1
                      ? "bg-gradient-to-b from-gray-500 to-gray-600"
                      : "bg-gradient-to-b from-amber-600 to-amber-700"
                  }`}
                >
                  <div className="text-2xl font-bold text-white mb-2">
                    {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
                  </div>
                  <div className="text-xl font-bold text-white truncate max-w-full">
                    {entry.userName}
                  </div>
                  <div className="text-lg font-bold text-white">
                    {entry.score} pts
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Full Leaderboard */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Final Standings</h3>
            {sortedLeaderboard.length > 0 ? (
              <ul className="space-y-2">
                {sortedLeaderboard.map((entry, idx) => (
                  <motion.li
                    key={entry.userId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.05 }}
                    className={`flex justify-between items-center px-4 py-3 rounded-lg ${
                      idx < 3 
                        ? "bg-gray-700/50" 
                        : "bg-gray-700 hover:bg-gray-600 transition-colors"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="font-medium text-gray-300 w-6">
                        {idx + 1}.
                      </span>
                      <span className="text-white ml-2 truncate max-w-xs">
                        {entry.userName}
                        {idx < 3 && <span className="ml-2">{idx === 0 ? "👑" : idx === 1 ? "✨" : "🌟"}</span>}
                      </span>
                    </div>
                    <span className="font-bold text-white">
                      {entry.score} pts
                    </span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6 text-gray-400">
                No participants in this quiz
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-center gap-4 mt-6">
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button 
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg"
              onClick={onLeave}
            >
              Leave Room
            </Button>
          </motion.div>
          {isHost && (
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            //   animate={{
            //     boxShadow: ["0 0 0 0 rgba(74, 222, 128, 0.7)", "0 0 0 10px rgba(74, 222, 128, 0)"],
            //   }}
            //   transition={{ 
            //     boxShadow: { duration: 1.5, repeat: Infinity },
            //   }}
            >
              <Button 
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-full shadow-lg"
                onClick={onCreateQuiz}
              >
                Create New Quiz
              </Button>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuizFinished;