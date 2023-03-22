import React from "react";
import styled from "styled-components";
import { Body_400_12, Body_400_14 } from "../../../style/theme";
import {
  ContentInformationStyle,
  FlexAttribute,
  StateSpanStyle,
} from "../../../style/Mixin";

const Title = ({ titleInfo }) => {
  return (
    <TitleWrapper>
      <State>{titleInfo.state}</State>
      <SemiText>{titleInfo.kindCd}</SemiText>
      <SexCd>{titleInfo.sexCd}/</SexCd>
      <RegularText>{titleInfo.info.join("/")}</RegularText>
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

const SexCd = styled.span`
  ${Body_400_12}
`;

const RegularText = styled.span`
  ${ContentInformationStyle}
  flex-basis: 190px;
`;

export default Title;
