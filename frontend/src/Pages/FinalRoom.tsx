import { useQuery } from "@tanstack/react-query";
import { getRoomById } from "@/apiEndpoints/Room";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Trophy, User } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";

interface FinalRoomProps {
  roomId: string;
}

const FinalRoom: React.FC = () => {

    const {_id} = useParams();
    console.log("roomid:", _id)
  const {
    data: roomData,
    isLoading,
    isError,
  } = useQuery<any>({
    queryKey: ["room", _id],
    queryFn: () => getRoomById(_id),
  });

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError || !roomData?.room)
    return <div className="p-6 text-red-500">Failed to load room data.</div>;

  const { participants, questions, roomName } = roomData.room;

  // sort leaderboard by score desc, then time asc
  const leaderboard = [...participants].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const totalTimeA = a.responseTimes.reduce((acc:any, t:any) => acc + t, 0);
    const totalTimeB = b.responseTimes.reduce((acc:any, t:any) => acc + t, 0);
    return totalTimeA - totalTimeB;
  });

  return (
    <div className="w-full bg-gradient-to-b from-gray-900 to-purple-950 py-10">
        <div className="max-w-4xl mx-auto p-6 space-y-10 ">
          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                  <Trophy className="w-6 h-6 text-yellow-300" />
                  {roomName} – Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((p, i) => (
                    <motion.div
                      key={p.userId}
                      className={`flex justify-between items-center p-3 rounded-xl ${
                        i === 0
                          ? "bg-yellow-400 text-black font-bold"
                          : "bg-white/10 backdrop-blur-sm"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 text-center">{i + 1}</span>
                        <User className="w-5 h-5" />
                        <span>{p.userName}</span>
                      </div>
                      <span className="font-semibold">{p.score} pts</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          {/* Questions */}
          <div className="space-y-8">
            {questions.map((q:any, idx:any) => (
              <motion.div
                key={q._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="shadow-md rounded-2xl bg-gray-800 border-none">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-100">
                      Q{idx + 1}. {q.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2">
                      {q.options.map((opt:any, i:any) => (
                        <li
                          key={i}
                          className={`p-2 rounded-lg ${
                            i === q.correctAnswer
                              ? "bg-green-600 text-white border-green-400"
                              : "bg-gray-600 text-gray-300"
                          }`}
                        >
                          {String.fromCharCode(65 + i)}. {opt}
                        </li>
                      ))}
                    </ul>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-900">
                        <span className="font-bold">Explanation:</span> {q.explanation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default FinalRoom;
