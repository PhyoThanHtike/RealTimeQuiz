import { io, Socket } from "socket.io-client";
import Store from "@/store/Store";
import {
  setParticipants,
  setStatus,
  setPhase,
  setHostId,
  setCurrentQuestion,
  setQuestionIndex,
  setLeaderboard,
  setTotalQuestions,
} from "@/store/slices/RoomSlice";

let socket: Socket | null = null;

export const socketService = {
  connectSocket: (): Socket => {
    if (socket && socket.connected) return socket;

    socket = io("http://localhost:3001", {
      withCredentials: true,
      autoConnect: true,
    });

    setupSocketListeners(socket);

    return socket;
  },

  joinRoom: (roomId: string, userId: string) => {
    socket?.emit("joinRoom", { roomId, userId });
  },

  startQuiz: (roomId: string, userId: string) => {
    socket?.emit("startQuiz", { roomId, userId });
  },

  nextStep: (roomId: string, userId: string) => {
    socket?.emit("nextStep", { roomId, userId });
  },

  // frontend service
  submitAnswer: (payload: {
    roomId: string;
    questionIndex: number;
    answerIndex: number;
    timeTaken: number;
    userId: string;
  }) => {
    socket?.emit("submitAnswer", payload);
  },

  //   participants: [],
  // status: "waiting",
  // phase: "waiting",
  // hostId: "",
  // currentQuestion: null,
  // questionIndex: 0,
  // leaderboard: [],
  // totalQuestions: 0,

  disconnectSocket: () => {
    if (socket) {
      socket.disconnect();
      setParticipants([]);
      setStatus("waiting");
      setPhase("waiting");
      setHostId("");
      setQuestionIndex(0);
      setLeaderboard([]);
      setTotalQuestions(0);
      socket = null;
    }
  },
};

export const setupSocketListeners = (socket: Socket) => {
  const dispatch = Store.dispatch;

  socket.on("roomUpdate", (data: any) => {
    dispatch(setParticipants(data.participants));
    dispatch(setStatus(data.status));
    dispatch(setPhase(data.phase));
    dispatch(setHostId(data.hostId));
    dispatch(setTotalQuestions(data.totalQuestions));
    dispatch(setLeaderboard(data.leaderboard));
    dispatch(setCurrentQuestion(data.question));
    dispatch(setQuestionIndex(data.questionIndex));
  });

  socket.on("newQuestion", ({ question, questionIndex }) => {
    dispatch(setPhase("question"));
    dispatch(setCurrentQuestion(question));
    dispatch(setQuestionIndex(questionIndex));
  });

  socket.on("showLeaderboard", ({ leaderboard }) => {
    dispatch(setPhase("leaderboard"));
    dispatch(setLeaderboard(leaderboard));
  });

  socket.on("quizFinished", ({ leaderboard }) => {
    dispatch(setPhase("finished"));
    dispatch(setLeaderboard(leaderboard));
  });
};
