import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdoptionDetail from "../pages/adoptionDetail/AdoptionDetail";
import { Spinner } from "../components/Spinner";
import OnBoarding from "../pages/onboarding/OnBoarding";
import ReportPosting from "../test/ReportPosting";
import KakaoSignin from "../pages/sign/KakaoSignin";
import NotFound from "../pages/NotFound";
import CustomerSC from "../pages/profile/CustomerSC";
import CarouselLink from "../pages/carousel/CarouselLink";

import DeleteList from "../pages/profile/DeleteList";

const Signin = lazy(() => import("../pages/sign/Signin"));
const Signup = lazy(() => import("../pages/sign/Signup"));
const Home = lazy(() => import("../pages/home/Home"));
const Map = lazy(() => import("../pages/map/Map"));
const Profile = lazy(() => import("../pages/profile/Profile"));
const PetworkList = lazy(() => import("../pages/petwork/PetworkList"));
const Missing = lazy(() => import("../pages/report/Missing"));
const Catch = lazy(() => import("../pages/report/Catch"));
const MissingDetail = lazy(() => import("../pages/reportDetail/MissingDetail"));
const CatchDetail = lazy(() => import("../pages/reportDetail/CatchDetail"));
const ChatList = lazy(() => import("../pages/chat/ChatList"));
const Editinfo = lazy(() => import("../pages/profile/Editinfo"));
const ChatRoom = lazy(() => import("../pages/chat/ChatRoom"));
const Poster = lazy(() => import("../pages/poster/Poster"));
const MyComment = lazy(() => import("../pages/profile/MyComment"));
const MyPost = lazy(() => import("../pages/profile/MyPost"));
const MyScrap = lazy(() => import("../pages/profile/MyScrap"));
const EditMissing = lazy(() => import("../pages/report/edit/EditMissing"));
const EditCatch = lazy(() => import("../pages/report/edit/EditCatch"));
const UserGrade = lazy(() => import("../pages/profile/UserGrade"));
const ReportManagement = lazy(() =>
  import("../pages/profile/ReportManagement")
);



const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
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
          <Route path="/profile/usergrade" element={<UserGrade />} />
          <Route
            path="/profile/reportmanagement"
            element={<ReportManagement />}
          />
          <Route path="/profile/deletelists" element={<DeleteList />} />
          <Route path="/profile/customer" element={<CustomerSC />} />
          <Route path="/introduce" element={<CarouselLink />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
