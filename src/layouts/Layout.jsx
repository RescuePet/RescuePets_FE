import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <WebLayout>
      <Box>{children}</Box>
    </WebLayout>
  );
};

const WebLayout = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #333;
`;

const Box = styled.div`
  width: 430px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  background-color: #FFFFFF;
  /* border: 1px solid red; */

  // 430px이하일떄 넣어줌
  //  데스크탑용의 가장 큰 화면 사이즈의 레이아웃을 기본으로 하고, 점차 축소하는 형태로 CSS를 작성합니다.(스마트폰 화면에 적용)
  @media screen and (max-width: 430px) {
    margin: 0 auto;
    width: 375px;
    border: 1px solid blue;
    background-color: #FFFFFF;
  }
`;

export default Layout;
