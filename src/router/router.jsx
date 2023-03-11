import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Adoption from '../pages/adoption/Adoption';
import AdoptionDetail from '../pages/adoptionDetail/AdoptionDetail';
import Introduction from '../pages/introduction/Introduction';
import Map from '../pages/map/Map';
import Profile from '../pages/profile/Profile';
import Report from '../pages/report/Report';
import ReportDetail from '../pages/reportDetail/ReportDetail';
import Signin from '../pages/sign/Signin';
import Signup from '../pages/sign/Signup';
import ReportPosting from '../test/ReportPosting';
import KakaoMap from '../test/KakaoMap';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adoption" element={<Adoption />} />
        <Route path="/adoptiondetail" element={<AdoptionDetail />} />
        <Route path="/map" element={<Map />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report" element={<Report />} />
        <Route path="/reportdetail" element={<ReportDetail />} />
        <Route path="/testreport" element={<ReportPosting />} />
        <Route path="/testmap" element={<KakaoMap />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
