import React from "react";
import styled from "styled-components";
import { HeaderStyle } from "../../../style/Mixin";
import petworkheader from "./../../../asset/header/petworkheader.png";

const Header = () => {
  return (
    <MapHeaderContainer>
      <img src={petworkheader} />
    </MapHeaderContainer>
  );
};

export default Header;

const MapHeaderContainer = styled.div`
  ${HeaderStyle}
  display: flex;
  align-items: center;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  > img {
    width: 9.8125rem;
    height: 1.875rem;
  }
`;
