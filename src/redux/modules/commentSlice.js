import { instance } from "../../utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Get missing post comment
export const __getMissingComment = createAsyncThunk(
  "getMissingComment",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `api/pets/missing/comments/${payload}`
      );
      console.log("missing comment", response.data);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Get catch post comment
export const __getCatchComment = createAsyncThunk(
  "getCatchComment",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`api/pets/catch/comments/${payload}`);
      console.log("catch comment", response.data);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const initialState = {
  error: false,
  missingComment: [],
  catchComment: [],
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getMissingComment.fulfilled, (state, action) => {
        state.missingComment = action.payload;
      })
      .addCase(__getMissingComment.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__getCatchComment.fulfilled, (state, action) => {
        state.missingComment = action.payload;
      })
      .addCase(__getCatchComment.rejected, (state) => {
        state.error = true;
      });
  },
});

export default commentSlice.reducer;
