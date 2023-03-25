import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Marker from "../../../asset/marker/marker.png"
import questionmark from "../../../asset/questionmark.svg"

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
        // 실패
        function onFailure() {
            alert("위치 정보를 찾을수 없습니다.");
        }
    }, [])

    useEffect(() => {
        const mapContainer = document.getElementById('map'),
            mapOption = {
                center: new kakao.maps.LatLng(lati, long),
                level: 5
            };

        const map = new kakao.maps.Map(mapContainer, mapOption);

        const imageSrc = `${Marker}`
        const imageSize = new kakao.maps.Size(24, 24)
        const imageOption = { offset: new kakao.maps.Point(10, 20) };

        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

        const marker = new kakao.maps.Marker({
            position: map.getCenter(),
            image: markerImage
        });

        marker.setMap(map);

        let geocoder = new kakao.maps.services.Geocoder();
        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
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

                <ReportKakaomapTitleInfoBox>
                    <p>실종위치 <span>*</span></p>
                    <img id="img"
                        src={questionmark} />
                    <div className="tooltip">지도상에서 마커를 움직여 위치를 표현해주세요</div>
                </ReportKakaomapTitleInfoBox>

                <ReportKakaomapTitleValueBox>
                    <div><label id='address'></label></div>
                    <div style={{ display: "none" }}><label id='addressLat'></label></div>
                    <div style={{ display: "none" }}><label id='addressLng'></label></div>
                </ReportKakaomapTitleValueBox>

            </ReportKakaoMapBoxTitle>
            <ReportKakaoMapBoxMap id='map'></ReportKakaoMapBoxMap>
        </ReportKakaoMapContainer>
    );
};

export default Location;

const ReportKakaoMapContainer = styled.div`
  position: relative;
  width: 20.9375rem;
  height: 18.75rem;
  margin: 0 auto;
  ${props => props.theme.FlexColumn}
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
    ${props => props.theme.Body_400_14}
    color: #222222;
        > span {
        position: absolute;
        top: 2.5px;
      }
    }
    > img {
        position: absolute;
        width: 10%;
        height: 100%;
        left: 50px;
        bottom: 2.5px;
       
    }
    > div {
        position: relative;
        ${props => props.theme.FlexCenter}
        left: 57px;
        top: -2.5px;
        width: 14.3125rem;
        height: 1.5rem;
        background: #FFFFFF;
        border: 1px solid #C4C4C4;
        font-size: 12px;
        color: #8A8A8A;
	    border-radius: .4em;
        &::after {
            content: '';
            position: absolute;
            top: 5%;
            left:-10px;
            margin-left: -10px;
            border-width: 10px;
            border-style: solid;
            border-color: transparent #C4C4C4 transparent transparent;
        }     
    }

`;

const ReportKakaomapTitleValueBox = styled.div`
    width: 100%;
    height: 70%;
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
`;

const ReportKakaoMapBoxMap = styled.div`
    z-index: 15;
    width: 100%;
    height: 10rem;
    ${props => props.theme.FlexCenter}
`