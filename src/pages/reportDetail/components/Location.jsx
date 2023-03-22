import React from "react";
import styled from "styled-components";
import { Body_400_12, Body_400_14, BorderRadius } from "../../../style/theme";
import { FlexAttribute, PostBorderStyle } from "../../../style/Mixin";

const Location = ({ locationInfo }) => {
  return (
    <LocationContainer>
      <LocationWrapper>
        <SemiText className="locationtitle">{locationInfo.state}</SemiText>
        <ContentTextWrapper>
          <ContentText>
            {locationInfo.happenLatitude + " " + locationInfo.happenLongitude}
          </ContentText>
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
  margin-bottom: 16px;
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

const ContentText = styled.span`
  display: inline-block;
  ${Body_400_12}
  color: #666666;
`;

const MapDiv = styled.div`
  width: 335px;
  height: 112px;
  ${BorderRadius}
  background-color: #666666;
`;

export default Location;
