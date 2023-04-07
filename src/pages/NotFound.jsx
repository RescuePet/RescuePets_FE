import React from "react";
import Layout from "../layouts/Layout";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../elements/Button";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      NotFound
      <NotFoundContainer>
        <Button fillButton>되돌아가기</Button>
      </NotFoundContainer>
    </Layout>
  );
};

export default NotFound;

const NotFoundContainer = styled.div`
  width: 100%;
  ${(props) => props.theme.FlexCenter}
`;
