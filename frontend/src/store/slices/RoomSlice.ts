import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { participant, question } from "@/apiEndpoints/Room";

// export interface question {
//   question: String; // matches FastAPI
//   options: string[];
//   correctAnswer: number; // matches FastAPI
//   explanation: String;
//   timeLimit: number; // seconds
// }

// export interface participant {
//   userId: String;
//   userName: String;
//   score: Number;
//   responseTimes: Number[];
// }

interface RoomState {
  participants: participant[];
  status: "waiting" | "active" | "started" | "finished";
  phase: "waiting" | "question" | "leaderboard" | "finished";
  hostId: string;
  currentQuestion: question | null;
  questionIndex: number;
  leaderboard: participant[];
  totalQuestions: number;
}

const initialState: RoomState = {
  participants: [],
  status: "waiting",
  phase: "waiting",
  hostId: "",
  currentQuestion: null,
  questionIndex: 0,
  leaderboard: [],
  totalQuestions: 0,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setParticipants: (state, action: PayloadAction<participant[]>) => {
      state.participants = action.payload;
    },
    setStatus: (state, action: PayloadAction<RoomState["status"]>) => {
      state.status = action.payload;
    },
    setPhase: (state, action: PayloadAction<RoomState["phase"]>) => {
      state.phase = action.payload;
    },
    setHostId: (state, action: PayloadAction<string>) => {
      state.hostId = action.payload;
    },
    setCurrentQuestion: (state, action: PayloadAction<question>) => {
      state.currentQuestion = action.payload;
    },
    setQuestionIndex: (state, action: PayloadAction<number>) => {
      state.questionIndex = action.payload;
    },
    setLeaderboard: (state, action: PayloadAction<participant[]>) => {
      state.leaderboard = action.payload;
    },
    setTotalQuestions: (state, action: PayloadAction<number>) => {
      state.totalQuestions = action.payload;
    },
  },
});

export const {
  setParticipants,
  setStatus,
  setPhase,
  setHostId,
  setCurrentQuestion,
  setQuestionIndex,
  setLeaderboard,
  setTotalQuestions
} = roomSlice.actions;

export default roomSlice.reducer;

// interface Participant {
//   userId: string;
//   username?: string;
//   score: number;
// }

// interface Question {
//   index: number;
//   text: string;
//   options: string[];
//   timeLimit: number;
// }
