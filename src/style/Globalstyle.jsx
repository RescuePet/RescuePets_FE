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
body {
  font-family: "Roboto","Noto_Sans_KR";
}
`;

export default GlobalStyle;
