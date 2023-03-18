import React from "react";
import Layout from "../layouts/Layout";
import { FlexAttribute } from "../style/Mixin";
import styled from "styled-components";
import Button from "../elements/Button";

const ReportPosting = () => {
  return (
    <Layout>
      <LostContainer>
        <LostHeader>
          <HeadSpan>실종 글 작성하기</HeadSpan>
        </LostHeader>
        <LostHeaderBottom>
          <SecondSpan>강아지를 찾습니다</SecondSpan>
        </LostHeaderBottom>
        <ImageContainer />
        <MainContent>
          <div>실종</div>
          <div>푸들</div>
          <div>성</div>
          <div>중성화</div>
          <div>4살</div>
          <div>4.5kg</div>
          <div>갈색</div>
        </MainContent>
        <DetailContent>
          <div>실종정보</div>
          <div>위치</div>
          <div>실종위치</div>
          <div>특징</div>
          <div>메모</div>
          <div>사례금</div>
        </DetailContent>
        <BottomContent>
          <div>연락처</div>
          <Button TabBtn2 type="submit" form="ReportPosting" styled={{}}>
            포스터 저장하기
          </Button>
        </BottomContent>
      </LostContainer>
    </Layout>
  );
};

export default ReportPosting;

const LostContainer = styled.div`
  ${FlexAttribute("column")}
  width: 100%;
  background: white;
`;
const LostHeader = styled.div`
  ${FlexAttribute("row", "center")}
  width: 100%;
  height: 5rem;
  padding-top: 2.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  background-color: gray;
  border-bottom: 0.125rem solid #eeeeee;
`;
const LostHeaderBottom = styled.div`
  ${FlexAttribute("row", "center")}
  width: 100%;
  height: 4rem;
  padding-top: 2rem;
  font-size: 1.25rem;
  font-weight: 700;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: white;
  margin-top: -1rem;
  z-index: 1;
`;
const HeadSpan = styled.span`
  background-color: gray;
`;
const SecondSpan = styled.span``;

const ImageContainer = styled.image`
  width: 100%;
  height: 210px;
  background-color: #d1c3c3;
`;
const MainContent = styled.div`
  ${FlexAttribute("row", "center")}
  width: 100%;
  height: 4rem;
  padding-top: 2.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  border-bottom: 0.125rem solid #eeeeee;
`;
const DetailContent = styled.div`
  ${FlexAttribute("row", "center")}
  width: 100%;
  height: 210px;
  padding-top: 2.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  border-bottom: 0.125rem solid #eeeeee;
`;
const BottomContent = styled.div``;
