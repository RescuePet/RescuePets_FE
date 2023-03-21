import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/api";

// Get missing post
export const __getMissingPost = createAsyncThunk(
  "getMissingPost",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `/api/pets/missing/?page=${payload.page}&size=${payload.size}`
      );
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Get missing post detail
export const __getMissingPostDetail = createAsyncThunk(
  "getMissingPostDetail",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/api/pets/missing/${payload}`);
      console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Get catch post
export const __getCatchPost = createAsyncThunk(
  "getCatchPost",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `/api/pets/catch/?page=${payload.page}&size=${payload.size}`
      );
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Get catch post detail
export const __getCatchPostDetail = createAsyncThunk(
  "getCatchPostDetail",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/api/pets/catch/${payload}`);
      console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const initialState = {
  error: false,
  loading: false,
  category: "우리집 반려동물을 찾아주세요",
  missingPage: 1,
  catchPage: 1,
  missingPostLists: [],
  catchPostLists: [],
  missingPostDetail: {},
  catchPostDetail: {},
  missingLastPage: false,
  catchLastPage: false,
};

export const petworkSlice = createSlice({
  name: "petwork",
  initialState,
  reducers: {
    toggleCategory: (state, action) => {
      state.category = action.payload;
    },
    addMissingPage: (state) => {
      state.missingPage = state.missingPage + 1;
    },
    addCatchPage: (state) => {
      state.catchPage = state.catchPage + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getMissingPost.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.missingLastPage = true;
          return;
        } else {
          state.missingPostLists = [
            ...state.missingPostLists,
            ...action.payload,
          ];
        }
      })
      .addCase(__getMissingPost.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__getMissingPostDetail.fulfilled, (state, action) => {
        state.missingPostDetail = action.payload;
      })
      .addCase(__getMissingPostDetail.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__getCatchPost.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.catchLastPage = true;
          return;
        }
        state.catchPostLists = [...state.catchPostLists, ...action.payload];
      })
      .addCase(__getCatchPost.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__getCatchPostDetail.fulfilled, (state, action) => {
        state.catchPostDetail = action.payload;
      })
      .addCase(__getCatchPostDetail.rejected, (state) => {
        state.error = true;
      });
  },
});

export const { toggleCategory, addMissingPage, addCatchPage } =
  petworkSlice.actions;
export default petworkSlice.reducer;
