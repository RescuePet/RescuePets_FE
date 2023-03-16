import React from "react";
import styled from "styled-components";
import { ContentTextStyle } from "../../../style/Mixin";
import { Body_400_14, BorderRadius } from "../../../style/theme";
import {
  ContentOptionTextStyle,
  FlexAttribute,
  PostBorderStyle,
} from "../../../style/Mixin";

const Location = ({ locationData }) => {
  return (
    <LocationContainer>
      <LocationWrapper>
        <SemiText className="locationtitle">보호정보</SemiText>
        <ContentTextWrapper>
          <ContentText>{locationData.careNm}</ContentText>
          <ContentTextBox>
            <ContentOptionText>TEL | </ContentOptionText>
            &nbsp;<ContentText>{locationData.careTel}</ContentText>
          </ContentTextBox>
        </ContentTextWrapper>
      </LocationWrapper>
      <MapDiv></MapDiv>
    </LocationContainer>
  );
};

const SemiText = styled.span`
  ${Body_400_14}
`;

const LocationContainer = styled.div`
  ${FlexAttribute("column", "", "center")}
  ${PostBorderStyle}
`;

const LocationWrapper = styled.div`
  width: 335px;
  ${FlexAttribute("row", "center")}
  .locationtitle {
    flex-basis: 114px;
  }
`;

const ContentTextWrapper = styled.div`
  flex-basis: 220px;
  margin-top: 2px;
  span:first-child {
    margin-bottom: 8px;
  }
`;

const ContentTextBox = styled.div`
  ${FlexAttribute("row")}
`;

const ContentOptionText = styled.span`
  ${ContentOptionTextStyle}
`;

const ContentText = styled.span`
  display: inline-block;
  ${ContentTextStyle}
`;

const MapDiv = styled.div`
  width: 335px;
  height: 112px;
  ${BorderRadius}
  background-color: #666666;
`;

export default Location;
