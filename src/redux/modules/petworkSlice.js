import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/api";

// Get missing post
export const __getMissingPost = createAsyncThunk(
  "getMissingPost",
  async (payload, thunkAPI) => {
    try {
      console.log("start getMissingPost");
      const response = await instance.get(
        `/api/pets/missing/?page=${payload.page}&size=${payload.size}`
      );
      console.log("response", response);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Get Catch post
export const __getCatchPost = createAsyncThunk(
  "getCatchPost",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `/api/pets/catch/?page=${payload.page}&size=${payload.size}`
      );
      console.log("catch response", response.data.data);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const initialState = {
  error: false,
  loading: false,
  category: "",
  missingPostLists: [],
  catchPostLists: [],
};

export const petworkSlice = createSlice({
  name: "petwork",
  initialState,
  reducers: {
    toggleCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getMissingPost.fulfilled, (state, action) => {
        state.missingPostLists = [...state.missingPostLists, ...action.payload];
      })
      .addCase(__getMissingPost.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__getCatchPost.fulfilled, (state, action) => {
        state.catchPostLists = [...state.catchPostLists, ...action.payload];
      })
      .addCase(__getCatchPost.rejected, (state) => {
        state.error = true;
      });
  },
});

export const { toggleCategory } = petworkSlice.actions;
export default petworkSlice.reducer;
