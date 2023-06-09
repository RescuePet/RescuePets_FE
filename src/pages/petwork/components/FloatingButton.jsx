import React from "react";
import styled from "styled-components";
import MapSvg from "../../../asset/map";
import { FlexAttribute, FloatingButtonStyle } from "../../../style/Mixin";

const FloatingButton = ({ onClick }) => {
  return (
    <FloatingChatButton onClick={onClick}>
      <FloatingMapButtonSvg />
    </FloatingChatButton>
  );
};

const FloatingChatButton = styled.div`
  position: fixed;
  ${FlexAttribute("row", "center", "center")}
  ${FloatingButtonStyle}
  width: 3.5rem;
  height: 3.5rem;
  z-index: 10;
  background-color: ${(props) => props.theme.color.primary_normal};
  border-radius: 50%;
  box-shadow: 0.125rem 0.125rem 0.25rem 0.125rem rgba(0, 0, 0, 0.25);
  cursor: pointer;
  &:hover {
    border: 1px solid ${(props) => props.theme.color.primary_heavy};
  }
  &:active {
    background: ${(props) => props.theme.color.primary_heavy};
    transition: 0.2s ease;
  }
`;

const FloatingMapButtonSvg = styled(MapSvg)`
  width: 1.875rem;
  height: 1.875rem;
`;

export default FloatingButton;
