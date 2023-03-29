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
  width: 16px;
  height: 16px;
`;

const Contents = styled.span`
  ${Body_400_12}
  line-height: 16px;
  color: #999999;
`;

export default CardInfo;
