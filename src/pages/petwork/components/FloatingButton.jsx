import React from "react";
import styled from "styled-components";
import MapSvg from "../../../asset/map";
import { FlexAttribute } from "../../../style/Mixin";

const FloatingButton = ({ onClick }) => {
  return (
    <FloatingChatButton onClick={onClick}>
      <FloatingMapButtonSvg />
    </FloatingChatButton>
  );
};

const FloatingChatButton = styled.div`
  position: sticky;
  ${FlexAttribute("row", "center", "center")}
  bottom: 105px;
  transform: translateX(350px);
  width: 56px;
  height: 56px;
  z-index: 8;
  background-color: ${(props) => props.theme.color.primary_nomal};
  border-radius: 50%;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const FloatingMapButtonSvg = styled(MapSvg)`
  width: 30px;
  height: 30px;
`;

export default FloatingButton;
