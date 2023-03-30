import React from "react";
import styled from "styled-components";
import { FlexAttribute } from "../../../style/Mixin";
import { Body_400_12 } from "../../../style/theme";

const CardInfo = ({ children, svg }) => {
  return (
    <InfoWrapper>
      <Svg src={svg} alt="cardSvg" />
      <Contents>{children}</Contents>
    </InfoWrapper>
  );
};

const InfoWrapper = styled.div`
  ${FlexAttribute("row")}
`;

const Svg = styled.img`
  width: 1rem;
  height: 1rem;
`;

const Contents = styled.span`
  ${Body_400_12}
  line-height: 1rem;
  color: #999999;
`;

export default CardInfo;
