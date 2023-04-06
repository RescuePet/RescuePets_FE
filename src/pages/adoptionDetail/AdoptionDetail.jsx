import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  __getAdoptionDetail,
  __postAdoptionInquiry,
  __postAdoptionListScrap,
} from "../../redux/modules/adoptionSlice";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import Shelter from "./components/Shelter";
import Location from "./components/Location";
import Title from "./components/Title";

import location from "../../asset/location.svg";
import calendar from "../../asset/calendar.svg";
import specialmark from "../../asset/specialmark.svg";
import user from "../../asset/user.svg";
import information from "../../asset/information.svg";
import Clippingwhite from "../../asset/Clippingwhite";
import {
  ButtonBackgroundStyle,
  FlexAttribute,
  PostBorderStyle,
} from "../../style/Mixin";
import AdoptionInformation from "./components/AdoptionInformation";
import Button from "../../elements/Button";
import ClippingFill from "../../asset/profile/ClippingFill";
import ScrollToTop from "../../elements/ScrollToTop";
import { Spinner } from "../../components/Spinner";
import Backwhite from "../../asset/Backwhite";

const AdoptionDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getAdoptionDetail(id));
  }, []);
  const { adoptionDetail } = useSelector((state) => state?.adoption);

  console.log("data", adoptionDetail);

  // 비동기처리 시 detailInfo가 없을 경우를 고려
  if (JSON.stringify(adoptionDetail) === "{}") {
    return <Spinner />;
  }

  console.log(adoptionDetail);

  let titleData = {
    process: adoptionDetail.processState,
    processState: adoptionDetail.state,
    kindCd: adoptionDetail.refinedata.kindCd,
    sexCd: adoptionDetail.refinedata.sexCd,
    information: adoptionDetail.ageWeightNeuterYnColorCd,
  };

  if (adoptionDetail.refinedata.process) {
    titleData.processState = adoptionDetail.refinedata.processState;
    titleData.process = adoptionDetail.refinedata.process;
  }

  const rescueLocationData = {
    type: "구조정보",
    map: "map1",
    address: adoptionDetail.happenPlace,
    careNm: null,
    careTel: null,
  };

  const shelterLocationData = {
    type: "보호정보",
    map: "map2",
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
      icon: information,
      option: "공고번호",
      data: adoptionDetail.noticeNo,
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

  const inquiryHandler = () => {
    if (!adoptionDetail.isInquiry) {
      console.log("inquiry success");
      dispatch(__postAdoptionInquiry(adoptionDetail.desertionNo));
    }
    window.location.href = `tel:${adoptionDetail.careTel}`;
  };

  return (
    <Layout>
      <ScrollToTop />
      <ImageContainer image={adoptionDetail.popfile}>
        <Image src={adoptionDetail.popfile} />
        <BackButton onClick={() => navigate(-1)} />
        {adoptionDetail.isScrap ? (
          <ScrapStateTrue onClick={scrapHandler} />
        ) : (
          <ScrapStateFalse onClick={scrapHandler} />
        )}
        <ProcessBox>
          <span>{titleData.processState}</span>
        </ProcessBox>
      </ImageContainer>
      <div>
        <Title titleData={titleData}></Title>
        <Location locationData={rescueLocationData}></Location>
        <Location locationData={shelterLocationData}></Location>
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
        {adoptionDetail.state !== "종료" ? (
          <Button fillButton onClick={inquiryHandler}>
            문의하기
          </Button>
        ) : (
          <Button assistiveFillButton>문의하기</Button>
        )}
      </ButtonWrapper>
    </Layout>
  );
};

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 15rem;
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: cover;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  backdrop-filter: blur(0.125rem);
`;

const BackButton = styled(Backwhite)`
  position: absolute;
  top: 1.625rem;
  left: 1.25rem;
  z-index: 10;
  cursor: pointer;
  ${ButtonBackgroundStyle}
  path {
    fill: ${(props) => props.theme.color.primary_normal};
  }
`;

const ScrapStateFalse = styled(Clippingwhite)`
  position: absolute;
  top: 1.625rem;
  right: 1.25rem;
  z-index: 10;
  cursor: pointer;
  ${ButtonBackgroundStyle}
  path {
    fill: ${(props) => props.theme.color.primary_normal};
  }
`;

const ScrapStateTrue = styled(ClippingFill)`
  position: absolute;
  top: 1.625rem;
  right: 1.25rem;
  z-index: 10;
  cursor: pointer;
  ${ButtonBackgroundStyle}
  path {
    fill: ${(props) => props.theme.color.primary_normal};
  }
`;

const ProcessBox = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 0.375rem 0;
  background-color: RGB(23, 23, 23, 0.5);
  text-align: center;
  ${(props) => props.theme.Body_500_16};
  span {
    color: ${(props) => props.theme.color.white};
  }
`;

const ShelterContainer = styled.div`
  ${PostBorderStyle}
`;

const ButtonWrapper = styled.div`
  ${FlexAttribute("row", "center", "center")}
  margin-top: 1.5rem;
`;

export default AdoptionDetail;
