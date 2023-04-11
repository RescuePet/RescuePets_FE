import React, { useCallback, useEffect, useState } from "react";
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

import Search from "../../asset/search";
import profile from "../../asset/profile.svg";
import Cookies from "js-cookie";
import isLogin from "../../utils/isLogin";
import { useNavigate } from "react-router-dom";
import SearchSetting from "../../components/search/SearchSetting";
import SearchCategory from "../../components/search/SearchCategory";
import {
  __getAdoptionSearch,
  completeSearch,
  resetResponseMessage,
  setMemberPosition,
  setSearchValue,
  toggleDescriptionCategory,
  toggleKindCategory,
  togglePublicSearchMode,
  togglePublicSearchState,
} from "../../redux/modules/searchSlice";
import Error404 from "../../elements/Error404";
import ErrorPost from "../../asset/error/404post.png";

const Home = () => {
  const images = [
    { imageUrl: carouselImage1, linkUrl: "/introduce" },
    {
      imageUrl: carouselImage2,
      linkUrl:
        "https://docs.google.com/forms/d/e/1FAIpQLSehjtbMQPEmG-UdqSTAAQOLogs6NtmHAwOKY4vNCHGawxe1FA/viewform",
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  const [userInfo, setUserInfo] = useState({});

  const { adoptionPage, adoptionLists } = useSelector(
    (state) => state.adoption
  );

  const {
    publicSearchMode,
    publicSearchLists,
    searchValue,
    responseMessage,
    distanceState,
    longitude,
    latitude,
    searchPage,
    searchPublicState,
    searchPublicSetState,
    searchCategory,
    descriptionCategory,
  } = useSelector((state) => state.search);

  useEffect(() => {
    console.log("navigator");
    navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
    return () => {
      resetResponseMessage();
    };
  }, []);

  // console.log(onSucces)
  const onSuccess = useCallback((position) => {
    console.log("onSuccess");
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    dispatch(setMemberPosition({ lat: lat, lng: lng }));
  }, []);

  const onFailure = () => {
    console.log("onFaileure");
    console.log("위치 정보를 찾을수 없습니당.");
  };

  const payloadSettings = {
    page: adoptionPage,
    size: 10,
  };

  console.log(searchValue);

  useEffect(() => {
    if (isLogin() === false) {
      navigate("/signin");
      return;
    }
    setUserInfo(JSON.parse(Cookies.get("UserInfo")));
  }, [navigate]);

  useEffect(() => {
    if (inView && !searchPublicSetState) {
      dispatch(addAdoptionPage());
      dispatch(__getAdoptionList(payloadSettings));
    } else if (inView && searchPublicSetState && publicSearchMode) {
      console.log("scroll function");
      scrollAdoption();
    }
    console.log("none");
  }, [inView]);

  const adoptionSearchPayload = {
    page: searchPage,
    size: 10,
    longitude: longitude,
    latitude: latitude,
    description: descriptionCategory,
    searchKey: searchCategory,
    searchValue: searchValue,
    type: "public",
  };

  const searchAdoption = (value) => {
    const payload = {
      page: 1,
      size: 10,
      longitude: longitude,
      latitude: latitude,
      description: descriptionCategory,
      searchKey: searchCategory,
      searchValue: value,
      type: "public",
    };
    dispatch(togglePublicSearchMode(true));
    dispatch(completeSearch());

    dispatch(__getAdoptionSearch(payload));
  };

  const searchDistanceHandler = (distance) => {
    if (distanceState) {
      const payload = {
        page: 1,
        size: 10,
        longitude: longitude,
        latitude: latitude,
        description: distance,
        searchKey: searchCategory,
        type: "public",
      };
      dispatch(completeSearch());
      dispatch(togglePublicSearchMode(true));
      dispatch(toggleDescriptionCategory(distance));

      dispatch(__getAdoptionSearch(payload));
    } else {
      dispatch(toggleDescriptionCategory(distance));
    }
  };

  const searchKindHandler = (kindCategory) => {
    const adoptionSearchPayload = {
      page: 1,
      size: 10,
      longitude: longitude,
      latitude: latitude,
      description: descriptionCategory,
      searchKey: searchCategory,
      searchValue: kindCategory,
      type: "public",
    };
    dispatch(completeSearch());
    dispatch(setSearchValue(kindCategory));
    dispatch(toggleKindCategory(kindCategory));
    dispatch(togglePublicSearchMode(true));

    dispatch(__getAdoptionSearch(adoptionSearchPayload));
  };

  const scrollAdoption = () => {
    dispatch(__getAdoptionSearch(adoptionSearchPayload));
  };

  console.log(responseMessage);

  return (
    <Layout>
      <Header>
        {searchPublicState ? (
          <SearchCategory />
        ) : (
          <>
            <img
              src={
                userInfo.profileImage == null ? profile : userInfo.profileImage
              }
              alt="profile"
            />
            <HeaderSpan>안녕하세요! {userInfo.nickname}님</HeaderSpan>
            <SearchIcon
              width={30}
              height={30}
              onClick={() => dispatch(togglePublicSearchState())}
            />
          </>
        )}
      </Header>
      {!searchPublicSetState && <Carousel images={images} />}
      {searchPublicSetState && (
        <SearchSetting
          searchHandler={searchAdoption}
          searchKindHandler={searchKindHandler}
          searchDistanceHandler={searchDistanceHandler}
        />
      )}
      <PostContainer>
        <TitleBox>
          {searchPublicSetState ? (
            <h2>검색 내용</h2>
          ) : (
            <h2>새로운 가족을 맞이해보세요</h2>
          )}
        </TitleBox>
        {responseMessage === "유기동물 검색 결과가 없습니다." &&
          publicSearchLists.length === 0 && <Error404 srcUrl={ErrorPost} />}
        {!searchPublicSetState &&
          adoptionLists.map((item, index) => {
            return (
              <Post
                key={`post-item-${item.desertionNo}-${index}`}
                item={item}
              ></Post>
            );
          })}
        {searchPublicState &&
          publicSearchLists.map((item, index) => {
            return (
              <Post
                key={`search-item-${item.desertionNo}-${index}`}
                item={item}
              />
            );
          })}
        <div ref={ref}></div>
      </PostContainer>
    </Layout>
  );
};

const Header = styled.div`
  ${FlexAttribute("row", "center", "center")}
  margin: 0 auto;
  width: 100%;
  height: 5rem;
  padding-top: 2.5rem;
  padding-bottom: 0.5625rem;
  font-size: 1.125rem;
  font-weight: 700;
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
`;

const HeaderSpan = styled.span`
  flex-basis: 15rem;
  margin-left: 0.625rem;
  white-space: nowrap;
`;

const SearchIcon = styled(Search)`
  cursor: pointer;
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
