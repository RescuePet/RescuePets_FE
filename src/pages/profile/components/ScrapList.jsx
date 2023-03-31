import React, { useState } from "react";
import styled from "styled-components";
import State from "../../../elements/State";
import { FlexAttribute } from "../../../style/Mixin";
import { color } from "../../../style/theme";

import ClippingFill from "../../../asset/profile/ClippingFill";
import Clippingwhite from "../../../asset/Clippingwhite";
import male from "../../../asset/male.svg";
import female from "../../../asset/female.svg";
import questionmark from "../../../asset/questionmark.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { instance } from "../../../utils/api";

const ScrapList = ({ item }) => {
  const navigate = useNavigate();

  const [scrapState, setScrapState] = useState(true);

  const refineDataHandler = () => {
    let refineData = {
      ...item,
      category: null,
      URL: null,
    };
    if (item.postType === "publicPet") {
      refineData.kindCd = item.kindCd.split(/\[|\]/g)[2];
      refineData.category = "adoptionDetail";
      refineData.state = item.postType;
      refineData.URL = "adoptiondetail";
    } else if (item.state === "실종") {
      refineData.category = item.state;
      refineData.URL = "missingdetail";
    } else if (item.state === "목격") {
      refineData.category = item.state;
      refineData.URL = "sightingdetail";
    }
    if (item.sexCd === "SEX_MALE" || item.sexCd === "M") {
      refineData.sexCd = male;
    } else if (item.sexCd === "SEX_FEMALE" || item.sexCd === "F") {
      refineData.sexCd = female;
    } else if (item.sexCd === "SEX_UNKNOWN" || item.sexCd === "Q") {
      refineData.sexCd = questionmark;
    }
    if (item.postType === "petMissing" || item.postType === "petCatch") {
      refineData.filename = item.postImages[0].imageURL;
      refineData.desertionNo = item.postId;
    }
    return refineData;
  };

  const refineData = refineDataHandler();

  const scrapHandler = (e, state) => {
    e.stopPropagation();
    setScrapState((prev) => !prev);
    if (state === "publickPet") {
      publicScrap();
    } else if (state === "실종") {
      missingScrap();
    } else if (state === "목격") {
      catchScrap();
    }
  };

  const publicScrap = async () => {
    console.log("공공");
    if (scrapState) {
      const response = await instance.delete(
        `/api/scrap/scrap/${refineData.desertionNo}`
      );
      console.log(response);
    } else {
      const response = await instance.post(
        `/api/scrap/scrap/${refineData.desertionNo}`
      );
      console.log(response);
    }
  };

  const missingScrap = async () => {
    if (scrapState) {
      console.log("실종");
      const response = await instance.delete(
        `/api/scrap/missing/${refineData.desertionNo}`
      );
      console.log(response);
    } else {
      console.log("실종");
      const response = await instance.post(
        `/api/scrap/missing/${refineData.desertionNo}`
      );
      console.log(response);
    }
  };

  const catchScrap = async () => {
    console.log("목격");
    if (scrapState) {
      const response = await instance.delete(
        `/api/scrap/catch/${refineData.desertionNo}`
      );
      console.log(response);
    } else {
      const response = await instance.post(
        `/api/scrap/catch/${refineData.desertionNo}`
      );
      console.log(response);
    }
  };

  return (
    <ListContainer
      onClick={() => navigate(`/${refineData.URL}/${refineData.desertionNo}`)}
    >
      <Image src={refineData.filename} />
      <div>
        <ListTitleWrapper>
          <State category={refineData.category}>{item.state}</State>
          <Title>{refineData.kindCd}</Title>
          <SexCd src={refineData.sexCd} />
        </ListTitleWrapper>
        <AdditionalInfoWrapper>
          <span>{refineData.author}</span>
          <span>{refineData.happenDt}</span>
        </AdditionalInfoWrapper>
      </div>
      {scrapState ? (
        <ScrapTrue onClick={(e) => scrapHandler(e, refineData.state)} />
      ) : (
        <ScrapFalse onClick={(e) => scrapHandler(e, refineData.state)} />
      )}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  position: relative;
  ${FlexAttribute("row", "", "center")}
  width: 335px;
  padding: 16px 0;
  border-bottom: 1px solid ${(props) => props.theme.color.input_border};
  cursor: pointer;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
`;

const ListTitleWrapper = styled.div`
  ${FlexAttribute("row", "", "center")}
  margin-left: 16px;
`;

const Title = styled.span`
  margin: 0 10px;
  ${(props) => props.theme.Body_500_14};
  white-space: nowrap;
`;

const SexCd = styled.img`
  margin-right: 10px;
`;

const AdditionalInfoWrapper = styled.div`
  margin-top: 2px;
  margin-left: 16px;
  span {
    :not(:first-child) {
      margin-left: 8px;
    }
    ${(props) => props.theme.Body_400_10};
    color: ${(props) => props.theme.color.text_assistive};
  }
`;

const ScrapTrue = styled(ClippingFill)`
  position: absolute;
  z-index: 10;
  top: calc(50% - 12px);
  right: 8px;
  width: 24px;
  height: 24px;
  path {
    fill: ${(props) => props.theme.color.primary_normal};
  }
`;

const ScrapFalse = styled(Clippingwhite)`
  position: absolute;
  z-index: 10;
  top: calc(50% - 12px);
  right: 8px;
  width: 24px;
  height: 24px;
  path {
    fill: ${(props) => props.theme.color.primary_normal};
  }
`;

export default ScrapList;
