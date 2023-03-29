import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  __getAdoptionDetail,
  __postAdoptionListScrap,
} from "../../redux/modules/adoptionSlice";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import Shelter from "./components/Shelter";
import Location from "./components/Location";
import Title from "./components/Title";

import backwhite from "../../asset/backwhite.svg";
import location from "../../asset/location.svg";
import calendar from "../../asset/calendar.svg";
import specialmark from "../../asset/specialmark.svg";
import user from "../../asset/user.svg";
import Clippingwhite from "../../asset/Clippingwhite";
import { FlexAttribute, PostBorderStyle } from "../../style/Mixin";
import AdoptionInformation from "./components/AdoptionInformation";
import Button from "../../elements/Button";
import ClippingFill from "../../asset/profile/ClippingFill";

const AdoptionDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getAdoptionDetail(id));
  }, []);
  const { adoptionDetail } = useSelector((state) => state?.adoption);
  console.log(adoptionDetail);
  // 비동기처리 시 detailInfo가 없을 경우를 고려
  if (JSON.stringify(adoptionDetail) === "{}") {
    return <div>Loading...</div>;
  }

  const titleData = {
    state: adoptionDetail.processState,
    kindCd: adoptionDetail.refinedata.kindCd,
    sexCd: adoptionDetail.refinedata.sexCd,
    information: adoptionDetail.ageWeightNeuterYnColorCd,
  };

  const locationData = {
    address: adoptionDetail.careAddr,
    careNm: adoptionDetail.careNm,
    careTel: adoptionDetail.careTel,
  };

  const shelterData = [
    {
      icon: location,
      option: "주소",
      data: adoptionDetail.careAddr,
    },
    {
      icon: calendar,
      option: "공고기간",
      data: adoptionDetail.noticeDate,
    },
    {
      icon: specialmark,
      option: "특이사항",
      data: adoptionDetail.specialMark,
    },
    {
      icon: user,
      option: "담당부서",
      data: [adoptionDetail.orgNm, adoptionDetail.officetel],
    },
  ];

  const adoptionInfoData = {
    inquiryCount: adoptionDetail.inquiryCount,
    scrapCount: adoptionDetail.scrapCount,
  };

  const scrapHandler = () => {
    let payload = {
      page: "adoptiondetail",
      state: adoptionDetail.isScrap,
      desertionNo: adoptionDetail.desertionNo,
    };
    dispatch(__postAdoptionListScrap(payload));
  };

  return (
    <Layout>
      <ImageContainer image={adoptionDetail.popfile}>
        <Image src={adoptionDetail.popfile} />
        <BackButton onClick={() => navigate(-1)}>
          <img src={backwhite} alt="back" />
        </BackButton>
        {adoptionDetail.isScrap ? (
          <ScrapStateTrue onClick={scrapHandler} />
        ) : (
          <ScrapStateFalse onClick={scrapHandler} />
        )}
      </ImageContainer>
      <div>
        <Title titleData={titleData}></Title>
        <Location locationData={locationData}></Location>
        <ShelterContainer>
          {shelterData.map((item, index) => {
            return (
              <Shelter key={`shelter-item-${index}`} item={item}></Shelter>
            );
          })}
        </ShelterContainer>
      </div>
      <AdoptionInformation
        adoptionInfoData={adoptionInfoData}
      ></AdoptionInformation>
      <ButtonWrapper>
        <Button fillButton>문의하기</Button>
      </ButtonWrapper>
    </Layout>
  );
};

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: cover;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  backdrop-filter: blur(2px);
`;

const BackButton = styled.div`
  position: absolute;
  top: 26px;
  left: 20px;
  z-index: 10;
  cursor: pointer;
`;

const ScrapStateFalse = styled(Clippingwhite)`
  position: absolute;
  top: 26px;
  right: 20px;
  z-index: 10;
  cursor: pointer;
`;

const ScrapStateTrue = styled(ClippingFill)`
  position: absolute;
  top: 26px;
  right: 20px;
  z-index: 10;
  cursor: pointer;
  path {
    fill: ${(props) => props.theme.color.white};
  }
`;

const ShelterContainer = styled.div`
  ${PostBorderStyle}
  padding-top: 16px;
`;

const ButtonWrapper = styled.div`
  ${FlexAttribute("row", "center", "center")}
  margin-top: 24px;
`;

export default AdoptionDetail;
