import { configureStore } from "@reduxjs/toolkit";
import users from "../modules/signSlice";
import adoption from "../modules/adoptionSlice";
import menubar from "../modules/menubarSlice";
import onboarding from "../modules/onboardingSlice";
import petwork from "../modules/petworkSlice";
import comment from "../modules/commentSlice";
import MissingData from "../modules/missingSlice";
import catchData from "../modules/catchSlice";
import profile from "../modules/profileSlice";
import myChat from "../modules/chatSlice";
import infoEdit from "../modules/infoeditSlice";

const store = configureStore({
  reducer: {
    users,
    menubar,
    onboarding,
    petwork,
    comment,
    adoption,
    MissingData,
    catchData,
    profile,
    myChat,
    infoEdit
  },
});

export default store;
