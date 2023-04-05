import React, { useState } from "react";
import styled from "styled-components";
import State from "../../../elements/State";
import { FlexAttribute } from "../../../style/Mixin";

import ClippingFill from "../../../asset/profile/ClippingFill";
import Clippingwhite from "../../../asset/Clippingwhite";
import male from "../../../asset/male.svg";
import female from "../../../asset/female.svg";
import questionmark from "../../../asset/questionmark.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __postAdoptionListScrap } from "../../../redux/modules/adoptionSlice";
import {
  __postCatchScrap,
  __postMissingScrap,
} from "../../../redux/modules/petworkSlice";

const ScrapList = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scrapState, setScrapState] = useState(true);

  const refineDataHandler = () => {
    let refineData = {
      ...item,
      category: null,
      URL: null,
    };
    if (item.postType === "petInfo") {
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
    return refineData;
  };

  const refineData = refineDataHandler();

  const scrapHandler = (e, state) => {
    e.stopPropagation();
    setScrapState((prev) => !prev);
    if (state === "petInfo") {
      publicScrap();
    } else if (state === "실종") {
      missingScrap();
    } else if (state === "목격") {
      catchScrap();
    }
  };

  const publicScrap = async () => {
    let data = {
      page: "home",
      desertionNo: refineData.postId,
      state: scrapState,
    };
    dispatch(__postAdoptionListScrap(data));
  };

  const missingScrap = async () => {
    let data = {
      id: refineData.postId,
      page: "petworkLists",
      state: scrapState,
    };
    dispatch(__postMissingScrap(data));
  };

  const catchScrap = async () => {
    let data = {
      id: refineData.postId,
      page: "petworkLists",
      state: scrapState,
    };
    dispatch(__postCatchScrap(data));
  };

  return (
    <ListContainer
      onClick={() => navigate(`/${refineData.URL}/${item.postId}`)}
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
  :hover {
    transform: translate(0px, -1px);
    box-shadow: 0px 1px ${(props) => props.theme.color.primary_strong};
    transition: 0.3s;
  }
  :active {
    background-color: ${(props) => props.theme.color.background_tertiary};
    transform: translate(0px, 1px);
    box-shadow: none;
    border-bottom: 1px solid ${(props) => props.theme.color.primary_strong};
    transition: 0.3s;
  }
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
