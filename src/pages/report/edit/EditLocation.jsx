import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Spinner } from "../../../components/Spinner";
import styled from "styled-components";
import Marker from "../../../asset/marker/marker.png";
import questionmark from "../../../asset/questionmark.svg";
import { Border_1_color } from "../../../style/Mixin";

const EditLocation = ({ data }) => {
  console.log(data);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { kakao } = window;

  const [long, setLong] = useState("");
  const [lati, setLati] = useState("");
  // 위치가져오는데 실패시 보여줄 좌표
  const defaultValue = {
    lat: "37.515133",
    lng: "126.934086",
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSucces, onFailure);
    // 성공
    // 여기는 렌더링이 초기에 한번만 일어나게 해야만한다
    function onSucces(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setIsLoading(false);
      setLong(lng);
      setLati(lat);
    }
    // 실패
    function onFailure() {
      setLong(defaultValue.lng);
      setLati(defaultValue.lat);
      setIsLoading(false);
      console.log("위치 정보를 찾을수 없습니다.");
      // alert("위치 정보를 찾을수 없습니다.");
    }
  }, []);

  useEffect(() => {
    const mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(lati, long),
        level: 5,
      };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    const imageSrc = `${Marker}`;
    const imageSize = new kakao.maps.Size(24, 24);
    const imageOption = { offset: new kakao.maps.Point(10, 20) };
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    const marker = new kakao.maps.Marker({
      position: map.getCenter(),
      image: markerImage,
    });
    marker.setMap(map);
    let geocoder = new kakao.maps.services.Geocoder();
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);
          const currentAddress = result[0]?.address?.address_name;
          const addressDiv = document.getElementById("address");
          addressDiv.innerHTML = currentAddress;
          const addressLatDiv = document.getElementById("addressLat");
          addressLatDiv.innerHTML = mouseEvent.latLng.Ma;
          const addressLngDiv = document.getElementById("addressLng");
          addressLngDiv.innerHTML = mouseEvent.latLng.La;
        }
      });
    });
    const searchDetailAddrFromCoords = (coords, callback) => {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    };
  }, [long]);

  return (
    <ReportKakaoMapContainer>
      {isLoading === true ? <Spinner /> : null}
      <ReportKakaoMapBoxTitle>
        <ReportKakaomapTitleInfoBox>
          {data.postType === "MISSING" ? <p>실종위치 </p> : <p>목격위치</p>}
          <img id="img" src={questionmark} />
          <div className="tooltip">
            지도를 클릭하여 위치를 마커로 표시해주세요
          </div>
        </ReportKakaomapTitleInfoBox>
        <ReportKakaomapTitleValueBox>
          {/* <p>위치</p> */}
          <div id="address">{data.happenPlace}</div>
          <div style={{ display: "none" }}>
            <label id="addressLat"></label>
          </div>
          <div style={{ display: "none" }}>
            <label id="addressLng"></label>
          </div>
        </ReportKakaomapTitleValueBox>
      </ReportKakaoMapBoxTitle>
      <ReportKakaoMapBoxMap id="map"></ReportKakaoMapBoxMap>
    </ReportKakaoMapContainer>
  );
};

export default EditLocation;

const ReportKakaoMapContainer = styled.div`
  position: relative;
  width: 20.9375rem;
  height: 18.75rem;
  margin: 0 auto;
  ${(props) => props.theme.FlexColumn}
  gap: 10px 0;
`;
const ReportKakaoMapBoxTitle = styled.div`
  width: 100%;
  height: 6.25rem;
`;
const ReportKakaomapTitleInfoBox = styled.div`
  position: relative;
  width: 100%;
  height: 1.5rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  > p {
    width: 15%;
    height: 100%;
    position: relative;
    text-align: left;
    ${(props) => props.theme.Body_400_14}
    color: #222222;
    word-break: keep-all;
  }
  > img {
    position: absolute;
    width: 10%;
    height: 100%;
    left: 2.8125rem;
    bottom: 0.1563rem;
  }
  > div {
    position: relative;
    ${(props) => props.theme.FlexCenter}
    left: 57px;
    top: -2.5px;
    width: 14.3125rem;
    height: 1.5rem;
    background: #ffffff;
    border: 1px solid #c4c4c4;
    font-size: 12px;
    color: #8a8a8a;
    border-radius: 0.4em;
    &::after {
      content: "";
      position: absolute;
      top: 5%;
      left: -10px;
      margin-left: -10px;
      border-width: 10px;
      border-style: solid;
      border-color: transparent #c4c4c4 transparent transparent;
    }
  }
`;
const ReportKakaomapTitleValueBox = styled.div`
  width: 100%;
  height: 70%;
  font-size: 12px;
  ${(props) => props.theme.Flex}
  padding-top: 10px;
  > p {
    width: 100%;
    height: 30%;
    color: ${(props) => props.theme.color.gary};
  }
  > div {
    width: 100%;
    height: 1.8125rem;
    ${Border_1_color}
    /* border-bottom: 1px solid ${(props) =>
      props.theme.color.text_alternative}; */
        display: flex;
    align-items: center;
  }
`;
const ReportKakaoMapBoxMap = styled.div`
  z-index: 10;
  width: 100%;
  height: 10rem;
  ${(props) => props.theme.FlexCenter}
`;
