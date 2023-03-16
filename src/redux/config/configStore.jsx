import { configureStore } from "@reduxjs/toolkit";
import users from "../modules/signSlice";
import chat from "../modules/chatSlice";
import adoption from "../modules/adoptioonSlice";
import menubar from "../modules/menubarSlice";
import onboarding from "../modules/onboardingSlice";
import getData from "../modules/getdata";

const store = configureStore({
  reducer: { users, chat, menubar, onboarding, getData: getData.reducer, adoption },

});

export default store;
