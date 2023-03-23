import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../utils/api";

const KakaoSignin = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    KakaoSignIn();
  }, []);

  const KakaoSignIn = async () => {
    await instance.get(`/member/kakao/callback/?code=${code}`);
    navigate("/home");
  };

  return <div>KakaoSignin</div>;
};

export default KakaoSignin;
