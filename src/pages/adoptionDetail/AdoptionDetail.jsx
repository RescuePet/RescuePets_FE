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

const AdoptionDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getAdoptionDetail(id));
  }, []);
  const detailInfo = useSelector((state) => state.adoption);
  console.log(detailInfo)
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
    address: detailInfo.adiotionDetail.careAddr,
    careNm: detailInfo.adiotionDetail.careNm,
    careTel: detailInfo.adiotionDetail.careTel,
  };

  const shelterData = [
    { option: "주소", data: detailInfo.adiotionDetail.careAddr },
    {
      option: "공고기간",
      data: [
        detailInfo.adiotionDetail.noticeSdt,
        detailInfo.adiotionDetail.noticeEdt,
      ].join("~"),
    },
    { option: "특이사항", data: detailInfo.adiotionDetail.specialMark },
    {
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
        <ImageContainer>
          <Image src={detailInfo.adiotionDetail.popfile} />
          <BackButton onClick={() => navigate(-1)}>backbutton</BackButton>
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

const ShelterContainer = styled.div`
  ${PostBorderStyle}
`;

export default AdoptionDetail;
