import { configureStore } from "@reduxjs/toolkit";
import users from "../modules/signSlice";
import chat from "../modules/chatSlice";
import carousel from "../modules/carouselSlice";

const store = configureStore({
  reducer: { users, chat, carousel },
});

export default store;
