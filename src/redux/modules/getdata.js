import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    isLoading: false,
    error: null,
};


export const __GETDATA = createAsyncThunk(
    "getData",
    async (arg, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:4000/map')
            // console.log("response :", response)
            return thunkAPI.fulfillWithValue(response.data)
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const getData = createSlice({
    name: "getData",
    initialState,
    reducers: {},
    // 미들웨어
    extraReducers: (builder) => {
        builder.addCase(__GETDATA.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(__GETDATA.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
        });
        builder.addCase(__GETDATA.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export default getData;
