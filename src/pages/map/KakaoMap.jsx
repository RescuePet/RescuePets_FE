import React, { useEffect, useState, useRef } from "react";
import Marker from '../../asset/marker.png'
import { useSelector, useDispatch } from 'react-redux';
import { __GETDATA } from "../../redux/modules/getdata";
import { useLocation } from 'react-router-dom';
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

  const mapRef = useRef();
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(lati, long),
      level: 10,
    };
    mapRef.current = new kakao.maps.Map(container, options);
  }, [location]);

  // 
  useEffect(() => {
    const overlayInfos = data?.map(info => {
      console.log(info)
      return {
        title: info.title,
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
        title: el.title,
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

      // let content =
      //   `<div class="overlayWrap">` +
      //   `    <img class="overlayImg" src=${el.img} alt="img"/>` +
      //   '    <div class="accommInfoWrap">' +
      //   `        <h1 class="accommName">${el.title}</h1>` +
      //   `<div class="close" id=${el.id} onclick="closeOverlay()" title="닫기">X</div>` +
      //   '    </div>' +
      //   '</div>';



      // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다

      kakao.maps.event.addListener(marker, 'click', function () {
        customOverlay.setMap(mapRef.current);
      });
      // 인포 닫는 로직 구현해야만한다 1 


      // kakao.maps.event.addListener(marker, 'mouseover', function () {
      //   customOverlay.setMap(mapRef.current);
      // });

      // kakao.maps.event.addListener(marker, 'mouseout', function () {
      //   setTimeout(function () {
      //     customOverlay.setMap();
      //   });
      // });
      // 

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
