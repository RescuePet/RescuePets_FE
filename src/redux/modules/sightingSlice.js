import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/api";

// 목격 글 불러오기
export const __GetSightingData = createAsyncThunk(
    "getSightingData",
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
export const __PostSightingData = createAsyncThunk(
    "postSightingData",
    async (payload, thunkAPI) => {
        console.log(payload)
        try {
            const response = await instance.post('/api/pets/catch/', payload);
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

export const Sighting = createSlice({
    name: "Sighting",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(__PostSightingData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(__PostSightingData.fulfilled, (state, action) => {
            state.loading = false;
            // state.data = action.payload;
            state.error = null;
        });
        builder.addCase(__PostSightingData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });


        builder.addCase(__GetSightingData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(__GetSightingData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(__GetSightingData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default Sighting.reducer;