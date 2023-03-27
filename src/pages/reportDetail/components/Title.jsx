import React from "react";
import styled from "styled-components";
import { Body_400_14 } from "../../../style/theme";
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
      <img src={titleInfo.sexCd} alt="missingSex" />
      <RegularText>{titleInfo.info}</RegularText>
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

const RegularText = styled.span`
  ${ContentInformationStyle}
  flex-basis: 190px;
`;

export default Title;
