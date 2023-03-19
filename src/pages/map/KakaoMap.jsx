import React, { useEffect, useState, useRef } from "react";
import Marker from '../../asset/marker.png'
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { __GETDATA } from "../../redux/modules/getdata";
import './Overlay.css';
const { kakao } = window;

const KakaoMap = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // 메뉴바 로직 리덕스에 저장된 값 가져오기 
  const menutoggle = useSelector((state) => {
    return state.menubar.toggle;
  })
  const [mapBg, setMapBg] = useState(menutoggle);
  useEffect(() => {
    setMapBg(menutoggle)
  }, [menutoggle])
  //디비에 저장된 데이터 값 가져오기 
  useEffect(() => {
    dispatch(__GETDATA())
  }, []);
  // 유저가 직접올리는 것들 !

  const data = useSelector((state) => state.getData.data);
  const [long, setLong] = useState("");
  const [lati, setLati] = useState("");
  navigator.geolocation.getCurrentPosition(onSucces, onFailure);
  function onSucces(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    setLong(lng);
    setLati(lat);
  }
  function onFailure() {
    alert("위치 정보를 찾을수 없습니다.");
  }


  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(lati, long),
      level: 10,
    };
    mapRef.current = new kakao.maps.Map(container, options);
  }, [location]);

  const mapRef = useRef();

  useEffect(() => {
    const overlayInfos = data?.map(info => {
      console.log(info)
      return {
        title: info.title,
        lat: info.lat,
        lng: info.lng,
        img: info.img,
      };
    });

    overlayInfos.forEach(el => {
      console.log(el)
      let marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: new kakao.maps.LatLng(el.lat, el.lng),
        title: el.title,
      });

      let content =
        '<div class="overlayWrap">' +
        `    <img class="overlayImg" src=${el.img} alt="img"/>` +
        '    <div class="accommInfoWrap">' +
        `        <h1 class="accommName">${el.title}</h1>` +
        '    </div>' +
        '</div>';

      let position = new kakao.maps.LatLng(el.lat, el.lng);

      let customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content,
      });

      kakao.maps.event.addListener(marker, 'mouseover', function () {
        customOverlay.setMap(mapRef.current);
      });
      // mouseover

      // mouseout
      kakao.maps.event.addListener(marker, 'mouseout', function () {
        setTimeout(function () {
          customOverlay.setMap();
        });
      });


    });
  }, [data]);

  return (
    <>
      {
        mapBg === false ? (
          <div id="myMap" style={{ width: "100%", height: "90vh", filter: "brightness(20%)" }}></div>
        )
          :
          (
            <div id="myMap" style={{ width: "100%", height: "90vh" }}></div>
          )
      }
    </>
  );
};

export default KakaoMap;
