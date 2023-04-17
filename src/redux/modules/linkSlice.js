import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/api";

// 링크불러오기
export const __GetLink = createAsyncThunk(
  "getLink",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/api/post/links/Coordinates/${payload}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

// 링크 작성
export const __PostLink = createAsyncThunk(
  "postLink",
  async (payload,thunkAPI) => {
    try {
      const response = await instance.post(`/api/post/links/${payload.first}`, payload.second);
      return thunkAPI.fulfillWithValue(response?.data?.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);


// 링크 삭제
export const __DeleteLink = createAsyncThunk(
  "deleteLink",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.delete(`/api/post/links/${payload}`);
      return thunkAPI.fulfillWithValue(response?.data?.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);


const initialState = {
  data: '',
  linkToggle: false,
  showlink: false,
  error: false,
  loading: false,
};

export const link = createSlice({
  name: "link",
  initialState,
  reducers: {
    getlinkToggle: (state) => {
            state.linkToggle = !state.linkToggle
          },
    showlinkToggle: (state) =>{
            state.showlink = !state.showlink
          },
    
  },
  extraReducers: (builder) => {
    builder.addCase(__GetLink.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(__GetLink.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(__GetLink.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(__PostLink.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(__PostLink.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(__PostLink.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(__DeleteLink.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(__DeleteLink.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(__DeleteLink.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { getlinkToggle ,showlinkToggle} = link.actions;
export default link.reducer;
