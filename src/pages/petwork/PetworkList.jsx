import React, { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Layout from "../../layouts/Layout";
import { Title_700_18 } from "../../style/theme";
import { HeaderStyle, FlexAttribute } from "../../style/Mixin";
import Card from "./components/Card";
import Category from "./components/Category";
import { useDispatch, useSelector } from "react-redux";
import {
  addCatchPage,
  addMissingPage,
  __getCatchPost,
  __getMissingPost,
} from "../../redux/modules/petworkSlice";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import petworkHeader from "../../asset/header/petworkheader.png";
import FloatingButton from "./components/FloatingButton";
import {
  __getPostSearch,
  completeSearch,
  setMemberPosition,
  setSearchValue,
  toggleDescriptionCategory,
  toggleKindCategory,
  toggleSearchState,
} from "../../redux/modules/searchSlice";
import SearchCategory from "../../components/search/SearchCategory";
import Search from "../../asset/search";
import SearchSetting from "../../components/search/SearchSetting";
import { toDown } from "../../style/Animation";
import Error404 from "../../elements/Error404";
import ErrorSearch from "../../asset/error/404search.png";
import ErrorPost from "../../asset/error/404post.png";

const PetworkList = () => {
  const [missingRef, missingInView] = useInView();
  const [catchRef, catchInView] = useInView();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchOn, setSearchOn] = useState(false);

  const {
    error,
    postSearchLists,
    searchValue,
    distanceState,
    postType,
    longitude,
    latitude,
    searchPage,
    searchState,
    searchSetState,
    searchCategory,
    descriptionCategory,
  } = useSelector((state) => state.search);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
  }, []);

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

  const petwork = useSelector((state) => state.petwork);
  const missingPayloadSettings = {
    page: petwork.missingPage,
    size: 10,
  };

  const catchPayloadSettings = {
    page: petwork.catchPage,
    size: 10,
  };

  const adoptionSearchPayload = {
    page: searchPage,
    size: 10,
    longitude: longitude,
    latitude: latitude,
    description: descriptionCategory,
    searchKey: searchCategory,
    searchValue: searchValue,
    type: "post",
    postType: postType,
  };

  useEffect(() => {
    if (missingInView && !petwork.missingLastPage) {
      dispatch(addMissingPage());
      dispatch(__getMissingPost(missingPayloadSettings));
    }
    if (catchInView && !petwork.catchLastPage) {
      dispatch(addCatchPage());
      dispatch(__getCatchPost(catchPayloadSettings));
    }
    if ((missingInView || catchInView) && searchOn) {
      dispatch(__getPostSearch(adoptionSearchPayload));
    }
  }, [missingInView, catchInView]);

  const searchPostHandler = (value) => {
    const payload = {
      page: 1,
      size: 10,
      longitude: longitude,
      latitude: latitude,
      description: descriptionCategory,
      searchKey: searchCategory,
      searchValue: value,
      type: "post",
      postType: postType,
    };
    setSearchOn(true);
    dispatch(completeSearch());

    dispatch(__getPostSearch(payload));
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
        type: "post",
        postType: postType,
      };
      setSearchOn(true);
      dispatch(completeSearch());
      dispatch(toggleDescriptionCategory(distance));

      dispatch(__getPostSearch(payload));
    } else {
      dispatch(toggleDescriptionCategory(distance));
    }
  };

  const searchKindHandler = (kindCategory) => {
    const payload = {
      page: 1,
      size: 10,
      longitude: longitude,
      latitude: latitude,
      description: descriptionCategory,
      searchKey: searchCategory,
      searchValue: kindCategory,
      type: "post",
      postType: postType,
    };
    dispatch(setSearchValue(kindCategory));
    dispatch(toggleKindCategory(kindCategory));
    setSearchOn(true);
    dispatch(completeSearch());

    dispatch(__getPostSearch(payload));
  };

  return (
    <Layout>
      <PetworkHeader>
        {searchState ? (
          <SearchCategory petwork />
        ) : (
          <>
            <HeaderImage src={petworkHeader}></HeaderImage>
            <SearchIcon
              width={30}
              height={30}
              onClick={() => dispatch(toggleSearchState())}
            />
          </>
        )}
      </PetworkHeader>
      <Category></Category>
      {searchSetState && (
        <SearchSetting
          petwork
          searchHandler={searchPostHandler}
          searchKindHandler={searchKindHandler}
          searchDistanceHandler={searchDistanceHandler}
        />
      )}
      {searchSetState ? (
        <ListTitleWrapper search>
          <ListTitle>검색 내용</ListTitle>
        </ListTitleWrapper>
      ) : (
        <ListTitleWrapper>
          <ListTitle>{petwork.category}</ListTitle>
        </ListTitleWrapper>
      )}
      {searchSetState && postSearchLists.length === 0 && searchOn && (
        <Error404 srcUrl={ErrorPost} />
      )}
      <ListCardContainer>
        {!searchSetState &&
          petwork.category === "우리집 반려동물을 찾아주세요" &&
          petwork.missingPostLists.map((item, index) => {
            return (
              <Card
                key={`missing-post-${index}`}
                item={item}
                page="missingdetail"
              ></Card>
            );
          })}
        {searchSetState &&
          petwork.category === "우리집 반려동물을 찾아주세요" &&
          postSearchLists.map((item, index) => {
            return (
              <Card
                key={`missing-post-${index}`}
                item={item}
                page="missingdetail"
              ></Card>
            );
          })}
        {!searchSetState &&
          petwork.category === "길 잃은 동물을 발견했어요" &&
          petwork.catchPostLists.map((item, index) => {
            return (
              <Card
                key={`catch-post-${index}`}
                item={item}
                page="catchdetail"
              ></Card>
            );
          })}
        {searchSetState &&
          petwork.category === "길 잃은 동물을 발견했어요" &&
          postSearchLists.map((item, index) => {
            return (
              <Card
                key={`missing-post-${index}`}
                item={item}
                page="catchdetail"
              ></Card>
            );
          })}
        {petwork.category === "우리집 반려동물을 찾아주세요" && (
          <div ref={missingRef}></div>
        )}
        {petwork.category === "길 잃은 동물을 발견했어요" && (
          <div ref={catchRef}></div>
        )}
      </ListCardContainer>
      <FloatingButton onClick={() => navigate("/map")}></FloatingButton>
    </Layout>
  );
};

const PetworkHeader = styled.div`
  position: relative;
  ${HeaderStyle}
  border: none;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  top: calc(50% - -2px);
  left: calc(100% - 85px);
  cursor: pointer;
`;

const HeaderImage = styled.img`
  margin-left: 24px;
  margin-bottom: 6.5px;
  width: 157px;
  height: 30px;
`;

const ListTitleWrapper = styled.div`
  ${FlexAttribute("row", "space-between", "center")}
  margin: 14px auto;
  width: 335px;
  ${(props) =>
    props.search &&
    css`
      animation: ${toDown} 1.25s ease-in-out;
    `}
`;

const ListTitle = styled.span`
  ${Title_700_18}
  padding-top: 2px;
`;

const ListCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 16px;
  justify-items: center;
  column-gap: 15px;
  width: 335px;
  margin: 0 auto;
`;

export default PetworkList;
