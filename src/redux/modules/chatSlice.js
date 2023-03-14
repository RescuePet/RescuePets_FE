import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/api";

// Get Chat Room
export const __getChatRoom = createAsyncThunk(
  "getChatRoom",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post(`/chat/room/${payload}`);
      console.log("chat response", response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);

// Get Chat Log
export const __getChatLog = createAsyncThunk(
  "getChatRoom",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/room/${payload}`);
      console.log("chat response", response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);

const initialState = {
  roomId: "",
  error: false,
  chatLog: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getChatRoom.fulfilled, (state, action) => {
        state.roomId = action.payload;
      })
      .addCase(__getChatRoom.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__getChatLog.fulfilled, (state, action) => {
        state.chatLog = action.payload.chats;
      })
      .addCase(__getChatLog.rejected, (state, action) => {
        state.error = true;
      });
  },
});

export default chatSlice.reducer;
