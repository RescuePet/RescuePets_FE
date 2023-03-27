import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/api";
import Cookies from "js-cookie";

// Sign In
export const __signinUser = createAsyncThunk(
  "signinUser",
  async (payload, thunkAPI) => {
    try {
      await instance.post("/api/member/login", payload);
      return thunkAPI.fulfillWithValue("success");
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Sign Up
export const __signupUser = createAsyncThunk(
  "signupUser",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      await instance.post("/api/member/signup", payload);
      return thunkAPI.fulfillWithValue("success");
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const initialState = {
  Signinmessage: "",
  Signupmessage: "",
};

export const signsSlice = createSlice({
  name: "signs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__signinUser.fulfilled, (state, action) => {
        state.Signinmessage = action.payload;
        console.log("sign in ", state.message);
      })
      .addCase(__signinUser.rejected, (state, action) => {
        state.Signinmessage = action.error.message;
      })
      .addCase(__signupUser.fulfilled, (state, action) => {
        state.Signupmessage = action.payload;
        console.log("sign up ", state.message);
      })
      .addCase(__signupUser.rejected, (state, action) => {
        state.Signupmessage = action.error.message;
      });
  },
});

export default signsSlice.reducer;
