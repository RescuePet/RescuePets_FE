import { BrowserRouter, Routes, Route } from "react-router-dom";
import Adoption from "../pages/adoption/Adoption";
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
import Sighting from "../pages/report/Sighting";
import PetworkList from "../pages/petwork/PetworkList";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnBoarding />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adoption" element={<Adoption />} />
        <Route path="/adoptiondetail/:id" element={<AdoptionDetail />} />
        <Route path="/map" element={<Map />} />
        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/missing" element={<Missing />} />
        <Route path="/sighting" element={<Sighting />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/testreport" element={<ReportPosting />} />
        <Route path="/petwork" element={<PetworkList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
