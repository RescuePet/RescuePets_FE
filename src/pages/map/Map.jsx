import React, { useState } from 'react';
import KakaoMap from '../../test/KakaoMap';
import Footer from '../../layouts/Footer';

const Map = () => {

  // const [MenuBarToggle, setMenuBarToggle] = useState(null)

  // const menuBarToggle = (menuBarToggle) => {
  //   console.log("Footer에서 가져온값", menuBarToggle);
  //   setMenuBarToggle(menuBarToggle)
  // }

  return (
    <div>
      {/* <KakaoMap props={MenuBarToggle} />
      <Footer propFunctionMenuBarToggle={menuBarToggle} /> */}
      <KakaoMap />
      <Footer />
    </div>
  );
};

export default Map;
