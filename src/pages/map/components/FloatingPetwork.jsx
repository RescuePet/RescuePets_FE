import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import floating from "../../../asset/floating.png";

export const FloatingPetwork = () => {
  const navigate = useNavigate();
  const MoveToPetWork = () => {
    navigate("/petwork");
  };

  return (
    <FloatingPetNetworkContainer onClick={MoveToPetWork}>
      <img src={floating} onClick={MoveToPetWork} />
    </FloatingPetNetworkContainer>
  );
};

const FloatingPetNetworkContainer = styled.div`
  position: absolute;
  ${(props) => props.theme.FlexCenter}
  z-index: 19;
  background: ${(props) => props.theme.color.white};
  bottom: 1.625rem;
  width: 3.5rem;
  height: 3.5rem;
  right: 1.5625rem;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  > img {
    width: 1.125rem;
    height: 1.125rem;
  }
`;
