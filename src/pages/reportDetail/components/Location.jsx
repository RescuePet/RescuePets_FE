import React, { useEffect } from "react";
import styled from "styled-components";
import { Body_400_12, Body_400_14, BorderRadius } from "../../../style/theme";
import { FlexAttribute, PostBorderStyle } from "../../../style/Mixin";
import Marker from "../../../asset/marker.png"

const Location = ({ locationInfo }) => {
  const { kakao } = window;
  console.log(locationInfo)

  useEffect(() => {

    const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = {
        center: new kakao.maps.LatLng(locationInfo.happenLatitude, locationInfo.happenLongitude), // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨
      };
    const map = new kakao.maps.Map(mapContainer, mapOption);


    const imageSrc = `${Marker}` // 마커이미지의 주소입니다    
    const imageSize = new kakao.maps.Size(16, 20)// 마커이미지의 크기입니다
    const imageOption = { offset: new kakao.maps.Point(10, 20) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

    const marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다 
      position: map.getCenter(),
      image: markerImage // 마커이미지 설정 
    });
    // 지도에 마커를 표시합니다
    marker.setMap(map);

  }, [locationInfo])

  // state
  // happenLatitude
  // happenLongitude

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
      <MapDiv id="map"></MapDiv>
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
