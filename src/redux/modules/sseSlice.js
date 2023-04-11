import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  chatCount : Number(localStorage.getItem("chatCount")) || 0, 
    ssemycount : Number(localStorage.getItem("myCount")) || 0,
};

export const SseCount = createSlice({
  name: "seeCount",
  initialState: initialState,
  reducers: {
    seeChatCount: (state, action) => {
        const newCount = state.chatCount + action.payload;
        state.chatCount = newCount;
        localStorage.setItem("chatCount", newCount); 
      },
      seeChatCountReset: (state, action) => {
        state.chatCount = action.payload;
        localStorage.setItem("chatCount", action.payload); 
      },

      seeMyaddCount: (state, action) => {
        const newCount = state.ssemycount + action.payload;
        state.ssemycount = newCount;
        localStorage.setItem("myCount", newCount); 
      },
      seeMyCountReset: (state, action) => {
        state.ssemycount = action.payload;
        localStorage.setItem("myCount", action.payload);
      },
  },
});
export const { seeChatCount,seeChatCountReset ,seeMyaddCount,seeMyCountReset} = SseCount.actions;

export default SseCount.reducer;


