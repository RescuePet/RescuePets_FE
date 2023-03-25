import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/api";

// 목격 글 불러오기
export const __GetCatchData = createAsyncThunk(
    "getCatchData",
    async (arg, thunkAPI) => {
        try {
            const response = await instance.get('/api/pets/catch/all');
            console.log("response", response);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }
);

// 목격 글 작성
export const __PostCatchData = createAsyncThunk(
    "postgetCatchData",
    async (payload, thunkAPI) => {
        try {
            await instance.post('/api/pets/catch/', payload);
            return thunkAPI.fulfillWithValue("success");
        } catch (error) {
            console.log(error.response);
            throw new Error(error.response.data.message);
        }
    }
);

const initialState = {
    data: [],
    error: false,
    loading: false,
};

export const catchData = createSlice({
    name: "catchData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(__PostCatchData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(__PostCatchData.fulfilled, (state, action) => {
            state.loading = false;
            // state.data = action.payload;
            state.error = null;
        });
        builder.addCase(__PostCatchData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });


        builder.addCase(__GetCatchData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(__GetCatchData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(__GetCatchData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default catchData.reducer;