import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/api";
import Cookies from "js-cookie";

// Get adoption list
export const __PutMyinfoEdit = createAsyncThunk(
  "putMyinfoEdit",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.put("/api/member/edit", payload);
      console.log(response);
      const NEWUSERINFO = JSON.stringify(response.data.data);
      Cookies.set("UserInfo", NEWUSERINFO);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error.response.data);
      throw new Error(error.response.data.message);
    }
  }
);

const initialState = {
  error: false,
  loading: false,
  message: "",
};

export const putMyinfoEdit = createSlice({
  name: "putMyinfoEdit",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(__PutMyinfoEdit.pending, (state) => {
        state.loading = true;
      })
      .addCase(__PutMyinfoEdit.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(__PutMyinfoEdit.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default putMyinfoEdit.reducer;
