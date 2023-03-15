import { configureStore } from "@reduxjs/toolkit";
import users from "../modules/signSlice";
import chat from "../modules/chatSlice";
import menubar from "../modules/menubarSlice";

const store = configureStore({
  reducer: { users, chat, menubar },
});

export default store;
