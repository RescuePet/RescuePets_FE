import React from "react";

import styled from "styled-components";
import { FlexAttribute } from "../../../style/Mixin";
import { Body_400_14 } from "../../../style/theme";
import CardInfo from "./CardInfo";
import petworkRefineData from "../../../utils/petworkRefine";

import location from "../../../asset/location.svg";
import time from "../../../asset/time.svg";
import informationIcon from "../../../asset/information.svg";
import ClippingEmpty from "../../../asset/Clippingwhite.jsx";
import State from "../../../elements/State";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  __postCatchScrap,
  __postMissingScrap,
} from "../../../redux/modules/petworkSlice";
import ClippingFill from "../../../asset/profile/ClippingFill";

const Card = ({ item, page }) => {
  console.log(item);
  const refineData = petworkRefineData(item);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scrapHandler = (e) => {
    e.stopPropagation();
    console.log("petwork scrap");
    let payload = {
      page: "petworkLists",
      state: item.isWished,
      id: item.id,
    };
    if (page === "missingdetail") {
      console.log(page);
      dispatch(__postMissingScrap(payload));
    } else if (page === "sightingdetail") {
      console.log(page);
      dispatch(__postCatchScrap(payload));
    }
  };

  return (
    <ListCard onClick={() => navigate(`/${page}/${item.id}`)}>
      <CardImgWrapper imgae={item.postImages[0]?.imageURL}>
        <CardImg src={item.postImages[0]?.imageURL}></CardImg>
        <State category={"petworkKind"}>{refineData.upkind}</State>
        {item.isWished ? (
          <ScrapStateTrue onClick={scrapHandler} />
        ) : (
          <ScrapStateFalse onClick={scrapHandler} />
        )}
      </CardImgWrapper>
      <CardInfoContainer>
        <CardTitleWrapper>
          <CardTitle>{item.kindCd}</CardTitle>
          <img src={refineData.sexCd} alt="petworkSex" />
        </CardTitleWrapper>
        <CardInfoWrapper>
          <CardInfo svg={location}>{item.happenPlace}</CardInfo>
          <CardInfo svg={time}>{item.happenDt}</CardInfo>
          <CardInfo svg={informationIcon}>
            {refineData.information.join("/")}
          </CardInfo>
        </CardInfoWrapper>
      </CardInfoContainer>
    </ListCard>
  );
};

const ListCard = styled.div`
  width: 160px;
  height: 236px;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
`;

const CardImgWrapper = styled.div`
  position: relative;
  width: 160px;
  height: 120px;
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url(${(props) => props.imgae});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const CardImg = styled.img`
  width: 160px;
  height: 120px;
  object-fit: contain;
  backdrop-filter: blur(3px);
`;

const ScrapStateTrue = styled(ClippingFill)`
  position: absolute;
  top: 11px;
  right: 16px;
  z-index: 10;
  cursor: pointer;
  path {
    fill: ${(props) => props.theme.color.white};
  }
`;

const ScrapStateFalse = styled(ClippingEmpty)`
  position: absolute;
  top: 11px;
  right: 16px;
  z-index: 10;
  cursor: pointer;
`;

const CardInfoContainer = styled.div`
  padding: 10px 17px 16px 17px;
`;

const CardTitleWrapper = styled.div`
  ${FlexAttribute("row")}
`;

const CardTitle = styled.span`
  ${Body_400_14}
  line-height: 24px;
`;

const CardInfoWrapper = styled.div`
  ${FlexAttribute("column")}
  padding-bottom: 16px;
`;

export default Card;
