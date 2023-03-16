import { configureStore } from "@reduxjs/toolkit";
import users from "../modules/signSlice";
import chat from "../modules/chatSlice";
import adoption from "../modules/adoptioonSlice";

const store = configureStore({
  reducer: { users, chat, adoption },
});

export default store;
