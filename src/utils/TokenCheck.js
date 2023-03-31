import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const TokenCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const getToken = Cookies.get("Token");

  const SignIN = location.pathname === "/signin";
  const SignUP = location.pathname === "/signup";
  const Onboarding = location.pathname === "/";

  useEffect(() => {
    if (!SignIN && !SignUP && !Onboarding && !getToken) {
      alert("로그인 시간이 만료되었습니다. 다시 로그인 해주세요");
      setTimeout(function () {
        navigate("/signin");
      }, 1000);
    }
  }, [SignIN, SignUP, getToken, navigate]);

  return null;
};
