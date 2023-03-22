import { configureStore } from "@reduxjs/toolkit";
import users from "../modules/signSlice";
import adoption from "../modules/adoptioonSlice";
import menubar from "../modules/menubarSlice";
import onboarding from "../modules/onboardingSlice";
import petwork from "../modules/petworkSlice";
import comment from "../modules/commentSlice";
import MissingData from "../modules/missingSlice";
import catchData from "../modules/catchSlice";

const store = configureStore({
  reducer: {
    users,
    menubar,
    onboarding,
    petwork,
    comment,
    adoption,
    MissingData,
    catchData
  },
});

export default store;
