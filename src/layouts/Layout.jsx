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
import { upAndDown } from "../style/Animation";
import { EventSourcePolyfill } from "event-source-polyfill";
import Cookies from "js-cookie";
import { useModalState } from "../hooks/useModalState";
import { SseAlertModal } from "../elements/SeeAlert";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const { scrollState } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  const [loginModal, toggleModal] = useModalState(false);
  // console.log(loginModal);

  const ref = useRef(null);
  const token = Cookies.get("Token");

  const [listening, setListening] = useState(false);
  // console.log("SSE연결체크", listening);
  const [data, setData] = useState([]);
  let eventSource = undefined;
  // let eventSource = useRef(null);
  console.log(data.message);

  useEffect(() => {
    if (!listening) {
      eventSource = new EventSourcePolyfill("https://heukwu.shop/sse/", {
        headers: {
          Authorization: token,
          // "Content-Type": "text/event-stream",
          // Connection: "keep-alive",
        },
        heartbeatTimeout: 3600000,
        withCredentials: true,
      });

      eventSource.onopen = (event) => {
        // console.log("SSE연결성공", event);
        // console.log("connection opened");
      };

      eventSource.onmessage = (event) => {
        // console.log(event);
        toggleModal();
        const checkJSON = event.data.split(" ")[0];
        const data = checkJSON !== "EventStream" && JSON.parse(event.data);
        // console.log(data.message);
        // console.log("SSE데이터", event);
        // console.log("result", event.data);
        setData(data);
      };

      eventSource.onerror = (event) => {
        console.log("SSE오류", event);
        if (event.target.readyState === EventSource.CLOSED) {
          // console.log("eventsource closed (" + event.target.readyState + ")");
        }
        eventSource.close();
      };

      setListening(true);
    }

    return () => {
      eventSource.close();
      // console.log("eventsource closed");
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
        <DogImage src={PopDog} />
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
  overflow: scroll;
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

export default Layout;
