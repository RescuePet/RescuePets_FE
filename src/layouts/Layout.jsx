import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FlexAttribute } from "../style/Mixin";
import Footer from "./Footer";
import isLogin from "../utils/isLogin";
import backgroundImage from "../asset/webbackground/Desktop.jpg";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const ref = useRef(null);

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
          {children}
          {location.pathname !== "/" &&
            location.pathname !== "/signin" &&
            location.pathname !== "/signup" &&
            location.pathname !== "/missing" &&
            location.pathname !== "/catch" &&
            location.pathname.split("/")[1] !== "editcatch" &&
            location.pathname.split("/")[1] !== "editmissing" &&
            location.pathname.split("/")[1] !== "sightingdetail" &&
            location.pathname.split("/")[1] !== "missingdetail" &&
            location.pathname.split("/")[1] !== "chatroom" && <Footer></Footer>}
        </MobileLayout>
      </WebLayout>
    </>
  );
};

const WebLayout = styled.div`
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

export default Layout;
