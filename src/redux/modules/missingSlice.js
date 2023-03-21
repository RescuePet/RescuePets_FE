import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/api";


// 실종 글 불러오기
export const __GetMissingData = createAsyncThunk(
    "getMissingData",
    async (arg, thunkAPI) => {
        try {
            const response = await instance.get('/api/pets/missing/all');
            console.log("response", response);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }
);


// 실종 글 작성
export const __PostMissingData = createAsyncThunk(
    "postMissingData",
    async (payload, thunkAPI) => {
        console.log(payload)
        try {
            const response = await instance.post('/api/pets/missing/', payload);
            console.log("response", response);
        } catch (error) {
            console.log(error.response);
        }
    }
);

const initialState = {
    data: [],
    error: false,
    loading: false,

};

export const postMissingData = createSlice({
    name: "postMissingData",
    initialState,
    reducers: {
        toggleCategory: (state, action) => {
            state.category = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(__PostMissingData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(__PostMissingData.fulfilled, (state, action) => {
            state.loading = false;
            // state.data = action.payload;
            state.error = null;
        });
        builder.addCase(__PostMissingData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });


        builder.addCase(__GetMissingData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(__GetMissingData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(__GetMissingData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default postMissingData.reducer;