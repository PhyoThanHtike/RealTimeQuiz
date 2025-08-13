// backend/socket.js
import { Server } from "socket.io";
import http from "http";
import express from "express";
import Room from "../models/room.model.js";
import User from "../models/auth.model.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Join room
  socket.on("joinRoom", async ({ roomId, userId }) => {
    socket.join(roomId.toString());

    // const room = await Room.findById(roomId).populate(
    //   "participants.userId",
    //   "username"
    // );
    const room = await Room.findById(roomId);

    // Only add participant if they aren't the creator and not already in the list
    if (room.creator.toString() !== userId.toString()) {
      const user = await User.findById(userId);
      const userName = user ? user.userName : null;
      const exists = room.participants.find(
        (p) => p.userId.toString() === userId.toString()
      );

      if (!exists) {
        room.participants.push({
          userId,
          userName,
          score: 0,
          responseTimes: [],
        });
        await room.save();
      }
    }

    // Emit room update for everyone, including the creator
    io.to(roomId.toString()).emit("roomUpdate", {
      participants: room.participants,
      status: room.status,
      hostId: room.creator,
      totalQuestions: room.quizCount,
      phase: room.phase,
      questionIndex: room.currentQuestion,
      leaderboard: calculateLeaderboard(room),
      question: room.questions[room.currentQuestion]
    });
  });

  // Start quiz (host only)
  socket.on("startQuiz", async ({ roomId, userId }) => {
    const room = await Room.findById(roomId);
    if (!room || room.creator.toString() !== userId) return;

    room.status = "started";
    room.phase = "question";
    room.currentQuestion = 0;
    await room.save();

    sendQuestion(io, room);
  });

  // Host clicks next
  socket.on("nextStep", async ({ roomId, userId }) => {
    const room = await Room.findById(roomId);
    if (!room || room.creator.toString() !== userId) return;

    if (room.phase === "question") {
      room.phase = "leaderboard";
      await room.save();

      const leaderboard = calculateLeaderboard(room);
      io.to(roomId).emit("showLeaderboard", {
        leaderboard,
      });
    } else if (room.phase === "leaderboard") {
      if (room.currentQuestion + 1 >= room.questions.length) {
        room.status = "finished";
        room.phase = "finished";
        await room.save();

        io.to(roomId).emit("quizFinished", {
          leaderboard: calculateLeaderboard(room),
        });
      } else {
        room.currentQuestion++;
        room.phase = "question";
        await room.save();
        sendQuestion(io, room);
      }
    }
  });

  // Submit answer
  socket.on(
    "submitAnswer",
    async ({ roomId, questionIndex, answerIndex, timeTaken, userId }) => {
      const room = await Room.findById(roomId);
      // if (!room || room.status !== "active") return;

      const participant = room.participants.find(
        (p) => p.userId.toString() === userId
      );
      if (!participant) return;

      participant.responseTimes[questionIndex] = timeTaken;

      const question = room.questions[questionIndex];
      if (answerIndex === question.correctAnswer) {
        const maxPoints = 1000;
        const timeFraction = Math.max(
          0,
          (question.timeLimit * 1000 - timeTaken) / (question.timeLimit * 1000)
        );
        const pointsEarned = Math.floor(maxPoints * (0.5 + 0.5 * timeFraction));
        participant.score += pointsEarned;
      }

      await room.save();

      io.to(roomId).emit("scoreUpdate", {
        participants: room.participants.map((p) => ({
          userId: p.userId,
          score: p.score,
        })),
        currentQuestion: room.currentQuestion,
      });
    }
  );

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// index: room.currentQuestion,

function sendQuestion(io, room) {
  const q = room.questions[room.currentQuestion];
  io.to(room._id.toString()).emit("newQuestion", {
    question: {
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      timeLimit: q.timeLimit,
    },
    questionIndex: room.currentQuestion,
  });
}

function calculateLeaderboard(room) {
  return room.participants
    .map((p) => ({
      userId: p.userId,
      userName: p.userName, // include username
      score: p.score,
      totalTime: p.responseTimes.reduce((a, b) => a + b, 0),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.totalTime - b.totalTime;
    });
}

export { io, app, server };

// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// import Room from "../models/room.model.js";

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id);

//   // Join room namespace
//   socket.on("joinRoom", async (roomId) => {
//     socket.join(roomId);
//     const room = await Room.findById(roomId).populate(
//       "participants.userId",
//       "username"
//     );

//     // Notify room about new participant
//     io.to(roomId).emit("roomUpdate", {
//       participants: room.participants,
//       status: room.status,
//     });
//   });

//   // Start quiz
//   socket.on("startQuiz", async (roomId) => {
//     const room = await Room.findById(roomId);
//     if (!room || room.status !== "waiting" || room.status !== "active") return;

//     room.status = "started";
//     room.startedAt = new Date();
//     await room.save();

//     io.to(roomId).emit("quizStarted");
//     startQuestion(io, room, 0);
//   });

//   // Submit answer
//   socket.on(
//     "submitAnswer",
//     async ({ roomId, questionIndex, answerIndex, timeTaken }) => {
//       const room = await Room.findById(roomId);
//       if (!room || room.status !== "started") return;

//       const participant = room.participants.find(
//         (p) => p.userId.toString() === socket.userId.toString()
//       );

//       if (!participant) return;

//       // Record response time
//       participant.responseTimes[questionIndex] = timeTaken;

//       // Check if answer is correct
//       const question = room.questions[questionIndex];
//       if (answerIndex === question.correctAnswer) {
//         // Calculate score (base points + speed bonus)
//         const maxPoints = 1000;
//         const timeFraction = Math.max(
//           0,
//           (question.timeLimit * 1000 - timeTaken) / (question.timeLimit * 1000)
//         );
//         const pointsEarned = Math.floor(maxPoints * (0.5 + 0.5 * timeFraction));

//         participant.score += pointsEarned;
//       }

//       await room.save();

//       // Broadcast updated scores (without revealing correct answers)
//       io.to(roomId).emit("scoreUpdate", {
//         participants: room.participants.map((p) => ({
//           userId: p.userId,
//           userName: p.userName,
//           score: p.score,
//         })),
//         currentQuestion: room.currentQuestion,
//       });
//     }
//   );

//   // Disconnect handler
//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });

// async function startQuestion(io, room, questionIndex) {
//   if (questionIndex >= room.questions.length) {
//     // Quiz finished
//     room.status = "finished";
//     room.finishedAt = new Date();
//     await room.save();

//     // Calculate final leaderboard
//     const leaderboard = calculateLeaderboard(room);

//     io.to(room._id.toString()).emit("quizFinished", { leaderboard });
//     return;
//   }

//   room.currentQuestion = questionIndex;
//   await room.save();

//   const question = room.questions[questionIndex];
//   const questionData = {
//     text: question.text,
//     options: question.options,
//     timeLimit: question.timeLimit,
//   };

//   io.to(room._id.toString()).emit("newQuestion", questionData);

//   // Schedule next question
//   setTimeout(() => {
//     startQuestion(io, room, questionIndex + 1);
//   }, question.timeLimit * 1000);
// }

// function calculateLeaderboard(room) {
//   // Sort by score (descending), then by total response time (ascending)
//   return room.participants
//     .map((p) => ({
//       userId: p.userId,
//       username: p.username,
//       score: p.score,
//       totalTime: p.responseTimes.reduce((a, b) => a + b, 0),
//     }))
//     .sort((a, b) => {
//       if (b.score !== a.score) return b.score - a.score;
//       return a.totalTime - b.totalTime;
//     });
// }

// export { io, app, server };
// Create room (called when host starts room)
// socket.on("createRoom", async ({ roomName, userId }) => {
//   const room = new Room({
//     name: roomName,
//     hostId: userId,
//     participants: [{ userId, score: 0, responseTimes: [] }],
//     status: "waiting",
//     currentQuestion: -1,
//     phase: "waiting",
//   });
//   await room.save();

//   socket.join(room._id.toString());
//   io.to(room._id.toString()).emit("roomUpdate", {
//     participants: room.participants,
//     status: room.status,
//     hostId: room.hostId,
//   });
// });
