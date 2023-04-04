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
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Post missing comment
export const __postMissingComment = createAsyncThunk(
  "postMissingComment",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post(
        `api/pets/missing/comments/${payload.id}`,
        { content: payload.content }
      );
      console.log("post missing comment", response.data);
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
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Post catch comment
export const __postCatchComment = createAsyncThunk(
  "postCatchComment",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post(
        `api/pets/catch/comments/${payload.id}`,
        { content: payload.content }
      );
      console.log("post catch comment", response.data);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Delete missing comment
export const __deleteMissingComment = createAsyncThunk(
  "deleteMissingComment",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.delete(
        `api/pets/missing/comments/${payload}`
      );
      console.log("delete missing comment", response.data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const initialState = {
  error: false,
  missingComment: [],
  catchComment: [],
  editDone: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    toggleEditDone: (state, action) => {
      state.editDone = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getMissingComment.fulfilled, (state, action) => {
        state.missingComment = action.payload;
      })
      .addCase(__getMissingComment.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__postMissingComment.fulfilled, (state) => {
        state.editDone = true;
      })
      .addCase(__postMissingComment.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__getCatchComment.fulfilled, (state, action) => {
        state.catchComment = action.payload;
      })
      .addCase(__getCatchComment.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__postCatchComment.fulfilled, (state) => {
        state.editDone = true;
      })
      .addCase(__postCatchComment.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__deleteMissingComment.fulfilled, (state, action) => {
        state.missingComment = state.missingComment.filter(
          (comment) => comment.id !== action.payload
        );
        state.editDone = true;
      })
      .addCase(__deleteMissingComment.rejected, (state) => {
        state.error = true;
      });
  },
});

export const { toggleEditDone } = commentSlice.actions;
export default commentSlice.reducer;
