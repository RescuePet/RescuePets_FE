import React from "react";
import styled from "styled-components";
import { FlexAttribute } from "../../style/Mixin";
import Layout from "../../layouts/Layout";
import Post from "./components/Post";
import Carousel from "./components/Carousel";
import carouselImage1 from "../../asset/carousel/1.jpg";
import carouselImage2 from "../../asset/carousel/2.jpg";
import carouselImage3 from "../../asset/carousel/3.jpg";

const Home = () => {
  const images = [carouselImage1, carouselImage2, carouselImage3];

  return (
    <Layout>
      <HomeContainer>
        <Header>
          <span>안녕하세요! 펫벤져스님</span>
        </Header>
        <Carousel images={images} />
        <PostContainer>
          <TitleBox>
            <h2>새로운 가족을 맞이해보세요</h2>
            <span>전체 보기 &gt;</span>
          </TitleBox>
          <Post></Post>
        </PostContainer>
      </HomeContainer>
    </Layout>
  );
};

const Header = styled.div`
  ${FlexAttribute("row", "center")}
  margin: 0 auto;
  width: 335px;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  font-weight: 700;
`;

const PostContainer = styled.div`
  ${FlexAttribute("column", "", "center")}
`;

const HomeContainer = styled.div`
  ${FlexAttribute("column")}
  width: 100%;
`;

const TitleBox = styled.div`
  ${FlexAttribute("row", "space-between", "center")}
  margin-top: 24px;
  width: 335px;
  h2 {
    font-size: 18px;
    font-weight: 700;
  }
  span {
    font-size: 12px;
    cursor: pointer;
  }
`;

export default Home;
