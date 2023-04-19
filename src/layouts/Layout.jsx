import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FlexAttribute } from "../style/Mixin";
import Footer from "./Footer";
import isLogin from "../utils/isLogin";
import { useDispatch, useSelector } from "react-redux";
import { toggleScroll } from "../redux/modules/commentSlice";

import backgroundImage from "../asset/webbackground/Desktop.jpg";
import PopDog from "../asset/webbackground/PopDog.png";
import Logo from "../asset/webbackground/Logo.png";
import RoadLeft from "../asset/webbackground/PopRoadLeft.png";
import RoadRight from "../asset/webbackground/PopRoadRight.png";
import People from "../asset/webbackground/PopPeople.png";
import Marker from "../asset/webbackground/PopMaker.png";
import Sole from "../asset/webbackground/PopSole.png";

import { upAndDown } from "../style/Animation";
import { EventSourcePolyfill } from "event-source-polyfill";
import Cookies from "js-cookie";
import { useModalState } from "../hooks/useModalState";
import { SseAlertModal } from "../elements/SseAlert";
import { seeChatCount } from "../redux/modules/sseSlice";
import { seeMyaddCount } from "../redux/modules/sseSlice";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const { scrollState } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  const [loginModal, toggleModal] = useModalState(false);

  const ref = useRef(null);
  const token = Cookies.get("Token");


  const [data, setData] = useState([]);
  let eventSource = undefined;

  useEffect(() => {
      eventSource = new EventSourcePolyfill(
        `${process.env.REACT_APP_SIGN_TEST}/sse/`,
        {
          headers: {
            Authorization: token,
          },
          heartbeatTimeout: 2000000,
          withCredentials: true,
        }
      );

    eventSource.onmessage = (event) => {
      const checkJSON = event.data.split(" ")[0];
      const data = checkJSON !== "EventStream" && JSON.parse(event.data);
      if (data.message !== undefined) {
        toggleModal();
        setData(data);
        if (data.message.split(" ")[1] === "새로운") {
          dispatch(seeChatCount(1));
        } else if (data.message.split(" ")[1] === "댓글을") {
          dispatch(seeMyaddCount(1));
        } else if (data.message.split(" ")[1] === "스크랩") {
          dispatch(seeMyaddCount(1));
        }
      }
    };

    return () => {
      eventSource.close();
    };
  }, [eventSource]);

  useEffect(() => {
    const storedScrollPosition = localStorage.getItem("scrollPosition");
    if (
      storedScrollPosition &&
      (location.pathname === "/home" || location.pathname === "/petwork")
    ) {
      setScrollPosition(parseInt(storedScrollPosition));
      ref.current.scrollTop = parseInt(storedScrollPosition);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/signup" && isLogin() === false) {
      return;
    } else if (location.pathname === "/" && isLogin() === false) {
      return;
    } else if (isLogin() === false) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    if (scrollState) {
      setTimeout(() => {
        ref.current.scrollTo({
          top: ref.current.scrollHeight,
          behavior: "smooth",
        });
        dispatch(toggleScroll());
      }, 300);
    }
  }, [scrollState]);

  const saveScrollPosition = (e) => {
    if (location.pathname === "/home" || location.pathname === "/petwork") {
      const newPosition = e.target.scrollTop;
      localStorage.setItem("scrollPosition", newPosition);
      setScrollPosition(newPosition);
    }
  };

  return (
    <>
      <WebLayout className="weblayout" imageURL={backgroundImage}>
        <MobileLayout
          ref={ref}
          onScroll={saveScrollPosition}
          scrollTop={scrollPosition}
        >
          {data.message == undefined ? null : (
            <SseAlertModal
              isOpen={loginModal}
              toggle={toggleModal}
              onClose={toggleModal}
            >
              {data.message}
            </SseAlertModal>
          )}

          {children}
          {location.pathname !== "/" &&
            location.pathname !== "/signin" &&
            location.pathname !== "/signup" &&
            location.pathname !== "/missing" &&
            location.pathname !== "/catch" &&
            location.pathname.split("/")[1] !== "editcatch" &&
            location.pathname.split("/")[1] !== "editmissing" &&
            location.pathname.split("/")[1] !== "chatroom" && <Footer></Footer>}
        </MobileLayout>
        <LogoImage src={Logo} />
        <RoadLeftImage src={RoadLeft} />
        <DogImage src={PopDog} />
        <MarkerImage src={Marker} />
        <SoleImage src={Sole} />
        <RoadRightImage src={RoadRight} />
        <PeopleImage src={People} />
      </WebLayout>
    </>
  );
};

const WebLayout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.imageURL});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
  @media screen and (max-width: 26.875rem) {
    background: none;
  }
`;

const MobileLayout = styled.div`
  ${FlexAttribute("column")}
  width: 27rem;
  height: 100%;
  margin: 0 auto;
  padding-bottom: 4.75rem;
  background-color: ${(props) => props.theme.color.white};
  border-left: 0.0625rem solid ${(props) => props.theme.color.line_normal};
  border-right: 0.0625rem solid ${(props) => props.theme.color.line_normal};
  overflow-y: scroll;
  overflow-x: hidden;
  // 26.875rem이하일떄 넣어줌
  // 데스크탑용의 가장 큰 화면 사이즈의 레이아웃을 기본으로 하고, 점차 축소하는 형태로 CSS를 작성합니다.(스마트폰 화면에 적용)
  @media screen and (max-width: 26.875rem) {
    margin: 0 auto;
    width: 100%;
    min-height: 100%;
    padding-bottom: 4.75rem;
    background-color: ${(props) => props.theme.color.white};
  }
`;

const LogoImage = styled.img`
  position: absolute;
  top: 5vh;
  right: calc(50% + 305px);
  width: 325px;
`;

const DogImage = styled.img`
  position: absolute;
  top: 50vh;
  width: 250px;
  transform: translate(-17%, -20%);
  left: calc(50% - 500px);
  animation: ${upAndDown} 2.3s infinite;
`;

const RoadLeftImage = styled.img`
  position: absolute;
  top: calc(50% - -150px);
  height: 550px;
  transform: translate(-17%, -20%);
  left: calc(50% - 520px);
`;

const MarkerImage = styled.img`
  position: absolute;
  top: calc(50% - 140px);
  height: 80px;
  transform: translate(-17%, -20%);
  left: calc(50% - 490px);
`;

const SoleImage = styled.img`
  position: absolute;
  top: calc(50% - 9px);
  height: 110px;
  transform: translate(-17%, -20%);
  left: calc(50% - 611px);
`;

const RoadRightImage = styled.img`
  position: absolute;
  height: calc(50% + 410px);
  top: calc(50% - 370px);
  left: calc(50% + 331px);
`;

const PeopleImage = styled.img`
  position: absolute;
  height: calc(50% + 290px);
  top: calc(50% - 410px);
  left: calc(50% + 331px);
`;

export default Layout;
