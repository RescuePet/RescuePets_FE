import React, { useEffect } from "react";
import styled from "styled-components";
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
import { Link } from "react-router-dom";
import petworkHeader from "../../asset/header/petworkheader.png";
import refresh from "../../asset/refresh.svg";

const PetworkList = () => {
  const [missingRef, missingInView] = useInView();
  const [catchRef, catchInView] = useInView();
  const dispatch = useDispatch();
  const petwork = useSelector((state) => state.petwork);
  const missingPayloadSettings = {
    page: petwork.missingPage,
    size: 10,
  };
  const catchPayloadSettings = {
    page: petwork.catchPage,
    size: 10,
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
  }, [missingInView, catchInView]);

  return (
    <Layout>
      <PetworkHeader>
        <HeaderImage src={petworkHeader}></HeaderImage>
      </PetworkHeader>
      <Category></Category>
      <ListContainer>
        <ListTitleWrapper>
          <ListTitle>{petwork.category}</ListTitle>
          <RefreshButton src={refresh}></RefreshButton>
        </ListTitleWrapper>
        <ListCardContainer>
          {petwork.category === "우리집 반려동물을 찾아주세요"
            ? petwork?.missingPostLists?.map((item, index) => {
                return (
                  <Link
                    key={`missing-post-${index}`}
                    to={`/missingdetail/${item.id}`}
                  >
                    <Card item={item}></Card>
                  </Link>
                );
              })
            : petwork?.catchPostLists?.map((item, index) => {
                return (
                  <Link
                    key={`catch-post-${index}`}
                    to={`/sightingdetail/${item.id}`}
                  >
                    <Card item={item}></Card>
                  </Link>
                );
              })}
          {petwork.category === "우리집 반려동물을 찾아주세요" ? (
            <div ref={missingRef}></div>
          ) : (
            <div ref={catchRef}></div>
          )}
        </ListCardContainer>
      </ListContainer>
    </Layout>
  );
};

const PetworkHeader = styled.div`
  ${HeaderStyle}
  border: none;
`;

const HeaderImage = styled.img`
  width: 157px;
  height: 30px;
`;

const ListContainer = styled.div`
  padding-bottom: 76px;
`;

const ListTitleWrapper = styled.div`
  ${FlexAttribute("row", "space-between", "center")}
  margin: 14px auto;
  width: 335px;
`;

const ListTitle = styled.span`
  ${Title_700_18}
  padding-top: 2px;
`;

const RefreshButton = styled.img``;

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
