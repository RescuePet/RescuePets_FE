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
import {
  addAdoptionPage,
  __getAdoptionList,
} from "../../redux/modules/adoptionSlice";
import refresh from "../../asset/refresh.svg";
import profile from "../../asset/profile.svg";
import search from "../../asset/search.svg";
import Cookies from "js-cookie";
import isLogin from "../../utils/isLogin";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const images = [carouselImage1, carouselImage2];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  const [userInfo, setUserInfo] = useState({});

  let { adoptionPage, adoptionLists } = useSelector((state) => state.adoption);
  const payloadSettings = {
    page: adoptionPage,
    size: 10,
  };
  useEffect(() => {
    if (isLogin() === false) {
      navigate("/signin");
      return;
    }
    setUserInfo(JSON.parse(Cookies.get("UserInfo")));
  }, [navigate]);
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
        {/* <img src={search} alt="search" /> */}
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
  ${FlexAttribute("row", "", "center")}
  margin: 0 auto;
  width: 20.9375rem;
  height: 5rem;
  padding-top: 2.5rem;
  padding-bottom: 0.5625rem;
  font-size: 1.125rem;
  font-weight: 700;
  span {
    flex-basis: 15rem;
    margin-left: 0.625rem;
    white-space: nowrap;
  }
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
`;

const PostContainer = styled.div`
  ${FlexAttribute("column", "", "center")}
  padding-bottom: 4.75rem;
`;

const TitleBox = styled.div`
  ${FlexAttribute("row", "space-between", "center")}
  margin-top: 1.5rem;
  width: 20.9375rem;
  h2 {
    font-size: 1.125rem;
    font-weight: 700;
  }
  span {
    font-size: 0.75rem;
    cursor: pointer;
  }
`;

export default Home;
