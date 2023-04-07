import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdoptionDetail from "../pages/adoptionDetail/AdoptionDetail";
import OnBoarding from "../pages/onboarding/OnBoarding";
import Map from "../pages/map/Map";
import Profile from "../pages/profile/Profile";
import Signin from "../pages/sign/Signin";
import Signup from "../pages/sign/Signup";
import ReportPosting from "../test/ReportPosting";
import ChatList from "../pages/chat/ChatList";
import ChatRoom from "../pages/chat/ChatRoom";
import Home from "../pages/home/Home";
import Missing from "../pages/report/Missing";
import PetworkList from "../pages/petwork/PetworkList";
import MissingDetail from "../pages/reportDetail/MissingDetail";
import CatchDetail from "../pages/reportDetail/CatchDetail";
import Catch from "../pages/report/Catch";
import KakaoSignin from "../pages/sign/KakaoSignin";
import Editinfo from "../pages/profile/Editinfo";
import Poster from "../pages/poster/Poster";
import MyComment from "../pages/profile/MyComment";
import MyPost from "../pages/profile/MyPost";
import MyScrap from "../pages/profile/MyScrap";
import EditCatch from "../pages/report/edit/EditCatch";
import EditMissing from "../pages/report/edit/EditMissing";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnBoarding />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adoptiondetail/:id" element={<AdoptionDetail />} />
        <Route path="/map" element={<Map />} />
        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/chatroom/:nickname/:id" element={<ChatRoom />} />
        <Route path="/missing" element={<Missing />} />
        <Route path="/catch" element={<Catch />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editinfo" element={<Editinfo />} />
        <Route path="/testreport" element={<ReportPosting />} />
        <Route path="/petwork" element={<PetworkList />} />
        <Route path="/missingdetail/:id" element={<MissingDetail />} />
        <Route path="/catchdetail/:id" element={<CatchDetail />} />
        <Route path="/editcatch/:id" element={<EditCatch />} />
        <Route path="/editmissing/:id" element={<EditMissing />} />
        <Route path="/kakaologin" element={<KakaoSignin />} />
        <Route path="/poster/:id" element={<Poster />} />
        <Route path="/profile/mycomment" element={<MyComment />} />
        <Route path="/profile/mypost" element={<MyPost />} />
        <Route path="/profile/myscrap" element={<MyScrap />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
