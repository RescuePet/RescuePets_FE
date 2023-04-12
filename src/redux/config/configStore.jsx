import { configureStore } from "@reduxjs/toolkit";
import users from "../modules/signSlice";
import adoption from "../modules/adoptionSlice";
import menubar from "../modules/menubarSlice";
import petwork from "../modules/petworkSlice";
import comment from "../modules/commentSlice";
import MissingData from "../modules/missingSlice";
import catchData from "../modules/catchSlice";
import profile from "../modules/profileSlice";
import myChat from "../modules/chatSlice";
import infoEdit from "../modules/infoeditSlice";
import putMyposts from "../modules/editpostsSlice";
import sseCount from "../modules/sseSlice";
import search from "../modules/searchSlice";

const store = configureStore({
  reducer: {
    users,
    menubar,
    petwork,
    comment,
    adoption,
    MissingData,
    catchData,
    profile,
    myChat,
    infoEdit,
    putMyposts,
    sseCount,
    search,
  },
});

export default store;
