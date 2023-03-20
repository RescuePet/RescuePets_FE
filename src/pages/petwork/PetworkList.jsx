import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import { Title_700_18 } from "../../style/theme";
import { HeaderStyle, FlexAttribute } from "../../style/Mixin";
import Footer from "../../layouts/Footer";
import Card from "./components/Card";
import Category from "./components/Category";
import { useDispatch, useSelector } from "react-redux";
import {
  __getCatchPost,
  __getMissingPost,
} from "../../redux/modules/petworkSlice";
import { useInView } from "react-intersection-observer";

const PetworkList = () => {
  const [missingRef, missingInView] = useInView();
  const [catchRef, catchInView] = useInView();
  const dispatch = useDispatch();
  const petwork = useSelector((state) => state.petwork);
  const [missingPage, setMissingPage] = useState(1);
  const [catchPage, setCatchPage] = useState(1);
  const missingPayloadSettings = {
    page: missingPage,
    size: 5,
  };
  const catchPayloadSettings = {
    page: catchPage,
    size: 5,
  };
  useEffect(() => {
    if (missingInView) {
      setMissingPage((prev) => prev + 1);
      dispatch(__getMissingPost(missingPayloadSettings));
    }
    if (catchInView) {
      setCatchPage((prev) => prev + 1);
      dispatch(__getCatchPost(catchPayloadSettings));
    }
  }, [missingInView, catchInView]);

  console.log("console petwork", petwork);

  return (
    <Layout>
      <PetworkLayout>
        <PetworkHeader>
          <HeaderTitle>Petwork</HeaderTitle>
        </PetworkHeader>
        <Category></Category>
        <ListContainer>
          <ListTitleWrapper>
            <ListTitle>{petwork.category}</ListTitle>
            <RefreshButton></RefreshButton>
          </ListTitleWrapper>
          <ListCardContainer>
            {petwork.category === "우리집 반려동물을 찾아주세요"
              ? petwork?.missingPostLists?.map((item, index) => {
                  return (
                    <Card key={`missing-post-${index}`} item={item}></Card>
                  );
                })
              : petwork?.catchPostLists?.map((item, index) => {
                  return <Card key={`catch-post-${index}`} item={item}></Card>;
                })}
            {petwork.category === "우리집 반려동물을 찾아주세요" ? (
              <div ref={missingRef}></div>
            ) : (
              <div ref={catchRef}></div>
            )}
          </ListCardContainer>
        </ListContainer>
        <Footer></Footer>
      </PetworkLayout>
    </Layout>
  );
};

const PetworkLayout = styled.div`
  ${FlexAttribute("column")}
  width: 100%;
  background-color: #ffffff;
`;

const PetworkHeader = styled.div`
  ${HeaderStyle}
  border: none;
`;

const HeaderTitle = styled.span`
  ${Title_700_18}
  margin-left: 25px;
`;

const ListContainer = styled.div``;

const ListTitleWrapper = styled.div`
  ${FlexAttribute("row", "space-between", "center")}
  margin: 14px auto;
  width: 335px;
`;

const ListTitle = styled.span`
  ${Title_700_18}
  padding-top: 2px;
`;

const RefreshButton = styled.img`
  width: 14px;
  height: 14px;
  background-color: #999999;
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
