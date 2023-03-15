import React, { useEffect, useState } from "react";
import Marker from '../asset/Marker.svg'
import { useSelector } from 'react-redux';

const KakaoMap = () => {

  const data = useSelector((state) => {
    return state.menubar.toggle;
  })

  const [mapBg, setMapBg] = useState(data);

  useEffect(() => {
    setMapBg(data)
  }, [data])


  const { kakao } = window;

  useEffect(() => {
    mapscript()
  }, [])

  const mapscript = () => {

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.450701, 126.570667), // 지도의 중심좌표
        level: 10 // 지도의 확대 레벨 
      };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        const locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div class="isgood">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
      });

    }
    else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      const locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = 'geolocation을 사용할수 없어요..'
      // 마커와 인포윈도우를 표시합니다
      displayMarker(locPosition, message);
    }

    // 커스텀오버레이 
    const imageSrc = `${Marker}` // 마커이미지의 주소입니다    
    const imageSize = new kakao.maps.Size(64, 69) // 마커이미지의 크기입니다
    const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
    const markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다


    // 마커를 생성합니다
    var marker2 = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage // 마커이미지 설정 
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker2.setMap(map);

    // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    var content = '<div class="customoverlay">' +
      '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
      '    <span class="title">구의야구공원</span>' +
      '  </a>' +
      '</div>';

    // 커스텀 오버레이가 표시될 위치입니다 
    var position = new kakao.maps.LatLng(37.54699, 127.09598);

    // 커스텀 오버레이를 생성합니다
    var customOverlay = new kakao.maps.CustomOverlay({
      map: map,
      position: position,
      content: content,
      yAnchor: 1
    });

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다! 
    function displayMarker(locPosition, message) {

      // 현재 위치마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: map,
        position: locPosition
      });

      const iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 현재위치 인포윈도우를 생성합니다
      const infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable
      });

      // 현재 인포윈도우를 마커위에 표시합니다 
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }
  };

  return (
    <>
      {
        mapBg === false ? (
          <div id="map" style={{ width: "100%", height: "90vh", filter: "brightness(20%)" }}></div>
        )
          :
          (
            <div id="map" style={{ width: "100%", height: "90vh" }}></div>
          )
      }
    </>
  );
}


export default KakaoMap;
