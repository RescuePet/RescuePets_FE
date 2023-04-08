import { instance } from "../../utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Get Public Search Result
export const __getPublicSearch = createAsyncThunk(
  "getPublicSearch",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `api/pets/search?page=${payload.page}&size=${payload.size}`
      );
      console.log("getPublicSearch", response);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Get Post Search Result
export const __getPostSearch = createAsyncThunk(
  "getPostSearch",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `api/post/search?page=${payload.page}&size=${payload.size}`
      );
      console.log("getPostSearch", response.data);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const initialState = {
  loading: false,
  error: false,
  searchLists: [],
  inputState: false,
  searchCategory: "",
  descriptionCategory: "",
  kindCategory: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    toggleSearchCategory: (state, action) => {
      state.searchCategory = action.payload;
    },
    toggleDescriptionCategory: (state, action) => {
      state.descriptionCategory = action.payload;
    },
    toggleKindCategory: (state, action) => {
      state.kindCategory = action.payload;
    },
    toggleInputState: (state, action) => {
      state.inputState = action.payload;
    },

    resetSearchState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  toggleSearchCategory,
  toggleDescriptionCategory,
  toggleKindCategory,
  toggleInputState,
  resetSearchState,
} = searchSlice.actions;
export default searchSlice.reducer;
