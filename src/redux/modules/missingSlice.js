import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/api";

// 실종 글 불러오기
export const __GetMissingData = createAsyncThunk(
  "getMissingData",
  async (arg, thunkAPI) => {
    try {
      const response = await instance.get("/api/post/all");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

// 실종 글 작성
export const __PostMissingData = createAsyncThunk(
  "postMissingData",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post("/api/post/", payload);
      return thunkAPI.fulfillWithValue(response?.data?.data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

const initialState = {
  data: [],
  error: false,
  loading: false,
  imageURL: null,
};

export const MissingData = createSlice({
  name: "MissingData",
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.imageURL = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__PostMissingData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(__PostMissingData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(__PostMissingData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(__GetMissingData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(__GetMissingData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(__GetMissingData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { addImage } = MissingData.actions;
export default MissingData.reducer;
