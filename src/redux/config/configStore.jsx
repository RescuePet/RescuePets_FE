import { configureStore } from "@reduxjs/toolkit";
import users from "../modules/signSlice";
import adoption from "../modules/adoptioonSlice";
import menubar from "../modules/menubarSlice";
import onboarding from "../modules/onboardingSlice";
import getData from "../modules/getdata";
import postMissingData from "../modules/missingSlice";
import sighting from "../modules/sightingSlice";

const store = configureStore({
  reducer: {
    users,
    menubar,
    onboarding,
    getData: getData.reducer,
    adoption,
    postMissingData,
    sighting
  },
});

export default store;
