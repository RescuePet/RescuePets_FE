import React from "react";
import Layout from "../layouts/Layout";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../elements/Button";
import errorpageImg from "../asset/404page_06.png";
import Header from "./map/components/Header";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header />
      <NotFoundContainer>
        <img src={errorpageImg} alt="404png" />
        <NotFoundDiv>
          <Button
            type="button"
            fillButton
            onClick={() => {
              navigate("/home");
            }}
          >
            되돌아가기
          </Button>
        </NotFoundDiv>
      </NotFoundContainer>
    </Layout>
  );
};

export default NotFound;

const NotFoundContainer = styled.div`
  width: 100%;
  img {
    width: 100%;
  }
`;

const NotFoundDiv = styled.div`
  ${(props) => props.theme.FlexCenter}
`;
