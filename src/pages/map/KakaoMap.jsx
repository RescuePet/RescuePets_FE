import React, { useEffect, useState, useRef } from "react";
import Marker from '../../asset/marker.png'
import { useSelector, useDispatch } from 'react-redux';
import { __GETDATA } from "../../redux/modules/getdata";
import { useLocation } from 'react-router-dom';
import { __GetMissingData } from "../../redux/modules/missingSlice";
import './Overlay.css';
const { kakao } = window;

const KakaoMap = () => {
  const dispatch = useDispatch();
  const location = useLocation();
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
    dispatch(__GetMissingData())
  }, []);
  // 유저가 직접올리는 것들 !
  const data2 = useSelector((state) => state.postMissingData.data);
  console.log("데이터 바인딩 할것들 ", data2?.data)

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

  const mapRef = useRef();

  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(lati, long),
      level: 10,
    };
    mapRef.current = new kakao.maps.Map(container, options);
    // }, [location]);
    const imageSrc = `${Marker}` // 마커이미지의 주소입니다    
    const imageSize = new kakao.maps.Size(24, 34) // 마커이미지의 크기입니다
    const imageOption = { offset: new kakao.maps.Point(10, 20) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

    // useEffect(() => {
    const overlayInfos = data?.map(info => {
      // console.log(info)
      return {
        type: info.type,
        title: info.title,
        kind: info.kind,
        lat: info.lat,
        lng: info.lng,
        img: info.img,
        desc: info.desc
      };
    });
    overlayInfos.forEach(el => {
      let marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: new kakao.maps.LatLng(el.lat, el.lng),
        image: markerImage // 마커이미지 설정 
      });

      let position = new kakao.maps.LatLng(el.lat, el.lng);


      // content HTMLElement 생성
      const content = document.createElement('div');
      content.classList.add('contentDiv');

      const contentImgArea = document.createElement('img');
      contentImgArea.classList.add("contentImgArea");
      contentImgArea.src = `${el.img}`;
      content.appendChild(contentImgArea);

      const contentTextArea = document.createElement('div');
      contentTextArea.classList.add("contentTextArea");
      content.appendChild(contentTextArea);

      const contentTextTitle = document.createElement('h2');
      contentTextTitle.classList.add('contentTextTitle');
      contentTextTitle.innerText = `${el.title}`;
      contentTextArea.appendChild(contentTextTitle)
      // 

      const contentTextdesc = document.createElement('div');
      contentTextdesc.classList.add('contentTextDesc');
      contentTextdesc.innerText = `${el.desc}`;
      contentTextArea.appendChild(contentTextdesc)

      const contentTextBtnBox = document.createElement('div');
      contentTextBtnBox.classList.add('contentTextBtnBox')
      contentTextArea.appendChild(contentTextBtnBox)

      const contentTextDetailBtn = document.createElement('button');
      contentTextDetailBtn.classList.add('contentTextDetailBtn');
      contentTextDetailBtn.appendChild(document.createTextNode('상세'));
      contentTextBtnBox.appendChild(contentTextDetailBtn)


      const closeBtn = document.createElement('button');
      closeBtn.classList.add("contentTextDeleteBtn")
      closeBtn.appendChild(document.createTextNode('X'));
      contentTextBtnBox.appendChild(closeBtn)

      let customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content,
        position: marker.getPosition()
      });
      // 닫기 이벤트 추가
      closeBtn.onclick = function () {
        customOverlay.setMap(null);
      };


      kakao.maps.event.addListener(marker, 'click', function () {
        customOverlay.setMap(mapRef.current);
      });

    });
    // 의존성배열에 현재주소를 가지고오면 
  }, [onSucces]);

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
