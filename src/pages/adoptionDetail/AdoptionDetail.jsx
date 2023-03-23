import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { __getAdoptionDetail } from "../../redux/modules/adoptioonSlice";

import styled from "styled-components";
import { FlexAttribute, PostBorderStyle } from "../../style/Mixin";

import Layout from "../../layouts/Layout";
import Shelter from "./components/Shelter";
import Location from "./components/Location";
import Title from "./components/Title";
import Footer from "../../layouts/Footer";

import backwhite from "../../asset/backwhite.svg";
import location from "../../asset/location.svg";
import calendar from "../../asset/calendar.svg";
import specialmark from "../../asset/specialmark.svg";
import user from "../../asset/user.svg";

const AdoptionDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getAdoptionDetail(id));
  }, []);
  const detailInfo = useSelector((state) => state.adoption);

  // 비동기처리 시 detailInfo가 없을 경우를 고려
  if (JSON.stringify(detailInfo.adiotionDetail) === "{}") {
    return <div>Loading...</div>;
  }

  const titleData = {
    state: detailInfo.adiotionDetail.processState,
    kindCd: detailInfo.adiotionDetail.refinedata.kindCd,
    sexCd: detailInfo.adiotionDetail.refinedata.sexCd,
    information: detailInfo.adiotionDetail.refinedata.information.join("/"),
  };

  const locationData = {
    careNm: detailInfo.adiotionDetail.careNm,
    careTel: detailInfo.adiotionDetail.careTel,
  };

  const shelterData = [
    {
      icon: location,
      option: "주소",
      data: detailInfo.adiotionDetail.careAddr,
    },
    {
      icon: calendar,
      option: "공고기간",
      data: [
        detailInfo.adiotionDetail.noticeSdt,
        detailInfo.adiotionDetail.noticeEdt,
      ].join("~"),
    },
    {
      icon: specialmark,
      option: "특이사항",
      data: detailInfo.adiotionDetail.specialMark,
    },
    {
      icon: user,
      option: "담당부서",
      data: [
        detailInfo.adiotionDetail.orgNm,
        detailInfo.adiotionDetail.officetel,
      ],
    },
  ];

  return (
    <Layout>
      <DetailContainer>
        <ImageContainer image={detailInfo.adiotionDetail.popfile}>
          <Image src={detailInfo.adiotionDetail.popfile} />
          <BackButton onClick={() => navigate(-1)}>
            <img src={backwhite} alt="back" />
          </BackButton>
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
      </DetailContainer>
      <Footer></Footer>
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
  /* transform: translate(20%, 100%); */
  z-index: 10;
  background-color: transparent;
  cursor: pointer;
`;

const ShelterContainer = styled.div`
  ${PostBorderStyle}
  padding-top: 16px;
`;

export default AdoptionDetail;
