import axiosInstance from "@/Axios/axios";

interface loginData {
  email: String;
  password: String;
}
export interface loginResponse {
  _id: String;
  userName: String;
  email: String;
}
interface errorResponse {
  message: string;
  status?: boolean;
}

export const Login = async (
  credentials: loginData
): Promise<loginResponse | errorResponse> => {
  try {
    console.log("Credentials: ",credentials);
    const response = await axiosInstance.post("/api/auth/login", credentials);
    return {
      _id: response.data._id,
      userName: response.data.userName,
      email: response.data.email,
    };
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      return {
        message: error.response.data.message || "Login failed",
        status: error.response.data.status || false,
      };
    } else if (error.request) {
      // The request was made but no response was received
      return { message: "No response from server" };
    } else {
      // Something happened in setting up the request
      return { message: error.message };
    }
  }
};

export const SignOut = async () => {
  try {
    const response = await axiosInstance.post("api/auth/logout", {
      withCredentials: true, 
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to sign out");
  }
};
