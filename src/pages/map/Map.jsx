import React, { useEffect } from "react";
import Layout from "../../layouts/Layout";
import KakaoMap from "./KakaoMap";

import {
  initAmplitude,
  logEvent,
  setAmplitudeUserId,
  resetAmplitude,
} from "../../utils/amplitude";
import { useLocation } from "react-router-dom";
import isLogin from "../../utils/isLogin";

const Map = () => {
  // 앰플리튜드
  const location = useLocation();
  useEffect(() => {
    initAmplitude();
    logEvent(`enter_${location.pathname}`);
    if (isLogin()) {
      setAmplitudeUserId();
    }
    return () => {
      resetAmplitude();
    };
  }, []);

  return (
    <Layout>
      <KakaoMap />
    </Layout>
  );
};

export default Map;
