import React from "react";
import styled from "styled-components";
import splashimage from "../asset/splash/splashimage.png";
import splashcontents from "../asset/splash/splashcontents.png";
import { FlexAttribute } from "../style/Mixin";

const Splash = () => {
  return (
    <Layout>
      <ImageWrapper>
        <img src={splashcontents} alt="splashcontents" />
        <img src={splashimage} alt="splashimage" />
      </ImageWrapper>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 160px;
    :last-child {
      margin-top: 35px;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  ${FlexAttribute("column", "center", "center")}
`;

export default Splash;
