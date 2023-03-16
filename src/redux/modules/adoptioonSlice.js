import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { home } from "../../utils/api";

// Get adoption list
export const __getAdoptionList = createAsyncThunk(
  "getAdoptionList",
  async (payload, thunkAPI) => {
    try {
      const response = await home.get(
        `/api/pets/info-list?page=${payload.page}&size=${payload.size}`
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);

// Get adoption Detail
export const __getAdoptionDetail = createAsyncThunk(
  "getAdoptionDetail",
  async (payload, thunkAPI) => {
    try {
      const response = await home.get(`/api/pets/details/${payload}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);

const initialState = {
  error: false,
  loading: false,
  adoptionLists: [],
  adiotionDetail: {},
};

export const adoptionSlice = createSlice({
  name: "adoption",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getAdoptionList.pending, (state) => {
        state.loading = true;
      })
      .addCase(__getAdoptionList.fulfilled, (state, action) => {
        state.loading = false;
        state.adoptionLists = [
          ...state.adoptionLists,
          ...action.payload.publicPetResponsDto,
        ];
      })
      .addCase(__getAdoptionList.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });

    builder
      .addCase(__getAdoptionDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(__getAdoptionDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.adiotionDetail = action.payload;
      })
      .addCase(__getAdoptionDetail.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default adoptionSlice.reducer;
