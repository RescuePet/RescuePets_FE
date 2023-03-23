import React, { useEffect } from "react";
import styled from "styled-components";
import sheltermarker from "../../../asset/sheltermarker.png"
import { ContentTextStyle } from "../../../style/Mixin";
import { Body_400_14, BorderRadius } from "../../../style/theme";
import {
  ContentOptionTextStyle,
  FlexAttribute,
  PostBorderStyle,
} from "../../../style/Mixin";

const Location = ({ locationData }) => {
  const { kakao } = window;

  useEffect(() => {

    const mapContainer = document.getElementById('map'),
      mapOption = {
        center: new kakao.maps.LatLng(37, 127),
        level: 4
      };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(`${locationData.address}`, function (result, status) {

      if (status === kakao.maps.services.Status.OK) {
        console.log('성공')
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        const imageSrc = `${sheltermarker}`
        const imageSize = new kakao.maps.Size(32, 32)
        const imageOption = { offset: new kakao.maps.Point(10, 20) };
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords,
          image: markerImage
        });

        map.setCenter(coords);
      }
      else {
        console.log('위치를 찾을수가 없어요 ㅠㅗㅜ')
      }
    })


  }, [locationData])


  console.log(locationData)
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
