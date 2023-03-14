import { configureStore } from "@reduxjs/toolkit";
import users from "../modules/signSlice";
import chat from "../modules/chatSlice";

const store = configureStore({
  reducer: { users, chat },
});

export default store;
