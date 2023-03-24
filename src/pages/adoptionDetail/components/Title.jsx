import React from "react";
import styled from "styled-components";
import { Body_400_14 } from "../../../style/theme";
import {
  ContentInformationStyle,
  FlexAttribute,
  PostTitleBorderStyle,
  StateSpanStyle,
} from "../../../style/Mixin";

const Title = ({ titleData }) => {
  console.log(titleData)
  return (
    <TitleWrapper>
      <State>{titleData.state}</State>
      <SemiText>{titleData.kindCd}</SemiText>
      <SexCd src={titleData.sexCd} />
      <RegularText>{titleData.information}</RegularText>
    </TitleWrapper>
  );
};

const TitleWrapper = styled.div`
  ${FlexAttribute("row", "space-evenly", "center")}
  width: 100%;
  margin: 16px auto;
  ${PostTitleBorderStyle}
`;

const State = styled.span`
  ${StateSpanStyle}
  flex-basis: 35px;
`;

const SemiText = styled.span`
  flex-basis: 80px;
  text-align: center;
  ${Body_400_14}
`;

const SexCd = styled.img`
  flex-basis: 30px;
`;

const RegularText = styled.span`
  ${ContentInformationStyle}
  flex-basis: 190px;
`;

export default Title;
