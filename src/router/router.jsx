import { BrowserRouter, Routes, Route } from "react-router-dom";
import Adoption from "../pages/adoption/Adoption";
import AdoptionDetail from "../pages/adoptionDetail/AdoptionDetail";
import OnBoarding from "../pages/onboarding/OnBoarding";
import Map from "../pages/map/Map";
import Profile from "../pages/profile/Profile";
import Report from "../pages/report/Report";
import ReportDetail from "../pages/reportDetail/ReportDetail";
import Signin from "../pages/sign/Signin";
import Signup from "../pages/sign/Signup";
import ReportPosting from "../test/ReportPosting";
import ChatList from "../pages/chat/ChatList";
import ChatRoom from "../pages/chat/ChatRoom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnBoarding />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adoption" element={<Adoption />} />
        <Route path="/adoptiondetail" element={<AdoptionDetail />} />
        <Route path="/map" element={<Map />} />
        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/report" element={<Report />} />
        <Route path="/reportdetail" element={<ReportDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/testreport" element={<ReportPosting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
