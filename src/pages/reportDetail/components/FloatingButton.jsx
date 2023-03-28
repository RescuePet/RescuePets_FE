import React from "react";
import styled from "styled-components";
import FooterIconChat from "../../../asset/footericon/FooterIconChat";
import { FlexAttribute } from "../../../style/Mixin";

const FloatingButton = ({ onClick }) => {
  return (
    <FloatingChatButton onClick={onClick}>
      <FloatingChatButtonSvg viewBox="-4 -4 30 30"></FloatingChatButtonSvg>
    </FloatingChatButton>
  );
};

const FloatingChatButton = styled.div`
  position: absolute;
  ${FlexAttribute("row", "center", "center")}
  bottom: 96px;
  right: 20px;
  width: 56px;
  height: 56px;
  z-index: 50;
  background-color: ${(props) => props.theme.color.primary_nomal};
  border-radius: 50%;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const FloatingChatButtonSvg = styled(FooterIconChat)`
  width: 30px;
  height: 30px;
  .default {
    fill: ${(props) => props.theme.color.primary_nomal};
  }
  .balloon {
    fill: ${(props) => props.theme.color.white};
  }
  circle {
    fill: ${(props) => props.theme.color.white};
  }
`;

export default FloatingButton;
