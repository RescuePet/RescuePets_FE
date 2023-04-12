import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: true,
  optionState: false,
  reportState: false,
};

export const menuBarSlice = createSlice({
  name: "menuBar",
  initialState: initialState,
  reducers: {
    toggleMenu: (state, action) => {
      state.toggle = action.payload;
    },
    toggleOption: (state) => {
      state.optionState = !state.optionState;
    },
    toggleReport: (state) => {
      state.reportState = !state.reportState;
    },
  },
});

export default menuBarSlice.reducer;

export const { toggleMenu, toggleOption, toggleReport } = menuBarSlice.actions;
