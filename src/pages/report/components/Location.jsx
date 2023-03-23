import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Marker from "../../../asset/marker.png"

const Location = () => {
    const { kakao } = window;
    // 현재위치를 받아오는 로직
    const [long, setLong] = useState("");
    const [lati, setLati] = useState("");

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(onSucces, onFailure);
        // 성공
        // 여기는 렌더링이 초기에 한번만 일어나게 해야만한다 
        function onSucces(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setLong(lng);
            setLati(lat);
        }
        console.log(onSucces)
        // 실패
        function onFailure() {
            alert("위치 정보를 찾을수 없습니다.");
        }
    }, [])
    useEffect(() => {
        const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                // 처음 마커 표시는 되는 곳 현재 나의 위치 
                center: new kakao.maps.LatLng(lati, long), // 지도의 중심좌표
                level: 5 // 지도의 확대 레벨
            };

        const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        const imageSrc = `${Marker}` // 마커이미지의 주소입니다    
        const imageSize = new kakao.maps.Size(16, 20) // 마커이미지의 크기입니다
        const imageOption = { offset: new kakao.maps.Point(10, 20) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
        // 지도를 클릭한 위치에 표출할 마커입니다
        const marker = new kakao.maps.Marker({
            // 지도 중심좌표에 마커를 생성합니다 
            position: map.getCenter(),
            image: markerImage // 마커이미지 설정 
        });
        // 지도에 마커를 표시합니다
        marker.setMap(map);

        let geocoder = new kakao.maps.services.Geocoder();
        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
                console.log(mouseEvent.latLng)
                if (status === kakao.maps.services.Status.OK) {
                    marker.setPosition(mouseEvent.latLng);
                    marker.setMap(map);
                    const currentAddress = result[0]?.address?.address_name
                    const addressDiv = document.getElementById('address');
                    addressDiv.innerHTML = currentAddress;
                    const addressLatDiv = document.getElementById('addressLat')
                    addressLatDiv.innerHTML = mouseEvent.latLng.Ma
                    const addressLngDiv = document.getElementById('addressLng')
                    addressLngDiv.innerHTML = mouseEvent.latLng.La
                }
            });
        });

        const searchDetailAddrFromCoords = (coords, callback) => {
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

    }, [long])

    return (
        <ReportKakaoMapContainer>
            <ReportKakaoMapBoxTitle>
                <p>실종위치 *</p>
                <div>
                    <div><label id='address'></label></div>
                    <div style={{ display: "none" }}><label id='addressLat'></label></div>
                    <div style={{ display: "none" }}><label id='addressLng'></label></div>
                </div>
            </ReportKakaoMapBoxTitle>
            <ReportKakaoMapBoxMap id='map'></ReportKakaoMapBoxMap>
        </ReportKakaoMapContainer>
    );
};

export default Location;

const ReportKakaoMapContainer = styled.div`
  position: relative;
  width: 20.9375rem;
  height: 14.875rem;
  margin: 0 auto;
  ${props => props.theme.FlexColumn}
  gap: 10px 0;
  /* border: 1px solid red; */
  `;

const ReportKakaoMapBoxTitle = styled.div`
width: 100%;
height: 20%;
> p {
    width: 100%;
    height: 20%;
    ${props => props.theme.Body_400_14}
    color: #222222;
}
> div {
    width: 100%;
    height: 80%;
    padding-top: 20px;
    font-size: 12px;
    ${props => props.theme.FlexRow}
    > div {
        width: 100%;
        height: 100%;
        border-bottom: 2px solid #EEEEEE;
        > label {
            width: 9.75rem;
            border-bottom: 2px solid #EEEEEE;
        }
    }
}
`;

const ReportKakaoMapBoxMap = styled.div`
    z-index: 15;
    width: 100%;
    height: 80%;
    ${props => props.theme.FlexCenter}
`