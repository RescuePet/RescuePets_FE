import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/api";

// Sign In
export const __signinUser = createAsyncThunk(
  "signinUser",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post("/api/member/login", payload);
      console.log(response.data.data)
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Sign Up
export const __signupUser = createAsyncThunk(
  "signupUser",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post("/api/member/signup", payload);
      return thunkAPI.fulfillWithValue(response.data.message);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const __SignoutUser = createAsyncThunk(
  "__logoutUser",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.delete("/api/member/logout");
      // console.log(response.data.data)
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const initialState = {
  Signin: [],
  Signupmessage: "",
  Signoutmessage: "",
};

export const signsSlice = createSlice({
  name: "signs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__signinUser.fulfilled, (state, action) => {
        state.Signin = action.payload;
        // console.log("sign in ", state.message);
      })
      .addCase(__signinUser.rejected, (state, action) => {
        state.Signin = action.error.message;
      })
      .addCase(__signupUser.fulfilled, (state, action) => {
        state.Signupmessage = action.payload;
        // console.log("sign up ", state.message);
      })
      .addCase(__signupUser.rejected, (state, action) => {
        state.Signupmessage = action.error.message;
      })
      .addCase(__SignoutUser.fulfilled, (state, action) => {
        state.Signoutmessage = action.payload;
        // console.log("sign up ", state.message);
      })
      .addCase(__SignoutUser.rejected, (state, action) => {
        state.Signoutmessage = action.error.message;
      });
  },
});

export default signsSlice.reducer;
