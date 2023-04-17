import { instance } from "../../utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Get My Info
export const __getMyInfo = createAsyncThunk(
  "getMyInfo",
  async (_, thunkAPI) => {
    try {
      const response = await instance.get("api/mypage");
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
);

// Get My Post
export const __getMyPost = createAsyncThunk(
  "getMyPost",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `api/post/member/?page=${Number(payload.page)}&size=${Number(
          payload.size
        )}`
      );
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Get My Comment
export const __getMyComment = createAsyncThunk(
  "getMyComment",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `api/comments/member?page=${payload.page}&size=${payload.size}`
      );
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Get My Scrap post
export const __getMyScrap = createAsyncThunk(
  "getMyScrap",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `api/scrap/list/?page=${payload.page}&size=${payload.size}&sortBy=createdAt`
      );
      return thunkAPI.fulfillWithValue(response.data.data.scrapResponseDtoList);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Get User List
export const __getUserList = createAsyncThunk(
  "getUserList",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `/api/member/list?page=${payload.page}&size=${payload.size}`
      );
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
);

// Put User Grade
export const __putUserGrade = createAsyncThunk(
  "putUserGrade",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.put(`/api/member/role`, payload);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);

// Get Report List
export const __getReportList = createAsyncThunk(
  "getReportList",
  async (_, thunkAPI) => {
    try {
      const response = await instance.get(`/api/report/all`);
      console.log(response);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
);

// Delete Report List
export const __deleteReportList = createAsyncThunk(
  "deleteReportList",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.delete(`/api/report/${payload}`);
      console.log(response);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  loading: false,
  error: false,
  errorMessage: "",
  myData: { postCount: 0, commentCount: 0, scrapCount: 0 },
  myPostList: [],
  myPostPage: 1,
  myCommentList: [],
  myCommentPage: 1,
  myScrapList: [],
  myScrapPage: 1,
  userList: [],
  userListPage: 1,
  reportList: [],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addMyPostPage: (state) => {
      state.entirePostPage = state.entirePostPage + 1;
    },
    deleteMyComment: (state, action) => {
      state.myCommentList = state.myCommentList.filter(
        (item) => item.id !== action.payload
      );
      state.myData.commentCount = state.myData.commentCount - 1;
    },
    deleteMyPost: (state, action) => {
      state.myPostList = state.myPostList.filter(
        (item) => item.id !== action.payload
      );
      state.myData.postCount = state.myData.postCount - 1;
    },
    resetProfileState: (state) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getMyInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(__getMyInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.myData = action.payload;
      })
      .addCase(__getMyInfo.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__getMyPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(__getMyPost.fulfilled, (state, action) => {
        state.loading = false;
        state.myPostPage = state.myPostPage + 1;
        state.myPostList = [...state.myPostList, ...action.payload];
      })
      .addCase(__getMyPost.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__getMyComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(__getMyComment.fulfilled, (state, action) => {
        state.loading = false;
        state.myCommentPage = state.myCommentPage + 1;
        state.myCommentList = [
          ...state.myCommentList,
          ...action.payload.dtoList,
        ];
      })
      .addCase(__getMyComment.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__getMyScrap.pending, (state) => {
        state.loading = true;
      })
      .addCase(__getMyScrap.fulfilled, (state, action) => {
        state.loading = false;
        state.myScrapPage = state.myScrapPage + 1;
        state.myScrapList = [...state.myScrapList, ...action.payload];
      })
      .addCase(__getMyScrap.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__getUserList.fulfilled, (state, action) => {
        state.userList = [...action.payload];
        state.userListPage = state.userListPage + 1;
      })
      .addCase(__getUserList.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__putUserGrade.fulfilled, (state, action) => {
        const itemIndex = state.userList.findIndex(
          (item) => item.id === action.payload.id
        );
        state.userList[itemIndex] = { ...action.payload };
      })
      .addCase(__putUserGrade.rejected, (state, action) => {
        state.error = true;
        if (action.payload === 409)
          state.errorMessage = "이미 BAD MEMBER 입니다.";
      });

    builder
      .addCase(__getReportList.fulfilled, (state, action) => {
        state.reportList = [...action.payload];
      })
      .addCase(__getReportList.rejected, (state) => {
        state.error = true;
      });

    builder.addCase(__deleteReportList.fulfilled, (state, action) => {
      state.reportList = state.reportList.filter((item) => {
        return item.id !== action.payload;
      });
    });
  },
});

export const {
  addMyPostPage,
  deleteMyComment,
  deleteMyPost,
  resetProfileState,
} = profileSlice.actions;
export default profileSlice.reducer;
