import { createSlice } from "@reduxjs/toolkit";
import carousel1 from "../../asset/carousel/1.jpg";
import carousel2 from "../../asset/carousel/2.jpg";
import carousel3 from "../../asset/carousel/3.jpg";

const initialState = {
  images: [
    { id: 1, src: carousel1 },
    { id: 2, src: carousel2 },
    { id: 3, src: carousel3 },
  ],
  currentIndex: 0,
};

export const carouselSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    prevImage: (state) => {
      state.currentIndex =
        (state.currentIndex - 1 + state.images.length) % state.images.length;
    },
    nextImage: (state) => {
      state.currentIndex = (state.currentIndex + 1) % state.images.length;
    },
  },
});

export const { nextImage, prevImage } = carouselSlice.actions;

export default carouselSlice.reducer;
