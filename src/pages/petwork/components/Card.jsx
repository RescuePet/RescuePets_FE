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
  // console.log(item);
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
    } else if (page === "catchdetail") {
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
  width: 10rem;
  height: 14.75rem;
  border: 0.0625rem solid #eeeeee;
  border-radius: 0.25rem;
  overflow: hidden;
  cursor: pointer;
  :hover {
    border: 0.0625rem solid ${(props) => props.theme.color.primary_normal};
    box-shadow: 0px 1px ${(props) => props.theme.color.primary_normal};
    transform: translate(0px, -1px);
    transition: 0.3s;
  }
  :active {
    border: 0.0625rem solid ${(props) => props.theme.color.primary_heavy};
    transform: translate(0px, 1px);
    box-shadow: none;
    transition: 0.3s;
  }
`;

const CardImgWrapper = styled.div`
  position: relative;
  width: 10rem;
  height: 7.5rem;
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
  width: 10rem;
  height: 7.5rem;
  object-fit: contain;
  backdrop-filter: blur(0.1875rem);
`;

const ScrapStateTrue = styled(ClippingFill)`
  position: absolute;
  top: 0.6875rem;
  right: 1rem;
  z-index: 10;
  cursor: pointer;
  path {
    fill: ${(props) => props.theme.color.primary_normal};
  }
`;

const ScrapStateFalse = styled(ClippingEmpty)`
  position: absolute;
  top: 0.6875rem;
  right: 1rem;
  z-index: 10;
  cursor: pointer;
  path {
    fill: ${(props) => props.theme.color.primary_normal};
  }
`;

const CardInfoContainer = styled.div`
  padding: 0.625rem 1.0625rem 1rem 1.0625rem;
  :active {
    background-color: ${(props) => props.theme.color.line_alternative};
  }
`;

const CardTitleWrapper = styled.div`
  ${FlexAttribute("row")}
`;

const CardTitle = styled.span`
  ${Body_400_14}
  line-height: 1.5rem;
`;

const CardInfoWrapper = styled.div`
  ${FlexAttribute("column")}
  padding-bottom: 1rem;
`;

export default Card;
