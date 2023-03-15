import { configureStore } from "@reduxjs/toolkit";
import users from "../modules/signSlice";
import chat from "../modules/chatSlice";
import menubar from "../modules/menubarSlice";
import onboarding from "../modules/onboardingSlice";

const store = configureStore({
  reducer: { users, chat, menubar, onboarding },
});

export default store;
