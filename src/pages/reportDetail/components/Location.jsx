import React, { useEffect } from "react";
import styled from "styled-components";
import { Body_400_12, Body_400_14, BorderRadius } from "../../../style/theme";
import { FlexAttribute, PostBorderStyle } from "../../../style/Mixin";
import Marker from "../../../asset/marker/marker.png";

const Location = ({ locationInfo }) => {
  const { kakao } = window;
  // console.log(locationInfo);

  useEffect(() => {
    const staticMapContainer = document.getElementById("staticMap");
    const staticMapOption = {
      center: new kakao.maps.LatLng(
        locationInfo.happenLatitude,
        locationInfo.happenLongitude
      ),
      level: 5,
      draggable: false,
      // marker: markerImage
    };
    const map = new kakao.maps.Map(staticMapContainer, staticMapOption);
    // 커스텀 오버레이가 표시될 위치입니다

    const imageSrc = `${Marker}`;
    const imageSize = new kakao.maps.Size(16, 20);
    const imageOption = { offset: new kakao.maps.Point(10, 20) };

    const position = new kakao.maps.LatLng(
      locationInfo.happenLatitude,
      locationInfo.happenLongitude
    );
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    const marker = new kakao.maps.Marker({
      position: position,
      image: markerImage,
    });

    marker.setMap(map);

    // map.setDraggable(draggable);
  }, [locationInfo]);

  return (
    <LocationContainer>
      <LocationWrapper>
        <SemiText className="locationtitle">{locationInfo.state}</SemiText>
        <ContentTextWrapper>
          {/* <ContentText>
            {locationInfo.happenLatitude + " " + locationInfo.happenLongitude}
          </ContentText> */}
        </ContentTextWrapper>
      </LocationWrapper>
      <MapDiv id="staticMap"></MapDiv>
    </LocationContainer>
  );
};

const SemiText = styled.span`
  ${Body_400_14}
`;

const LocationContainer = styled.div`
  ${FlexAttribute("column", "", "center")}
  ${PostBorderStyle}
  margin-bottom: 1rem;
`;

const LocationWrapper = styled.div`
  width: 20.9375rem;
  ${FlexAttribute("row", "center")}
  .locationtitle {
    flex-basis: 7.125rem;
  }
`;

const ContentTextWrapper = styled.div`
  flex-basis: 13.75rem;
  margin-top: 0.125rem;
  padding-bottom: 2.1875rem;
  span:first-child {
    margin-bottom: 0.5rem;
  }
`;

const ContentText = styled.span`
  display: inline-block;
  ${Body_400_12}
  color: #666666;
`;

const MapDiv = styled.div`
  width: 20.9375rem;
  height: 7rem;
  ${BorderRadius}
  background-color: #666666;
  overflow: hidden;
`;

export default Location;
