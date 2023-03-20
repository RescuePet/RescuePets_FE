import React from "react";
import styled from "styled-components";
import { FlexAttribute } from "../../../style/Mixin";
import { Body_400_12 } from "../../../style/theme";

const CardInfo = () => {
  return (
    <InfoWrapper>
      <TitleSvg></TitleSvg>
      <Contents>수원 영통구</Contents>
    </InfoWrapper>
  );
};

const InfoWrapper = styled.div`
  ${FlexAttribute("row")}
`;

const TitleSvg = styled.div`
  width: 10px;
  height: 10px;
`;

const Contents = styled.span`
  ${Body_400_12}
  color: #999999;
  margin-top: 8px;
`;

export default CardInfo;
