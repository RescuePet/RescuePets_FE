import React, { useState } from "react";
import Layout from "../../layouts/Layout";
import OnBoardingTab1 from "./OnBoardingTab1";
import OnBoardingTab2 from "./OnBoardingTab2";
import OnBoardingTab3 from "./OnBoardingTab3";
import { useSelector } from "react-redux";

const OnBoarding = () => {
  const data = useSelector((state) => {
    return state.onboarding.page;
  });

  return (
    <Layout>
      {data === 0 ? (
        <OnBoardingTab1 />
      ) : data === 1 ? (
        <OnBoardingTab2 />
      ) : (
        <OnBoardingTab3 />
      )}
    </Layout>
  );
};

export default OnBoarding;
