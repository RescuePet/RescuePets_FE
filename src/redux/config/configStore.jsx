import { configureStore } from "@reduxjs/toolkit";
import users from "../modules/signSlice";
import chat from "../modules/chatSlice";
import menubar from "../modules/menubarSlice";
import onboarding from "../modules/onboardingSlice";
import getData from "../modules/getdata";

const store = configureStore({
  reducer: { users, chat, menubar, onboarding, getData: getData.reducer },
});

export default store;
