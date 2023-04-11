import { instance } from "../../utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Get post Comment
export const __getComment = createAsyncThunk(
  "getComment",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `/api/comments/${payload.postId}/?page=${payload.page}&size=5`
      );
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Post comment
export const __postComment = createAsyncThunk(
  "postComment",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post(`/api/comments/${payload.id}`, {
        content: payload.content,
      });
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Delete post comment
export const __deleteComment = createAsyncThunk(
  "deleteComment",
  async (payload, thunkAPI) => {
    try {
      await instance.delete(`/api/comments/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const initialState = {
  error: false,
  errorMessage: "",
  commentList: [],
  isLast: false,
  scrollState: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    resetCommentList: (state) => {
      state.commentList = [];
    },
    resetError: (state) => {
      state.error = false;
    },
    toggleScroll: (state) => {
      state.scrollState = !state.scrollState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getComment.fulfilled, (state, action) => {
        state.commentList = [...state.commentList, ...action.payload.dtoList];
        state.isLast = action.payload.isLast;
      })
      .addCase(__getComment.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__postComment.fulfilled, (state, action) => {
        state.commentList = [action.payload, ...state.commentList];
      })
      .addCase(__postComment.rejected, (state, action) => {
        state.error = true;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(__deleteComment.fulfilled, (state, action) => {
        state.commentList = state.commentList.filter(
          (comment) => comment.id !== action.payload
        );
      })
      .addCase(__deleteComment.rejected, (state) => {
        state.error = true;
      });
  },
});

export const { resetCommentList, resetError, toggleScroll } =
  commentSlice.actions;
export default commentSlice.reducer;
