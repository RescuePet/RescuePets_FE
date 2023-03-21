import { configureStore } from "@reduxjs/toolkit";
import users from "../modules/signSlice";
import adoption from "../modules/adoptioonSlice";
import menubar from "../modules/menubarSlice";
import onboarding from "../modules/onboardingSlice";
import getData from "../modules/getdata";
import petwork from "../modules/petworkSlice";
import comment from "../modules/commentSlice";

const store = configureStore({
  reducer: {
    users,
    menubar,
    onboarding,
    getData: getData.reducer,
    adoption,
    petwork,
    comment,
  },
});

export default store;
