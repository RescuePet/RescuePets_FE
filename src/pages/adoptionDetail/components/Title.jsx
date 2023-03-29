import React from "react";
import styled from "styled-components";
import { Body_400_14 } from "../../../style/theme";
import {
  ContentInformationStyle,
  FlexAttribute,
  PostTitleBorderStyle,
} from "../../../style/Mixin";
import State from "../../../elements/State";

const Title = ({ titleData }) => {
  return (
    <TitleContainer>
      <TitleWrapper>
        <State category={"adoptionDetail"}>{titleData.process}</State>
        <SemiText>{titleData.kindCd}</SemiText>
        <SexCd src={titleData.sexCd} />
        <RegularText>{titleData.information}</RegularText>
      </TitleWrapper>
    </TitleContainer>
  );
};

const TitleContainer = styled.div`
  ${FlexAttribute("row", "center")}
  width: 100%;
  ${PostTitleBorderStyle}
  margin: 16px 0;
`;

const TitleWrapper = styled.div`
  ${FlexAttribute("row", "space-evenly", "center")}
  width: 335px;
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
