import React from "react";
import Layout from "../../layouts/Layout";
import styled from "styled-components";
import introduce from "../../asset/carousel/introduce.png";
import Button from "../../elements/Button";
import { FlexAttribute } from "../../style/Mixin";
import { useNavigate } from "react-router-dom";

const CarouselLink = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <IntroduceImage src={introduce} />
      <ButtonWrapper>
        <Button fillButton onClick={() => navigate("/home")}>
          서비스 이용하기
        </Button>
      </ButtonWrapper>
    </Layout>
  );
};

const IntroduceImage = styled.img``;

const ButtonWrapper = styled.div`
  ${FlexAttribute("row", "center", "center")};
  margin-top: 20px;
`;

export default CarouselLink;
