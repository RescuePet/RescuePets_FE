import React, { useCallback, useEffect } from "react";
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
  resetPetworkLists,
} from "../../redux/modules/petworkSlice";
import { useInView } from "react-intersection-observer";
import { useLocation, useNavigate } from "react-router-dom";
import petworkHeader from "../../asset/header/petworkheader.png";
import FloatingButton from "./components/FloatingButton";
import {
  __getPostSearch,
  completeSearch,
  resetSearchPage,
  setMemberPosition,
  setSearchValue,
  toggleDescriptionCategory,
  toggleKindCategory,
  togglePostSearchMode,
  togglePostSearchState,
} from "../../redux/modules/searchSlice";
import SearchCategory from "../../components/search/SearchCategory";
import Search from "../../asset/search";
import SearchSetting from "../../components/search/SearchSetting";
import { toDown } from "../../style/Animation";
import Error404 from "../../elements/Error404";
import ErrorPost from "../../asset/error/404post.png";

import {
  initAmplitude,
  logEvent,
  setAmplitudeUserId,
  resetAmplitude,
} from "../../utils/amplitude";
import isLogin from "../../utils/isLogin";

const PetworkList = () => {
  // 앰플리튜드
  const location = useLocation();
  useEffect(() => {
    initAmplitude();
    logEvent(`enter_${location.pathname}`);
    if (isLogin()) {
      setAmplitudeUserId();
    }
    return () => {
      resetAmplitude();
    };
  }, []);

  const [missingRef, missingInView] = useInView();
  const [catchRef, catchInView] = useInView();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    responseMessage,
    postSearchLists,
    searchValue,
    searchPostState,
    distanceState,
    postSearchMode,
    postType,
    longitude,
    latitude,
    searchPage,
    searchPostSetState,
    searchCategory,
    descriptionCategory,
  } = useSelector((state) => state.search);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
    const missingFirstPayload = {
      page: 1,
      size: 15,
    };
    const catchFirstPayload = {
      page: 1,
      size: 15,
    };
    dispatch(__getMissingPost(missingFirstPayload));
    dispatch(__getCatchPost(catchFirstPayload));
    return () => {
      dispatch(resetPetworkLists());
    };
  }, []);

  const onSuccess = useCallback((position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    dispatch(setMemberPosition({ lat: lat, lng: lng }));
  }, []);

  const onFailure = () => {
    console.log("위치 정보를 찾을수 없습니당.");
  };

  const petwork = useSelector((state) => state.petwork);

  const missingPayloadSettings = {
    page: petwork.missingPage,
    size: 15,
  };

  const catchPayloadSettings = {
    page: petwork.catchPage,
    size: 15,
  };

  const petworkSearchPayload = {
    page: searchPage,
    size: 15,
    longitude: longitude,
    latitude: latitude,
    description: descriptionCategory,
    searchKey: searchCategory,
    searchValue: searchValue,
    type: "post",
    postType: postType,
  };

  useEffect(() => {
    if (missingInView && !postSearchMode) {
      dispatch(addMissingPage());
      dispatch(__getMissingPost(missingPayloadSettings));
    }
    if (catchInView && !postSearchMode) {
      dispatch(addCatchPage());
      dispatch(__getCatchPost(catchPayloadSettings));
    }
    if ((missingInView || catchInView) && postSearchMode) {
      console.log("scroll page", searchPage);
      dispatch(__getPostSearch(petworkSearchPayload));
    }
  }, [missingInView, catchInView]);

  const searchPostHandler = (value) => {
    console.log(searchPage);
    const payload = {
      page: 1,
      size: 15,
      longitude: longitude,
      latitude: latitude,
      description: descriptionCategory,
      searchKey: searchCategory,
      searchValue: value,
      type: "post",
      postType: postType,
    };
    dispatch(togglePostSearchMode(true));
    dispatch(completeSearch());
    dispatch(__getPostSearch(payload)).then(() => dispatch(resetSearchPage()));
  };

  const searchDistanceHandler = (distance) => {
    if (distanceState) {
      const payload = {
        page: 1,
        size: 15,
        longitude: longitude,
        latitude: latitude,
        description: distance,
        searchKey: searchCategory,
        type: "post",
        postType: postType,
      };
      dispatch(togglePostSearchMode(true));
      dispatch(toggleDescriptionCategory(`search_distance_${distance}`));
      dispatch(toggleDescriptionCategory(distance));
      logEvent(distance);
      dispatch(completeSearch());

      dispatch(__getPostSearch(payload)).then(() =>
        dispatch(resetSearchPage())
      );
    } else {
      dispatch(toggleDescriptionCategory(distance));
    }
  };

  const searchKindHandler = (kindCategory) => {
    console.log(searchPage);
    const payload = {
      page: 1,
      size: 15,
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
    dispatch(togglePostSearchMode(true));
    dispatch(completeSearch());

    dispatch(__getPostSearch(payload)).then(() => dispatch(resetSearchPage()));
  };

  return (
    <Layout>
      <PetworkHeader>
        {searchPostState ? (
          <SearchCategory petwork />
        ) : (
          <>
            <HeaderImage src={petworkHeader}></HeaderImage>
            <SearchIcon
              width={30}
              height={30}
              onClick={() => dispatch(togglePostSearchState())}
            />
          </>
        )}
      </PetworkHeader>
      <Category></Category>

      {searchPostSetState && (
        <SearchSetting
          petwork
          searchHandler={searchPostHandler}
          searchKindHandler={searchKindHandler}
          searchDistanceHandler={searchDistanceHandler}
        />
      )}
      {searchPostSetState ? (
        <ListTitleWrapper search>
          <ListTitle>검색 내용</ListTitle>
        </ListTitleWrapper>
      ) : (
        <ListTitleWrapper>
          <ListTitle>{petwork.category}</ListTitle>
        </ListTitleWrapper>
      )}
      {responseMessage === "유기동물 검색 결과가 없습니다." &&
        postSearchLists.length === 0 && <Error404 srcUrl={ErrorPost} />}

      <ListCardContainer>
        {!searchPostSetState &&
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
        {searchPostSetState &&
          petwork.category === "우리집 반려동물을 찾아주세요" &&
          postSearchMode &&
          postSearchLists.map((item, index) => {
            return (
              <Card
                key={`missing-post-${index}`}
                item={item}
                page="missingdetail"
              ></Card>
            );
          })}
        {!searchPostSetState &&
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
        {searchPostSetState &&
          petwork.category === "길 잃은 동물을 발견했어요" &&
          postSearchMode &&
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
