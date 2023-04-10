import { createSlice } from "@reduxjs/toolkit";

// const 
// const SSECOUNT = localStorage.setItem("SSECount", 0)


const initialState = {
    ssecount : Number(localStorage.getItem("SSECount")) || 0, // 로컬 스토리지에서 기존 값 불러오기
    count : Number(localStorage.getItem("SSECount")) || 0, // 로컬 스토리지에서 기존 값 불러오기
};

export const SseCount = createSlice({
  name: "seeCount",
  initialState: initialState,
  reducers: {
    seeaddCount: (state, action) => {
        const newCount = state.ssecount + action.payload;
        state.ssecount = newCount;
        localStorage.setItem("SSECount", newCount); // 로컬 스토리지에 새로운 값 저장
      },
  },
});
export const { seeaddCount } = SseCount.actions;

export default SseCount.reducer;


