import { instance } from "../../utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Get My missing post
export const __getMyMissingPost = createAsyncThunk(
  "getMyMissingPost",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `api/pets/missing/member/?page=${payload.page}&size=${payload.size}`
      );
      console.log("__getMyMissingPost", response.data.data);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Get My catch post
export const __getMyCatchPost = createAsyncThunk(
  "getMyCatchPost",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `api/pets/catch/member/?page=${payload.page}&size=${payload.size}`
      );
      console.log("__getMyCatchPost", response.data.data);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Get My Scrap post

const initialState = {
  error: false,
  myMissing: [],
  myCatch: [],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getMyMissingPost.fulfilled, (state, action) => {
        state.myMissing = action.payload;
      })
      .addCase(__getMyMissingPost.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__getMyCatchPost.fulfilled, (state, action) => {
        state.myCatch = action.payload;
      })
      .addCase(__getMyCatchPost.rejected, (state) => {
        state.error = true;
      });
  },
});

export default profileSlice.reducer;
