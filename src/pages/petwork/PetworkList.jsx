import React from "react";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import { Title_700_18 } from "../../style/theme";
import { HeaderStyle, FlexAttribute } from "../../style/Mixin";
import Footer from "../../layouts/Footer";
import Card from "./components/Card";
import Category from "./components/Category";

const PetworkList = () => {
  return (
    <Layout>
      <PetworkLayout>
        <PetworkHeader>
          <HeaderTitle>Petwork</HeaderTitle>
        </PetworkHeader>
        <Category></Category>
        <ListContainer>
          <ListTitleWrapper>
            <ListTitle>우리집 반려동물을 찾아주세요</ListTitle>
            <RefreshButton></RefreshButton>
          </ListTitleWrapper>
          <ListCardContainer>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
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
