import React, { useEffect } from "react";
import Layout from "../../layouts/Layout";
import styled from "styled-components";
import introduce from "../../asset/carousel/introduce.png";
import { useLocation } from "react-router-dom";

import {
  initAmplitude,
  logEvent,
  setAmplitudeUserId,
  resetAmplitude,
} from "../../utils/amplitude";

const CarouselLink = () => {
  // 앰플리튜드
  const location = useLocation();
  useEffect(() => {
    initAmplitude();
    logEvent(`enter_${location.pathname}`);
    setAmplitudeUserId();
    return () => {
      resetAmplitude();
    };
  }, []);

  return (
    <IntroduceLayout>
      <IntroduceImage src={introduce} />
    </IntroduceLayout>
  );
};

const IntroduceLayout = styled(Layout)`
  position: relative;
`;

const IntroduceImage = styled.img``;

export default CarouselLink;
