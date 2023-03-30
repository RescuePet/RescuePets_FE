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
  position: fixed;
  ${FlexAttribute("row", "center", "center")}
  left: 0;
  bottom: 6.5625rem;
  margin-left: calc(50% + 8.75rem);
  width: 3.5rem;
  height: 3.5rem;
  z-index: 50;
  background-color: ${(props) => props.theme.color.primary_normal};
  border-radius: 50%;
  box-shadow: 0.125rem 0.125rem 0.25rem 0.125rem rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const FloatingChatButtonSvg = styled(FooterIconChat)`
  width: 1.875rem;
  height: 1.875rem;
  .default {
    fill: ${(props) => props.theme.color.primary_normal};
  }
  .balloon {
    fill: ${(props) => props.theme.color.white};
  }
  circle {
    fill: ${(props) => props.theme.color.white};
  }
`;

export default FloatingButton;
