import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexAttribute } from "../../style/Mixin";
import Layout from "../../layouts/Layout";
import { useInView } from "react-intersection-observer";
import Post from "./components/Post";
import Carousel from "./components/Carousel";
import carouselImage1 from "../../asset/carousel/1.png";
import carouselImage2 from "../../asset/carousel/2.png";
import { useDispatch, useSelector } from "react-redux";
import { __getAdoptionList } from "../../redux/modules/adoptioonSlice";
import { Link } from "react-router-dom";
import Footer from "../../layouts/Footer";
import refresh from "../../asset/refresh.svg";
import profile from "../../asset/profile.svg";
import search from "../../asset/search.svg";

const Home = () => {
  const images = [carouselImage1, carouselImage2];
  const dispatch = useDispatch();
  const [ref, inView] = useInView();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

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
      <Header>
        <img
          src={userInfo.profileImage == null ? profile : userInfo.profileImage}
          alt="profile"
        />
        <span>안녕하세요! {userInfo.nickname}님</span>
        <img src={search} alt="search" />
      </Header>
      <Carousel images={images} />
      <PostContainer>
        <TitleBox>
          <h2>새로운 가족을 맞이해보세요</h2>
          <img src={refresh} alt="refresh page" />
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
    </Layout>
  );
};

const Header = styled.div`
  ${FlexAttribute("row", "space-between", "center")}
  margin: 0 auto;
  width: 335px;
  height: 80px;
  padding-top: 40px;
  padding-bottom: 9px;
  font-size: 18px;
  font-weight: 700;
  span {
    flex-basis: 240px;
  }
`;

const PostContainer = styled.div`
  ${FlexAttribute("column", "", "center")}
  padding-bottom: 76px;
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
