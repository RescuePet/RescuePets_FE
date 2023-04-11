import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/api";

// 실종 글 수정
export const __PutMissingposts = createAsyncThunk(
  "putmissingposts",
  async ({ formData, number }, thunkAPI) => {
    try {
      const response = await instance.put(`/api/post/${number}`, formData);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

// 목격 글 수정
export const __PutCatchposts = createAsyncThunk(
  "putcatchposts",
  async ({ formData, number }, thunkAPI) => {
    try {
      const response = await instance.put(`/api/post/${number}`, formData);
      return thunkAPI.fulfillWithValue(response?.data?.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const initialState = {
  data: [],
  error: false,
  loading: false,
};

export const putMyposts = createSlice({
  name: "putMyposts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__PutMissingposts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(__PutMissingposts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(__PutMissingposts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(__PutCatchposts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(__PutCatchposts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(__PutCatchposts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default putMyposts.reducer;
