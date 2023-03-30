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
  position: fixed;
  ${(props) => props.theme.FlexCenter}
  z-index: 8;
  background: ${(props) => props.theme.color.white};
  bottom: 6.5625rem;
  left: 0;
  margin-left: calc(50% + 8.75rem);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 26.875rem) {
    margin-left: calc(50% + 7.6875rem);
  }
  > img {
    width: 1.125rem;
    height: 1.125rem;
  }
`;
