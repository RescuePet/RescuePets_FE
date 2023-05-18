import React from "react";
import styled from "styled-components";
import { FlexAttribute } from "../style/Mixin";

const Error404 = ({ srcUrl }) => {
  return (
    <ErrorContainer>
      <ErrorImage src={srcUrl} alt="NotFoundImg"/>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  ${FlexAttribute("row", "center", "center")}
  width: 100%;
`;

const ErrorImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

export default Error404;
