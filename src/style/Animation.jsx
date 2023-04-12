import { keyframes } from "styled-components";

export const upAndDown = keyframes`
  0% {
    transform: translate(-17%,-20%);
  }
  50% {
    transform: translate(-17%,-25%);
  }
  100% {
    transform: translate(-17%,-20%);
  }
`;

export const toDown = keyframes`
0% {
  opacity: 0;
  transform: translateY(-50%);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
`;

export const toUp = keyframes`
0% {
  opacity: 0;
  transform: translateY(50%);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
`;
