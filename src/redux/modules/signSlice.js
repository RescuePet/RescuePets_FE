import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/api";
import Cookies from "js-cookie";
// import axios from "axios";

// Sign In
export const __signinUser = createAsyncThunk(
  "signinUser",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post("/api/member/login", payload);
      const TOKEN = response.headers.authorization;
      Cookies.set("Token", TOKEN);
      return thunkAPI.fulfillWithValue("success");
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const initialState = {
  message: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__signinUser.fulfilled, (state, action) => {
        state.message = action.payload;
        console.log("sign in ", state.message);
      })
      .addCase(__signinUser.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});

export default usersSlice.reducer;
