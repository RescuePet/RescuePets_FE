import React, { useEffect, useState, useRef } from "react";
import { FloatingPetwork } from "./components/FloatingPetwork";
import missingmarker from "../../asset/marker/missingmarker.png";
import catchmarker from "../../asset/marker/catchmarker.png";
import Mymarker from "../../asset/marker/mymarker.png";
import { useSelector, useDispatch } from "react-redux";
import { __GetMissingData } from "../../redux/modules/missingSlice";
import { __GetCatchData } from "../../redux/modules/catchSlice";
import { useModalState } from "../../hooks/useModalState";
import { MarkerModal } from "./components/Modal";
import { Spinner } from "../../components/Spinner";
const { kakao } = window;

const KakaoMap = () => {
  const dispatch = useDispatch();
  const [newCatchData, setNewCatchData] = useState("");
  const [loginModal, toggleModal] = useModalState(false);
  const [isLoading, setIsLoading]= useState(true);


  const menutoggle = useSelector((state) => {
    return state.menubar.toggle;
  });

  const [mapBg, setMapBg] = useState(menutoggle);

  useEffect(() => {
    setMapBg(menutoggle);
  }, [menutoggle]);

  //디비에 저장된 데이터 값 가져오기
  useEffect(() => {
    dispatch(__GetMissingData());
    dispatch(__GetCatchData());
  }, []);

  // 현재위치를 가지고오는 로직
  const [long, setLong] = useState("");
  const [lati, setLati] = useState("");

  navigator.geolocation.getCurrentPosition(onSucces, onFailure);
  // console.log(onSucces)
  function onSucces(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    setIsLoading(false)
    setLong(lng);
    setLati(lat);
  }

  const defaultValue = {
    lat: "37.515133",
    lng: "126.934086",
  };

  function onFailure() {
    setLong(defaultValue.lng);
    setLati(defaultValue.lat);
    setIsLoading(false)
    console.log("위치 정보를 찾을수 없습니당.");
  }

  const mapRef = useRef();

  const missingData = useSelector((state) => state.MissingData?.data);
  // console.log("실종데이터 ", missingData)
  useEffect(() => {
    // console.log("실종데이터 ", missingData?.data)
    // if (JSON.stringify(missingData) === undefined) {
    //   return <div>Loading...</div>;
    // }
  }, [missingData]);

  // console.log("실종데이터 ", missingData?.data)
  const catchData = useSelector((state) => state.catchData?.data);

  useEffect(() => {
    // console.log("목격데이터", catchData?.data)
    // if (JSON.stringify(catchData) === undefined) {
    //   return <div>Loading...</div>;
    // }
  }, [catchData]);

  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      // 처음 들어갈 현재 위치 기준으로 지도 생성
      center: new kakao.maps.LatLng(lati, long),
      level: 12,
    };
    mapRef.current = new kakao.maps.Map(container, options);

    // 현재위치에 마커 생성 로직
    const MyimageSrc = `${Mymarker}`;
    const MyimageSize = new kakao.maps.Size(36, 36);
    const MyimageOption = { offset: new kakao.maps.Point(10, 20) };

    let MymarkerImage = new kakao.maps.MarkerImage(
      MyimageSrc,
      MyimageSize,
      MyimageOption
    );
    const MymarkerPosition = new kakao.maps.LatLng(lati, long);

    let marker = new kakao.maps.Marker({
      position: MymarkerPosition,
      image: MymarkerImage,
    });

    marker.setMap(mapRef.current);
  }, [long]);


  useEffect(() => {
    // 목격글 마커
    // missingmarker 보라색
    // catchmarker   분홍색 
    // 실종 Missing 분홍색 상세가면 
    const missingimageSrc = `${missingmarker}`;
    const missingimageSize = new kakao.maps.Size(16, 20);
    const missingimageOption = { offset: new kakao.maps.Point(10, 20) };

    let missingmarkerImage = new kakao.maps.MarkerImage(
      missingimageSrc,
      missingimageSize,
      missingimageOption
    );

    // 실종글 작성 마커 인포 생성 로직
    missingData?.data?.map((item) => {
      // console.log(item)
      let marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: new kakao.maps.LatLng(
          item.happenLatitude,
          item.happenLongitude
        ),
        image: missingmarkerImage,
      });
      kakao.maps.event.addListener(marker, "click", function () {
        // console.log(item)
        toggleModal();
        // 현재 내위치랑 클릭한 마커에 위치를 가져오는 로직 거리도 구해야만한다
        const linePath = [
          new kakao.maps.LatLng(lati, long),
          new kakao.maps.LatLng(item.happenLatitude, item.happenLongitude),
        ];

        const polyline = new kakao.maps.Polyline({
          path: linePath, // 선을 구성하는 좌표배열 입니다
          strokeWeight: 0, // 선의 두께 입니다
          strokeColor: "#FFAE00", // 선의 색깔입니다
          strokeOpacity: 0, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        });

        // // 선의 총 거리를 계산합니다 이값을 item이라는 객체안에 넣어애만한다
        const distance = Math.round(polyline.getLength());
        const data = { km: distance, name: "missingdetail" };

        const newItem = {
          ...data,
          ...item,
        };

        setNewCatchData(newItem);
        polyline.setMap(mapRef.current);
      });
    });

    // 목격글 마커
    const catchimageSrc = `${catchmarker}`;
    const catchimageSize = new kakao.maps.Size(16, 20);
    const catchimageOption = { offset: new kakao.maps.Point(10, 20) };

    let catchmarkerImage = new kakao.maps.MarkerImage(
      catchimageSrc,
      catchimageSize,
      catchimageOption
    );

    // 목격글 작성 마커 인포 생성 로직
    catchData?.data?.map((item) => {
      // console.log(item)
      let marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: new kakao.maps.LatLng(
          item.happenLatitude,
          item.happenLongitude
        ),
        image: catchmarkerImage,
        name: item.id,
      });

      kakao.maps.event.addListener(marker, "click", function () {

        toggleModal();
        // 현재 내위치랑 클릭한 마커에 위치를 가져오는 로직 거리도 구해야만한다
        const linePath = [
          new kakao.maps.LatLng(lati, long),
          new kakao.maps.LatLng(item.happenLatitude, item.happenLongitude),
        ];

        const polyline = new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 0,
          strokeColor: "#FFAE00",
          strokeOpacity: 0,
        });

        const distance = Math.round(polyline.getLength());

        const data = { km: distance, name: "sightingdetail" };

        const newItem = {
          ...data,
          ...item,
        };
        setNewCatchData(newItem);
        polyline.setMap(mapRef.current);
      });
    });
  }, [onSucces]);

  // 실패시 작동 로직

  useEffect(() => {
    // console.log("좌표못가지고옴");
    // 목격글 마커
    const missingimageSrc = `${missingmarker}`;
    const missingimageSize = new kakao.maps.Size(16, 20);
    const missingimageOption = { offset: new kakao.maps.Point(10, 20) };

    let missingmarkerImage = new kakao.maps.MarkerImage(
      missingimageSrc,
      missingimageSize,
      missingimageOption
    );

    // 실종글 작성 마커 인포 생성 로직
    missingData?.data?.map((item) => {

      let marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: new kakao.maps.LatLng(
          item.happenLatitude,
          item.happenLongitude
        ),
        image: missingmarkerImage,
      });
      kakao.maps.event.addListener(marker, "click", function () {

        toggleModal();

        const linePath = [
          new kakao.maps.LatLng(lati, long),
          new kakao.maps.LatLng(item.happenLatitude, item.happenLongitude),
        ];

        const polyline = new kakao.maps.Polyline({
          path: linePath, // 선을 구성하는 좌표배열 입니다
          strokeWeight: 0, // 선의 두께 입니다
          strokeColor: "#FFAE00", // 선의 색깔입니다
          strokeOpacity: 0, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        });


        const distance = Math.round(polyline.getLength());
        const data = { km: distance, name: "missingdetail" };

        const newItem = {
          ...data,
          ...item,
        };
        setNewCatchData(newItem);
        polyline.setMap(mapRef.current);

      });
    });

    // 목격글 마커
    const catchimageSrc = `${catchmarker}`;
    const catchimageSize = new kakao.maps.Size(16, 20);
    const catchimageOption = { offset: new kakao.maps.Point(10, 20) };

    let catchmarkerImage = new kakao.maps.MarkerImage(
      catchimageSrc,
      catchimageSize,
      catchimageOption
    );

    // 목격글 작성 마커 인포 생성 로직
    catchData?.data?.map((item) => {

      let marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: new kakao.maps.LatLng(
          item.happenLatitude,
          item.happenLongitude
        ),
        image: catchmarkerImage,
        name: item.id,
      });

      kakao.maps.event.addListener(marker, "click", function () {
        toggleModal();
  
        const linePath = [
          new kakao.maps.LatLng(lati, long),
          new kakao.maps.LatLng(item.happenLatitude, item.happenLongitude),
        ];

        const polyline = new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 0,
          strokeColor: "#FFAE00",
          strokeOpacity: 0,
        });
        const distance = Math.round(polyline.getLength());
        const data = { km: distance, name: "sightingdetail" };

        const newItem = {
          ...data,
          ...item,
        };
        setNewCatchData(newItem);
        polyline.setMap(mapRef.current);
      });
    });
  }, [onFailure]);
  // console.log("값지워야함",newCatchData)
  return (
    isLoading === true ? (
      <div
      id="myMap"
      style={{ width: "100%", height: "90vh", position: "relative" }}>
        <Spinner/>
      <FloatingPetwork />
    </div>
    ) 
    : 
    (
      <div
      id="myMap"
      style={{ width: "100%", height: "90vh", position: "relative" }}>
      <MarkerModal
        isOpen={loginModal}
        toggle={toggleModal}
        onClose={toggleModal}
        data={newCatchData}
      ></MarkerModal>
      <FloatingPetwork />
    </div>
    )
  )};

export default KakaoMap;
