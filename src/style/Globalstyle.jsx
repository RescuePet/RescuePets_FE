import { createGlobalStyle } from "styled-components";
import NotoSanseKR from "../asset/fonts/NotoSansKR-Regular.woff";
import Roboto from "../asset/fonts/Roboto-Regular.woff";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "Noto_Sans_KR";
  src: url(${NotoSanseKR}) format("woff");
  font-style: normal;
}
@font-face {
  font-family: "Roboto";
  src: url(${Roboto}) format("woff");
  font-style: normal;
}
html {
  height: 100%;
}
#root {
  height: 100%;
}
body {
  font-family: "Roboto","Noto_Sans_KR";
  height: 100%;
}
img {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}

`;

export default GlobalStyle;
