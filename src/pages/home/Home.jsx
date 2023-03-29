import React, { useEffect } from "react";
import styled from "styled-components";
import { FlexAttribute } from "../../style/Mixin";
import Layout from "../../layouts/Layout";
import { useInView } from "react-intersection-observer";
import Post from "./components/Post";
import Carousel from "./components/Carousel";
import carouselImage1 from "../../asset/carousel/1.png";
import carouselImage2 from "../../asset/carousel/2.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdoptionPage,
  __getAdoptionList,
} from "../../redux/modules/adoptionSlice";
import { Link } from "react-router-dom";
import refresh from "../../asset/refresh.svg";
import profile from "../../asset/profile.svg";
import search from "../../asset/search.svg";

const Home = () => {
  const images = [carouselImage1, carouselImage2];
  const dispatch = useDispatch();
  const [ref, inView] = useInView();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  let { adoptionPage, adoptionLists } = useSelector((state) => state.adoption);
  const payloadSettings = {
    page: adoptionPage,
    size: 10,
  };

  useEffect(() => {
    if (inView) {
      dispatch(addAdoptionPage());
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
            <Post key={`post-item-${item.id}-${index}`} item={item}></Post>
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
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
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
