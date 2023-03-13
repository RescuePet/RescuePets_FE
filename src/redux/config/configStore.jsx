import { configureStore } from "@reduxjs/toolkit";
import users from "../modules/signSlice";

const store = configureStore({
  reducer: { users },
});

export default store;
