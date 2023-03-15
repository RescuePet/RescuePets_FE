import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggle: true,
};

export const menuBarSlice = createSlice({
    name: 'menuBar',
    initialState: initialState,
    reducers: {
        toggleMenu: (state, action) => {
            state.toggle = action.payload
        },
    },
});

export default menuBarSlice.reducer;

export const { toggleMenu } = menuBarSlice.actions;