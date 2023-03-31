import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { FlexAttribute } from "../style/Mixin";
import Footer from "./Footer";
import { TokenCheck } from "../utils/TokenCheck";
// import isSignin from "../utils/TokenCheck";

const Layout = ({ children }) => {
  TokenCheck();

  const location = useLocation();

  return (
    <>
      <WebLayout>
        <MobileLayout>
          {children}
          {location.pathname !== "/" &&
            location.pathname !== "/signin" &&
            location.pathname !== "/signup" &&
            location.pathname !== "/missing" &&
            location.pathname !== "/catch" &&
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
  background-color: ${(props) => props.theme.color.white}; ;
`;

const MobileLayout = styled.div`
  ${FlexAttribute("column")}
  width: 27rem;
  min-height: 100%;
  margin: 0 auto;
  padding-bottom: 4.75rem;
  background-color: ${(props) => props.theme.color.white};
  border-left: 0.0625rem solid ${(props) => props.theme.color.line_normal};
  border-right: 0.0625rem solid ${(props) => props.theme.color.line_normal};
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
