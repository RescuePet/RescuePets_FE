import { instance } from "../../utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Get My Post
export const __getMyPost = createAsyncThunk(
  "getMyPost",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `api/post/member/?page=${payload.page}&size=${payload.size}`
      );
      console.log("__getMyPost", response);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Get My Scrap post
export const __getMyScrap = createAsyncThunk(
  "getMyScrap",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `api/scrap/list/?page=${payload.page}&size=${payload.size}&sortBy=createdAt`
      );
      console.log("__getMyScrapPost", response);
      return thunkAPI.fulfillWithValue(response.data.data.scrapResponseDtoList);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const initialState = {
  loading: false,
  error: false,
  entirePostList: [],
  entirePostPage: 1,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addMyPostPage: (state) => {
      state.entirePostPage = state.entirePostPage + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getMyPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(__getMyPost.fulfilled, (state, action) => {
        state.loading = false;
        state.entirePostList = [...state.entirePostList, ...action.payload];
      })
      .addCase(__getMyPost.rejected, (state) => {
        state.error = true;
      });
  },
});

export const { addMyPostPage, resetMyScrapPage } = profileSlice.actions;
export default profileSlice.reducer;
