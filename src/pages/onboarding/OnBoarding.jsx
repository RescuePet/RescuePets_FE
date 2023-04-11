import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import OnbooardingCarousel from "./components/OnboardingCarousel";
import isLogin from "../../utils/isLogin";

const OnBoarding = () => {
  const navigate = useNavigate();
  const onBoardingCheck = Cookies.get("OnBoardingCheck");

  useEffect(() => {
    if (!!onBoardingCheck && isLogin()) {
      navigate("/home");
    } else if (!!onBoardingCheck && !isLogin()) {
      navigate("/signin");
    }
    return () => {
      Cookies.set("OnBoardingCheck", true);
    };
  }, []);

  return (
    <OnboardingLayout>
      <OnbooardingCarousel />
    </OnboardingLayout>
  );
};

const OnboardingLayout = styled(Layout)`
  position: relative;
  padding-bottom: 0;
`;

export default OnBoarding;
