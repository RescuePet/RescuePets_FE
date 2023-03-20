import React from "react";
import styled from "styled-components";
import { Body_400_14 } from "../../../style/theme";
import {
  ContentInformationStyle,
  FlexAttribute,
  PostTitleBorderStyle,
  StateSpanStyle,
} from "../../../style/Mixin";

const Title = () => {
  return (
    <TitleWrapper>
      <State>목격</State>
      <SemiText>러시안 블루</SemiText>
      <SexCd></SexCd>
      <RegularText>중성화 ?/나이 ?/몸무게 ?/회색</RegularText>
    </TitleWrapper>
  );
};

const TitleWrapper = styled.div`
  ${FlexAttribute("row", "space-between", "center")}
  width: 335px;
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

const SexCd = styled.div`
  width: 16px;
  height: 16px;
  background-color: #999999;
`;

const RegularText = styled.span`
  ${ContentInformationStyle}
  flex-basis: 190px;
`;

export default Title;
