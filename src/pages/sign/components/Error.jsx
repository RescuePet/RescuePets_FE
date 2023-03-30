import React from "react";
import Vector from "../../../asset/Vector.png";

export const Error = () => {
  return (
    <span>
      <img src={Vector} style={{ width: ".625rem", height: ".5625rem" }} />
      영문 숫자 2 ~ 8글자 사이로 입력
    </span>
  );
};
