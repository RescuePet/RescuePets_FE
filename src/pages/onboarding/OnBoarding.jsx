import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import OnbooardingCarousel from "./components/OnboardingCarousel";
import isLogin from "../../utils/isLogin";

import { initAmplitude, logEvent, resetAmplitude } from "../../utils/amplitude";

const OnBoarding = () => {
  // 앰플리튜드
  const location = useLocation();
  useEffect(() => {
    initAmplitude();
    logEvent(`enter_${location.pathname}`);
    return () => {
      resetAmplitude();
    };
  }, []);

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
