import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { FloatingPetwork } from "./components/FloatingPetwork";
import missingmarker from '../../asset/marker/missingmarker.png'
import catchmarker from '../../asset/marker/catchmarker.png'
import Mymarker from "../../asset/marker/mymarker.png"
import { useSelector, useDispatch } from 'react-redux';
import { __GetMissingData } from "../../redux/modules/missingSlice";
import { __GetCatchData } from "../../redux/modules/catchSlice";
import { useModalState } from "../../hooks/useModalState";
import { MarkerModal } from "./components/Modal"
import './Overlay.css';
const { kakao } = window;

const KakaoMap = () => {
  const dispatch = useDispatch();
  const [newCatchData, setNewCatchData] = useState('');
  const [loginModal, toggleModal] = useModalState(false);

  const menutoggle = useSelector((state) => {
    return state.menubar.toggle;
  })

  const [mapBg, setMapBg] = useState(menutoggle);

  useEffect(() => {
    setMapBg(menutoggle)
  }, [menutoggle])
  //디비에 저장된 데이터 값 가져오기 
  useEffect(() => {
    dispatch(__GetMissingData())
    dispatch(__GetCatchData())
  }, []);
  // 유저가 직접올리는 것들 !
  const missingData = useSelector((state) => state.MissingData?.data);
  // console.log("실종데이터 ", missingData?.data)
  const catchData = useSelector((state) => state.catchData?.data);
  // console.log("목격데이터", catchData?.data)

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
      // 처음 들어갈 현재 위치 기준으로 지도 생성 
      center: new kakao.maps.LatLng(lati, long),
      level: 12,
    };
    mapRef.current = new kakao.maps.Map(container, options);

    // 현재위치에 마커 생성 로직 
    const MyimageSrc = `${Mymarker}`
    const MyimageSize = new kakao.maps.Size(36, 36)
    const MyimageOption = { offset: new kakao.maps.Point(10, 20) };

    let MymarkerImage = new kakao.maps.MarkerImage(MyimageSrc, MyimageSize, MyimageOption)
    const MymarkerPosition = new kakao.maps.LatLng(lati, long);

    let marker = new kakao.maps.Marker({
      position: MymarkerPosition,
      image: MymarkerImage // 마커이미지 설정 
    });

    marker.setMap(mapRef.current);




    // 목격글 마커 
    const missingimageSrc = `${missingmarker}`
    const missingimageSize = new kakao.maps.Size(16, 20)
    const missingimageOption = { offset: new kakao.maps.Point(10, 20) };

    let missingmarkerImage = new kakao.maps.MarkerImage(missingimageSrc, missingimageSize, missingimageOption)

    // 실종글 작성 마커 인포 생성 로직 
    missingData?.data?.map((item) => {
      let marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: new kakao.maps.LatLng(item.happenLatitude, item.happenLongitude),
        image: missingmarkerImage
      })
      let position = new kakao.maps.LatLng(item.happenLatitude, item.happenLongitude);
      // 인포 인포박스 생성 로직 
      const content = document.createElement('div');
      content.classList.add('contentDiv');

      const contentImgArea = document.createElement('img');
      contentImgArea.classList.add("contentImgArea");
      contentImgArea.src = `${item.postImages[0].imageURL}`;
      content.appendChild(contentImgArea);

      const contentTextArea = document.createElement('div');
      contentTextArea.classList.add("contentTextArea");
      content.appendChild(contentTextArea);

      const contentTextTitle = document.createElement('h2');
      contentTextTitle.classList.add('contentTextTitle');
      contentTextTitle.innerText = `${item.specialMark}`;
      contentTextArea.appendChild(contentTextTitle)

      const contentTextdesc = document.createElement('div');
      contentTextdesc.classList.add('contentTextDesc');
      contentTextdesc.innerText = `${item.kindCd}`;
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




      // 목격글 마커 
      const catchimageSrc = `${catchmarker}`
      const catchimageSize = new kakao.maps.Size(16, 20)
      const catchimageOption = { offset: new kakao.maps.Point(10, 20) };

      let catchmarkerImage = new kakao.maps.MarkerImage(catchimageSrc, catchimageSize, catchimageOption)

      // 목격글 작성 마커 인포 생성 로직 
      catchData?.data?.map((item) => {
        // console.log(item)
        let marker = new kakao.maps.Marker({
          map: mapRef.current,
          position: new kakao.maps.LatLng(item.happenLatitude, item.happenLongitude),
          image: catchmarkerImage,
          name: item.id
        })


        // let linePath2;
        // let lineLine = new kakao.maps.Polyline();
        // let distance;


        // const linePath = [
        //   new kakao.maps.LatLng(lati, long),
        //   new kakao.maps.LatLng(item.happenLatitude, item.happenLongitude)
        // ]



        // const polyline = new kakao.maps.Polyline({
        //   path: linePath, // 선을 구성하는 좌표배열 입니다
        //   strokeWeight: 3, // 선의 두께 입니다
        //   strokeColor: 'Red', // 선의 색깔입니다
        //   strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        //   strokeStyle: 'solid' // 선의 스타일입니다
        // });


        // polyline.setMap(mapRef.current);



        kakao.maps.event.addListener(marker, 'click', function () {
          // console.log(mapRef.current)
          console.log(item)
          toggleModal()
          setNewCatchData(item)

          // 현재 내위치랑 클릭한 마커에 위치를 가져오는 로직 거리도 구해야만한다 
          const linePath = [
            new kakao.maps.LatLng(lati, long),
            new kakao.maps.LatLng(item.happenLatitude, item.happenLongitude)
          ]

          const polyline = new kakao.maps.Polyline({
            path: linePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 10, // 선의 두께 입니다
            strokeColor: '#FFAE00', // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid' // 선의 스타일입니다
          });


          // const distance = Math.round(polyline.getLength())
          // distanceOverlay(linePath[0], distance)
          // console.log(dispatch)

          // 지도에 선을 표시합니다
          polyline.setMap(mapRef.current);


        });





      });

      kakao.maps.event.addListener(marker, 'click', function () {
        customOverlay.setMap(mapRef.current);
      });

    });

    // 의존성배열에 현재주소를 가지고오면 
  }, [onSucces]);


  // console.log('현재값', newCatchData)
  return (
    <>
      {
        mapBg === false ? (
          <div id="myMap" style={{ width: "100%", height: "91vh", filter: "brightness(20%)", position: "relative" }}>
          </div>
        )
          :
          (
            <div id="myMap" style={{ width: "100%", height: "91vh", position: "relative" }}>
              <MarkerModal
                isOpen={loginModal}
                toggle={toggleModal}
                onClose={toggleModal}
                data={newCatchData}>
              </MarkerModal>
              <FloatingPetwork />
            </div>
          )
      }
    </>
  );
};

export default KakaoMap;


const ThisSelecteMarker = styled.div`
    position: absolute;
    top: 527px;
    left: 0;
    z-index: 18;
    width: 18.75rem;
    height: 7rem;
    background: #FFFFFF;
    border-radius: .4em;
`;