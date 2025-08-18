import axiosInstance from "@/Axios/axios";

interface createRoomData {
  roomName: String;
  quizCount: Number;
  quizTime: Number;
}

export interface roomData {
  creator: string;
  roomName: string;
  quizCount: number;
  quizTime: number;
  documents: String[];
  currentQuestion: number;
  status: string;
  _id: string;
  questions: question[];
  participants: participant[];
}
interface createRoomResponse {
  room: roomData;
  message: string;
}

export interface generateQuizData {
  prompt: String;
  topic: String;
}

export interface getRooms {
  rooms: roomData[];
  message: string;
}

export interface question {
  question: string; // matches FastAPI
  options: string[];
  correctAnswer: number; // matches FastAPI
  explanation: string;
  timeLimit: number; // seconds
}

export interface participant {
  userId: string;
  userName: string;
  score: number;
  responseTimes: number[];
}

interface errorResponse {
  message: string;
  status?: boolean;
}

//Create new room
export const createNewRoom = async (
  roomData: createRoomData
): Promise<createRoomResponse | errorResponse> => {
  try {
    const response = await axiosInstance.post("/room/create", roomData);
    return {
      room: response.data.room, // Directly use the response if structure matches
      message: response.data.message,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message || "Room creation failed",
        status: error.response.data.status || false,
      };
    }
    // Handle cases where error.response doesn't exist
    return {
      message: "Network error or server unavailable",
      status: false,
    };
  }
};

//Get Created Rooms
export const getCreatedRooms = async (): Promise<getRooms> => {
  try {
    const response = await axiosInstance.get("/room/getrooms");
    return response.data; // Assuming the API returns { rooms, message }
  } catch (error: any) {
    // Convert error to proper format
    throw new Error(
      error.response?.data?.message || "Network error or server unavailable"
    );
  }
};

export const getRoomById = async (
  roomId: any
): Promise<createRoomResponse | errorResponse> => {
  try {
    const response = await axiosInstance.get(`/room/getroomfromid/${roomId}`);
    return {
      room: response.data.room, // Directly use the response if structure matches
      message: response.data.message,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message || "Room creation failed",
        status: error.response.data.status || false,
      };
    }
    // Handle cases where error.response doesn't exist
    return {
      message: "Network error or server unavailable",
      status: false,
    };
  }
};

//generate quiz for room without file
export const generateQuizForRoom = async (
  roomId: any,
  quizData: generateQuizData
): Promise<createRoomResponse | errorResponse> => {
  try {
    const response = await axiosInstance.post(
      `/room/generate-quiz/json/${roomId}`,
      quizData
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message || "Room creation failed",
        status: error.response.data.status || false,
      };
    }
    // Handle cases where error.response doesn't exist
    return {
      message: "Network error or server unavailable",
      status: false,
    };
  }
};

// Generate quiz with file
export const generateQuizForRoomWithFile = async (
  roomId: string,
  quizData: { prompt: string; topic?: string; file: File }
): Promise<createRoomResponse | errorResponse> => {
  try {
    const formData = new FormData();
    formData.append("prompt", quizData.prompt);
    formData.append("topic", quizData.topic || "");
    formData.append("file", quizData.file);

    const response = await axiosInstance.post(
      `/room/generate-quiz/file/${roomId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message || "Quiz generation failed",
        status: error.response.data.status || false,
      };
    }
    return {
      message: "Network error or server unavailable",
      status: false,
    };
  }
};


//Join Room
export const joinRoom = async (
  roomId: any
): Promise<createRoomResponse | errorResponse> => {
  try {
    const response = await axiosInstance.post(`/room/join/${roomId}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message || "Room creation failed",
        status: error.response.data.status || false,
      };
    }
    // Handle cases where error.response doesn't exist
    return {
      message: "Network error or server unavailable",
      status: false,
    };
  }
};

//Delete Room
export const deleteRoom = async (roomId: string) => {
  try {
    const response = await axiosInstance.delete(`/room/delete-room/${roomId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Network error or server unavailable"
    );
  }
};

//Reset Room
export const resetRoom = async (roomId: string) => {
  try {
    const response = await axiosInstance.put(`/room/reset-room/${roomId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Network error or server unavailable"
    );
  }
};
