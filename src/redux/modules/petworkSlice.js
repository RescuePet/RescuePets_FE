import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/api";

// Post missing
export const __PostMissingData = createAsyncThunk(
  "postMissingData",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post("/api/post/", payload);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

// Get missing post
export const __getMissingPost = createAsyncThunk(
  "getMissingPost",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `/api/post/list/MISSING?page=${payload.page}&size=${payload.size}`
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
      const response = await instance.get(`/api/post/${payload}`);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Post catch
export const __PostCatchData = createAsyncThunk(
  "postgetCatchData",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post("/api/post/", payload);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      console.log(error.response);
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
        `/api/post/list/CATCH/?page=${payload.page}&size=${payload.size}`
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
      const response = await instance.get(`/api/post/${payload}`);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Post Missing Scrap
export const __postMissingScrap = createAsyncThunk(
  "postPetworkScrap",
  async (payload, thunkAPI) => {
    try {
      let data = {
        id: payload.id,
        page: payload.page,
        state: Boolean,
      };
      if (!payload.state) {
        await instance.post(`/api/scrap/${payload.id}`);
        data.state = true;
        return thunkAPI.fulfillWithValue(data);
      } else {
        await instance.delete(`/api/scrap/${payload.id}`);
        data.state = false;
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Post Catch Scrap
export const __postCatchScrap = createAsyncThunk(
  "postCatchScrap",
  async (payload, thunkAPI) => {
    try {
      let data = {
        id: payload.id,
        page: payload.page,
        state: Boolean,
        count: Number,
      };
      if (!payload.state) {
        await instance.post(`/api/scrap/${payload.id}`);
        data.state = true;
        data.count = 1;
        return thunkAPI.fulfillWithValue(data);
      } else {
        await instance.delete(`/api/scrap/${payload.id}`);
        data.state = false;
        data.count = -1;
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Delete Post
export const __deletePost = createAsyncThunk(
  "deletePost",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.delete(`/api/post/${payload.id}`);
      console.log(response);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const initialState = {
  postId: 0,
  error: false,
  loading: false,
  category: "우리집 반려동물을 찾아주세요",
  CommentInputState: false,
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
    toggleCommentInput: (state) => {
      state.CommentInputState = !state.CommentInputState;
    },
    addMissingPage: (state) => {
      state.missingPage = state.missingPage + 1;
    },
    addCatchPage: (state) => {
      state.catchPage = state.catchPage + 1;
    },
    addCommentCount: (state) => {
      state.missingPostDetail.commentCount =
        state.missingPostDetail.commentCount + 1;
      state.catchPostDetail.commentCount =
        state.catchPostDetail.commentCount + 1;
    },
    resetCommentInput: (state) => {
      state.CommentInputState = false;
    },
    resetPetworkLists: (state) => {
      state.missingPostLists = [];
      state.catchPostLists = [];
    },
    removeCommentCount: (state) => {
      state.missingPostDetail.commentCount =
        state.missingPostDetail.commentCount - 1;
      state.catchPostDetail.commentCount =
        state.catchPostDetail.commentCount - 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__PostMissingData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(__PostMissingData.fulfilled, (state, action) => {
      state.loading = false;
      state.postId = action.payload.id;
      state.error = null;
      state.missingPostLists = [
        { ...action.payload },
        ...state.missingPostLists,
      ];
    });
    builder.addCase(__PostMissingData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

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

    builder.addCase(__PostCatchData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(__PostCatchData.fulfilled, (state, action) => {
      state.loading = false;
      state.postId = action.payload.id;
      state.error = null;
    });
    builder.addCase(__PostCatchData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
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

    builder
      .addCase(__postCatchScrap.fulfilled, (state, action) => {
        const index = state.catchPostLists.findIndex(
          (item) => item.id === action.payload.id
        );
        if (action.payload.page === "petworkLists") {
          const updateListsItem = {
            ...state.catchPostLists[index],
            isWished: action.payload.state,
          };
          state.catchPostLists[index] = updateListsItem;
        } else if (action.payload.page === "petworkDetail") {
          state.catchPostDetail.isWished = action.payload.state;
          const updateListsItem = {
            ...state.catchPostLists[index],
            isWished: action.payload.state,
          };
          state.catchPostLists[index] = updateListsItem;
          if (state.catchPostDetail.isWished) {
            state.catchPostDetail.wishedCount =
              state.catchPostDetail.wishedCount + 1;
          } else {
            state.catchPostDetail.wishedCount =
              state.catchPostDetail.wishedCount - 1;
          }
        }
      })
      .addCase(__postCatchScrap.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__postMissingScrap.fulfilled, (state, action) => {
        const index = state.missingPostLists.findIndex(
          (item) => item.id === action.payload.id
        );
        if (action.payload.page === "petworkLists") {
          const updateListsItem = {
            ...state.missingPostLists[index],
            isWished: action.payload.state,
          };
          state.missingPostLists[index] = updateListsItem;
        } else if (action.payload.page === "petworkDetail") {
          state.missingPostDetail.isWished = action.payload.state;
          const updateListsItem = {
            ...state.missingPostLists[index],
            isWished: action.payload.state,
          };
          state.missingPostLists[index] = updateListsItem;
          if (state.missingPostDetail.isWished) {
            state.missingPostDetail.wishedCount =
              state.missingPostDetail.wishedCount + 1;
          } else {
            state.missingPostDetail.wishedCount =
              state.missingPostDetail.wishedCount - 1;
          }
        }
      })
      .addCase(__postMissingScrap.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__deletePost.fulfilled, (state, action) => {
        if (action.payload.type === "missing") {
          const index = state.missingPostLists.findIndex((item) => {
            return item.id === Number(action.payload.id);
          });
          state.missingPostLists.splice(index, 1);
        } else if (action.payload.type === "catch") {
          const index = state.catchPostLists.findIndex(
            (item) => item.id === Number(action.payload.id)
          );
          state.catchPostLists.splice(index, 1);
        }
      })
      .addCase(__deletePost.rejected, (state) => {
        state.error = true;
      });
  },
});

export const {
  toggleCategory,
  toggleCommentInput,
  addMissingPage,
  addCatchPage,
  resetCommentInput,
  resetPetworkLists,
  addCommentCount,
  removeCommentCount,
} = petworkSlice.actions;
export default petworkSlice.reducer;
