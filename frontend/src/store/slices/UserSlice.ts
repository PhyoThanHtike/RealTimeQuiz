import type { loginResponse } from "@/apiEndpoints/Auth";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import type { AuthResponse } from "../../apiEndpoints/Auth";
// import type { Product } from "../../types/Products";

const initialState = {
    userId: "",
    userName: "",
    email: ""
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state: any, action: PayloadAction<loginResponse>) => {
      state.userId = action.payload._id;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
    },
  },
});

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;