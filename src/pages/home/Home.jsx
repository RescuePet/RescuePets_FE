import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexAttribute } from "../../style/Mixin";
import Layout from "../../layouts/Layout";
import { useInView } from "react-intersection-observer";
import Post from "./components/Post";
import Carousel from "./components/Carousel";
import carouselImage1 from "../../asset/carousel/1.jpg";
import carouselImage2 from "../../asset/carousel/2.jpg";
import carouselImage3 from "../../asset/carousel/3.jpg";
import { useDispatch, useSelector } from "react-redux";
import { __getAdoptionList } from "../../redux/modules/adoptioonSlice";
import { Link } from "react-router-dom";
import Footer from "../../layouts/Footer";

const Home = () => {
  const images = [carouselImage1, carouselImage2, carouselImage3];
  const dispatch = useDispatch();
  const [ref, inView] = useInView();

  const [page, setPage] = useState(1);

  let adoptionLists = useSelector((state) => state.adoption.adoptionLists);

  const payloadSettings = {
    page: page,
    size: 5,
  };

  useEffect(() => {
    if (inView) {
      setPage((prevState) => prevState + 1);
      dispatch(__getAdoptionList(payloadSettings));
    }
  }, [inView]);

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
          {adoptionLists.map((item, index) => {
            return (
              <Link
                key={`post-item-${item.id}-${index}`}
                to={`/adoptiondetail/${item.desertionNo}`}
              >
                <Post item={item}></Post>
              </Link>
            );
          })}
          <div ref={ref}></div>
        </PostContainer>
      </HomeContainer>
      <Footer></Footer>
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
