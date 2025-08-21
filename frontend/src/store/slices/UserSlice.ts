import type { loginResponse } from "@/apiEndpoints/Auth";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    userId: "",
    userName: "",
    email: "",
    profilePicture: ""
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state: any, action: PayloadAction<loginResponse>) => {
      state.userId = action.payload._id;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.profilePicture = action.payload.profilePicture;
    },
  },
});

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;