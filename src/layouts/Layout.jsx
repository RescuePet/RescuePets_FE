import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FlexAttribute } from "../style/Mixin";
import Footer from "./Footer";
import isSignin from "../utils/token";

const Layout = ({ children }) => {
  const location = useLocation();

  // 이미지 닉네임 만 넣어서 변경 

  const navigate = useNavigate()
  //  signing , signup 만 제외하고 토큰없으면 로그인으로 이동시키기 
  // useEffect(() => {
  //   // 로그인 회원가입을 제외하고 토큰이 있다면 
  //   if (location.pathname !== "/signup" && location.pathname !== "/signin" && location.pathname !== "/") {

  //     if (isSignin()) {
  //       console.log('토큰있음')
  //     } else {
  //       // alert('로그인 시간이 만료되었습니다. 다시 로그인 해주세요');
  //       // navigate('/signin')
  //       console.log("토큰없음")
  //     }
  //   } else {
  //     console.log('userPage')
  //   }
  // }, [])
  //  notFound.page 

  return (
    <>
      <WebLayout>
        <MobileLayout>
          {children}
          {location.pathname !== "/" &&
            location.pathname !== "/signin" &&
            location.pathname !== "/signup" &&
            location.pathname !== "/missing" &&
            location.pathname !== "/catch" && <Footer></Footer>}
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
  ${FlexAttribute("column", "center")}
  width: 430px;
  height: 100%;
  margin: 0 auto;
  background-color: ${(props) => props.theme.color.white};
  // 430px이하일떄 넣어줌
  // 데스크탑용의 가장 큰 화면 사이즈의 레이아웃을 기본으로 하고, 점차 축소하는 형태로 CSS를 작성합니다.(스마트폰 화면에 적용)
  @media screen and (max-width: 430px) {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.color.white};
  }
`;

export default Layout;
