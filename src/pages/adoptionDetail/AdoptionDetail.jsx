import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getAdoptionDetail } from "../../redux/modules/adoptioonSlice";
import Layout from "../../layouts/Layout";
import styled from "styled-components";
import { FlexAttribute, StateSpanStyle } from "../../style/Mixin";
import { useNavigate } from "react-router-dom";

const AdoptionDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getAdoptionDetail(id));
  }, []);

  const detailInfo = useSelector((state) => state.adoption.adiotionDetail);

  // 비동기처리 시 detailInfo가 없을 경우를 고려
  if (detailInfo.adoption.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <DetailContainer>
        <ImageContainer>
          <Image src={detailInfo.popfile} />
          <BackButton onClick={() => navigate(-1)}>backbutton</BackButton>
        </ImageContainer>
        <InformationContainer>
          <TitleWrapper>
            <State>{detailInfo.refinedata.kind}</State>
            <TitleInformation>{detailInfo.refinedata.kindCd}</TitleInformation>
            <SexCd>{detailInfo.refinedata.sexCd}</SexCd>
            <Information>
              {detailInfo.refinedata.information.join("/")}
            </Information>
          </TitleWrapper>
          <ShelterInformationContainer>
            <TitleWrapper>
              <TitleInformation>보호 정보</TitleInformation>
            </TitleWrapper>
            <MapBox></MapBox>
          </ShelterInformationContainer>
        </InformationContainer>
      </DetailContainer>
    </Layout>
  );
};

const DetailContainer = styled.div`
  ${FlexAttribute("column")}
  width: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  background-color: #d9d9d9;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const BackButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(20%, 100%);
  z-index: 10;
  background-color: transparent;
  cursor: pointer;
`;

const InformationContainer = styled.div`
  span {
    margin-left: 10px;
  }
`;

const TitleWrapper = styled.div`
  ${FlexAttribute("row", "center", "center")};
  padding: 16px;
  border-bottom: 2px solid #eeeeee;
`;

const TitleInformation = styled.span`
  font-size: 14px;
  font-weight: 400;
`;

const State = styled.span`
  ${StateSpanStyle}
  font-size: 10px;
`;

const SexCd = styled.span``;

const Information = styled.span`
  font-size: 12px;
  color: #666666;
`;

const ShelterInformationContainer = styled.div`
  padding: 18px 0 0 16px;
  border-bottom: 1px solid #eeeeee;
`;

const MapBox = styled.div`
  width: 335px;
  height: 112px;
  background-color: black;
`;

export default AdoptionDetail;
