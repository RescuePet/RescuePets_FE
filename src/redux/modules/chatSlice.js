import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/api";

//Get My Chat Room List
export const __getMyChatRoom = createAsyncThunk(
  "getMyChatRoom",
  async (_, thunkAPI) => {
    try {
      const response = await instance.get(`/chat/rooms`);
      console.log("response", response.data.data);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);

const initialState = {
  data: [],
  myChatRoom: [],
};

export const chatSlice = createSlice({
  name: "myChat",
  initialState,
  reducers: {
    resetunreadChat: (state, action) => {
      const index = state.myChatRoom.findIndex(
        (item) => item.id === Number(action.payload)
      );
      state.myChatRoom[index] = { ...state.myChatRoom[index], unreadChat: 0 };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getMyChatRoom.fulfilled, (state, action) => {
        state.myChatRoom = action.payload;
        state.error = null;
      })
      .addCase(__getMyChatRoom.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetunreadChat } = chatSlice.actions;
export default chatSlice.reducer;
