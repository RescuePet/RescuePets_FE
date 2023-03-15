import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 0,
};

export const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState: initialState,
    reducers: {
        onboarding: (state, action) => {
            state.page = action.payload
        },
    },
});

export default onboardingSlice.reducer;

export const { onboarding } = onboardingSlice.actions;