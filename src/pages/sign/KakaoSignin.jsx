import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Splash from "../../elements/Splash";
import { instance } from "../../utils/api";

import {
  initAmplitude,
  logEvent,
  setAmplitudeUserId,
  resetAmplitude,
} from "../../utils/amplitude";

const KakaoSignin = () => {
  const location = useLocation();
  useEffect(() => {
    initAmplitude();
    logEvent(`enter_/${location.pathname.split("/")[1]}`);
    return () => {
      resetAmplitude();
    };
  }, []);

  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    KakaoSignIn();
  }, []);

  const KakaoSignIn = async () => {
    await instance.get(`/member/kakao/callback/?code=${code}`);
    navigate("/home");
  };

  return <Splash />;
};

export default KakaoSignin;
