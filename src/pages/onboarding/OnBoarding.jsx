import React from "react";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import OnbooardingCarousel from "./components/OnboardingCarousel";

const OnBoarding = () => {
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
