import React, { useEffect } from "react";
import styled from "styled-components";
import sheltermarker from "../../../asset/marker/sheltermarker.png";
import catchmarker from "../../../asset/marker/marker.png";
import { ContentTextStyle } from "../../../style/Mixin";
import { Body_400_14, BorderRadius } from "../../../style/theme";
import {
  ContentOptionTextStyle,
  FlexAttribute,
  PostBorderStyle,
} from "../../../style/Mixin";
import { useState } from "react";

const Location = ({ locationData }) => {
  const [mapState, SetMapState] = useState(true);
  const { kakao } = window;
  useEffect(() => {
    const mapContainer = document.getElementById(`${locationData.map}`),
      mapOption = {
        center: new kakao.maps.LatLng(37, 127),
        level: 6,
        draggable: false,
      };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(
      `${locationData.address}`,
      function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          const imageSrc = `${
            locationData.type === "구조정보" ? catchmarker : sheltermarker
          }`;
          const imageSize = new kakao.maps.Size(32, 32);
          const imageOption = { offset: new kakao.maps.Point(10, 20) };
          const markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );
          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
            image: markerImage,
          });
          map.setCenter(coords);
          SetMapState(true);
        } else {
          SetMapState(false);
        }
      }
    );
  }, []);

  return (
    <LocationContainer>
      <LocationWrapper>
        <SemiText className="locationtitle">{locationData.type}</SemiText>
        <ContentTextWrapper>
          <ContentText>
            {locationData.careNm == null
              ? locationData.address
              : locationData.careNm}
          </ContentText>
          <ContentTextBox>
            {locationData.careTel == null ? null : (
              <>
                <ContentOptionText>TEL | </ContentOptionText>
                &nbsp;<ContentText>{locationData.careTel}</ContentText>
              </>
            )}
          </ContentTextBox>
        </ContentTextWrapper>
      </LocationWrapper>
      {mapState ? <MapDiv id={`${locationData.map}`}></MapDiv> : <div></div>}
    </LocationContainer>
  );
};

const SemiText = styled.span`
  ${Body_400_14}
`;

const LocationContainer = styled.div`
  ${FlexAttribute("column", "", "center")}
  ${PostBorderStyle}
  margin-bottom: 20px;
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
  span:first-child {
    margin-bottom: 0.5rem;
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
  width: 20.9375rem;
  height: 7rem;
  ${BorderRadius}
  background-color: #666666;
`;

export default Location;
