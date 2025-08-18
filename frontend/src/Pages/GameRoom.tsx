import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/Store";
import { socketService } from "@/apiEndpoints/socketService";
import { setPhase } from "@/store/slices/RoomSlice";
import GameHeader from "../AppComponents/GameRoom/GameHeader";
import ParticipantsPanel from "../AppComponents/GameRoom/ParticipantsPanel";
import WaitingRoom from "../AppComponents/GameRoom/WaitingRoom";
import QuestionPhase from "../AppComponents/GameRoom/QuestionPhase";
import LeaderboardPhase from "@/AppComponents/GameRoom/LeaderboardPhase";
import QuizFinished from "../AppComponents/GameRoom/QuizFinished";
import { motion } from "framer-motion";

const GameRoom = () => {
  const { roomId, userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  console.log("I'm rendered!");
  const { participants, status, phase, hostId, currentQuestion, questionIndex, leaderboard, totalQuestions } = useAppSelector(state => state.room);

  const isHost = useMemo(() => userId === hostId, [userId, hostId]);

  useEffect(() => {
    if (!roomId || !userId) return;
    socketService.connectSocket();
    socketService.joinRoom(roomId, userId);
    return () => socketService.disconnectSocket();
  }, [roomId, userId]);

  const handleLeaveRoom = () => {
    socketService.disconnectSocket();
    dispatch(setPhase("waiting"));
    navigate("/");
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <GameHeader roomId={roomId} isHost={isHost} onLeave={handleLeaveRoom} />

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ParticipantsPanel participants={participants} hostId={hostId} />

          <div className="lg:col-span-2 space-y-6">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              {phase === "waiting" && (
                <WaitingRoom 
                  isHost={isHost} 
                  onStart={() => socketService.startQuiz(roomId!, userId!)} 
                />
              )}

              {phase === "question" && currentQuestion && (
                <QuestionPhase
                  isHost={isHost}
                  currentQuestion={currentQuestion}
                  questionIndex={questionIndex}
                  onSubmit={(answerIndex: any, timeTaken: any) =>
                    socketService.submitAnswer({
                      roomId: roomId!,
                      questionIndex,
                      answerIndex,
                      timeTaken,
                      userId: userId!,
                    })
                  }
                  onNext={() => socketService.nextStep(roomId!, userId!)}
                />
              )}

              {phase === "leaderboard" && currentQuestion && (
                <LeaderboardPhase
                  isHost={isHost}
                  questionIndex={questionIndex}
                  totalQuestions={totalQuestions}
                  currentQuestion={currentQuestion}
                  leaderboard={leaderboard}
                  onNext={() => socketService.nextStep(roomId!, userId!)}
                />
              )}

              {phase === "finished" && (
                <QuizFinished
                  isHost={isHost}
                  onLeave={handleLeaveRoom}
                  onCreateQuiz={() => navigate(`/create-quiz`)}
                />
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GameRoom;
