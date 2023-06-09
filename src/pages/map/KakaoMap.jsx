import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import { FloatingPetwork } from "./components/FloatingPetwork";
import missingmarker from "../../asset/marker/missingmarker.png";
import catchmarker from "../../asset/marker/catchmarker.png";
import Mymarker from "../../asset/marker/mymarker.png";
import { useSelector, useDispatch } from "react-redux";
import { __GetMissingData } from "../../redux/modules/missingSlice";
import { useModalState } from "../../hooks/useModalState";
import { MarkerModal } from "./components/Modal";
import { Spinner } from "../../components/Spinner";
import currentLocationimg from "../../asset/currentLocation.svg";
import Meatballs from "../../asset/Meatballs";
import CryptoJS from "crypto-js";
const { kakao } = window;

const KakaoMap = () => {
  const dispatch = useDispatch();
  const [newCatchData, setNewCatchData] = useState("");
  const mapRef = useRef();
  const [NEW, setNEW] = useState(undefined);
  const [loginModal, toggleModal] = useModalState(false);
  const [isLoading, setIsLoading] = useState(false);
  // 현재위치를 가지고오는 로직
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const getlink = useSelector((state) => {
    return state.link;
  });

  const secretKey = process.env.REACT_APP_CURRENTPOS_POSITION;
  // 복화화하기
  const decryptString = (str) => {
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const iv = CryptoJS.enc.Utf8.parse(secretKey);
    const decrypted = CryptoJS.AES.decrypt(str, key, { iv });
    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  const encryptedPo = localStorage.getItem("userPosition");
  const decryptedPo = decryptString(encryptedPo);
  const userPosition = decryptedPo && JSON.parse(decryptedPo);

  useEffect(() => {
    if (userPosition !== "") {
      setLat(userPosition.lat);
      setLng(userPosition.lng);
    }
  }, []);

  //디비에 저장된 데이터 값 가져오기
  useEffect(() => {
    dispatch(__GetMissingData());
  }, []);

  const { data, loading } = useSelector((state) => state.MissingData);

  useEffect(() => {
    setNEW(data?.data);
  }, [data]);

  const missingData = [];
  const catchData = [];

  if (NEW !== undefined) {
    if (NEW.length !== undefined) {
      for (let i = 0; i < NEW.length; i++) {
        if (NEW[i].postType === "MISSING") {
          missingData.push(NEW[i]);
        } else {
          catchData.push(NEW[i]);
        }
      }
    }
  }

  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 11,
    };
    mapRef.current = new kakao.maps.Map(container, options);

    // 현재위치에 마커 생성 로직
    const MyimageSrc = `${Mymarker}`;
    const MyimageSize = new kakao.maps.Size(46, 46);
    const MyimageOption = { offset: new kakao.maps.Point(10, 20) };

    let MymarkerImage = new kakao.maps.MarkerImage(
      MyimageSrc,
      MyimageSize,
      MyimageOption
    );
    const MymarkerPosition = new kakao.maps.LatLng(lat, lng);

    let marker = new kakao.maps.Marker({
      position: MymarkerPosition,
      image: MymarkerImage,
    });

    marker.setMap(mapRef.current);
  }, [lat]);

  useEffect(() => {
    const missingimageSrc = `${missingmarker}`;
    const missingimageSize = new kakao.maps.Size(16, 20);
    const missingimageOption = { offset: new kakao.maps.Point(10, 20) };

    let missingmarkerImage = new kakao.maps.MarkerImage(
      missingimageSrc,
      missingimageSize,
      missingimageOption
    );

    // 실종글 작성 마커 인포 생성 로직
    missingData &&
      missingData.map((item) => {
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
            new kakao.maps.LatLng(lat, lng),
            new kakao.maps.LatLng(item.happenLatitude, item.happenLongitude),
          ];

          const polyline = new kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 0,
            strokeOpacity: 0,
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
    catchData &&
      catchData.map((item) => {
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
            new kakao.maps.LatLng(lat, lng),
            new kakao.maps.LatLng(item.happenLatitude, item.happenLongitude),
          ];

          const polyline = new kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 0,
            strokeColor: "#FFAE00",
            strokeOpacity: 0,
          });

          const distance = Math.round(polyline.getLength());

          const data = { km: distance, name: "catchdetail" };

        
          const newItem = {
            ...data,
            ...item,
          };
          setNewCatchData(newItem);
          polyline.setMap(mapRef.current);
        });
      });

    // console.log(getlink);
    if (getlink.linkToggle === false) {
      const linePath = [
        new kakao.maps.LatLng(
          newCatchData.happenLatitude,
          newCatchData.happenLongitude
        ),
      ];

      const polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 0,
        strokeColor: "#FFAE00",
        strokeOpacity: 0,
      });
      polyline.setMap(mapRef.current);
    } else if (getlink.linkToggle === true) {
      if (getlink.data.data?.length > 0) {
        // console.log("링크연결");
        // console.log(getlink?.data?.data);
        const linePath = [
          new kakao.maps.LatLng(
            newCatchData.happenLatitude,
            newCatchData.happenLongitude
          ),
          new kakao.maps.LatLng(
            getlink.data?.data[0]?.linkedPostLatitude,
            getlink.data?.data[0]?.linkedPostLongitude
          ),
        ];

        const polyline = new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 2,
          strokeColor: "#FFAE00",
          strokeOpacity: 1,
        });
        polyline.setMap(mapRef.current);
      } else {
        // console.log("연결된 링크 없다");
      }
    }
  }, [missingData]);

  const onClickMoveToCurrentLocation = () => {
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    mapRef.current.panTo(moveLatLon);
    mapRef.current.setLevel(5);
  };

  const [markerInfoTabToggle, setMarkerInfoTabToggle] = useState(false);

  const onClickTabToggleHandler = () => {
    setMarkerInfoTabToggle(!markerInfoTabToggle);
  };

  return isLoading === true ? (
    <MyMap id="myMap">
      <Spinner />
      <FloatingPetwork />
    </MyMap>
  ) : (
    <>
      <Header />
      <MyMap id="myMap">
        <MarkerModal
          isOpen={loginModal}
          toggle={toggleModal}
          onClose={toggleModal}
          data={newCatchData}
        ></MarkerModal>
        <FloatingPetwork />
        <CurrentLocationBtn onClick={onClickMoveToCurrentLocation}>
          <img src={currentLocationimg} />
        </CurrentLocationBtn>
        {markerInfoTabToggle === false ? null : (
          <MapTabInfo>
            <div>
              <img src={missingmarker} />
              <p>실종</p>
            </div>
            <div>
              <img src={catchmarker} />
              <p>목격</p>
            </div>
          </MapTabInfo>
        )}

        <MapTabBtn>
          <CommentMeatBalls onClick={onClickTabToggleHandler} />
        </MapTabBtn>
      </MyMap>
    </>
  );
};

export default KakaoMap;

const MyMap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CurrentLocationBtn = styled.aside`
  position: absolute;
  z-index: 7;
  right: 1.25rem;
  top: 3.125rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: ${(props) => props.theme.color.white};
  ${(props) => props.theme.FlexCenter};
  cursor: pointer;
  &:hover {
    border: 1px solid ${(props) => props.theme.color.primary_normal};
  }
  &:active {
    background: ${(props) => props.theme.color.primary_normal};
    transition: 0.2s ease;
  }
`;

const MapTabInfo = styled.aside`
  position: absolute;
  z-index: 7;
  left: 3.125rem;
  bottom: 4.375rem;
  width: 5.625rem;
  height: 5.3125rem;
  border-radius: 0.625rem;
  background: ${(props) => props.theme.color.white};
  ${(props) => props.theme.FlexColumn};
  cursor: pointer;
  > div {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    padding-left: 1.25rem;
    gap: 0 0.5rem;
    > img {
      width: 1rem;
      height: 1.2rem;
    }
    > p {
      ${(props) => props.theme.Body_400_14_16}
    }
  }
`;

const MapTabBtn = styled.aside`
  position: absolute;
  z-index: 7;
  left: 1.25rem;
  bottom: 2.1875rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: ${(props) => props.theme.color.white};
  ${(props) => props.theme.FlexCenter};
  /* cursor: pointer; */
  &:hover {
    border: 1px solid ${(props) => props.theme.color.primary_normal};
  }
  &:active {
    background: ${(props) => props.theme.color.primary_normal};
    transition: 0.2s ease;
  }
`;

const CommentMeatBalls = styled(Meatballs)`
  cursor: pointer;
  &:hover {
    color: red;
  }
  &:active {
    transition: 0.2s ease;
  }
`;

const MapAddBtn = styled.aside`
  position: absolute;
  z-index: 7;
  left: 1.25rem;
  bottom: 4.6875rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: ${(props) => props.theme.color.white};
  ${(props) => props.theme.FlexCenter};
  cursor: pointer;
`;
const MapMinusBtn = styled.aside`
  position: absolute;
  z-index: 7;
  left: 1.25rem;
  bottom: 1.875rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: ${(props) => props.theme.color.white};
  ${(props) => props.theme.FlexCenter};
  cursor: pointer;
`;
