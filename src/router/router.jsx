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
import SightingDetail from "../pages/reportDetail/SightingDetail";
import Catch from "../pages/report/Catch";
import KakaoSignin from "../pages/sign/KakaoSignin";
import Editinfo from "../pages/profile/Editinfo"
import Poster from "../pages/poster/Poster";


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
        <Route path="/chatroom/:id" element={<ChatRoom />} />
        <Route path="/missing" element={<Missing />} />
        <Route path="/catch" element={<Catch />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editinfo" element={<Editinfo />} />
        <Route path="/testreport" element={<ReportPosting />} />
        <Route path="/petwork" element={<PetworkList />} />
        <Route path="/missingdetail/:id" element={<MissingDetail />} />
        <Route path="/sightingdetail/:id" element={<SightingDetail />} />
        <Route path="/kakaologin" element={<KakaoSignin />} />
        <Route path="/poster" element={ <Poster />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
