import React from "react";

import styled from "styled-components";
import { FlexAttribute, StateSpanStyle } from "../../../style/Mixin";
import { Body_400_14 } from "../../../style/theme";
import CardInfo from "./CardInfo";
import petworkRefineData from "../../../utils/petworkRefine";

import location from "../../../asset/location.svg";
import time from "../../../asset/time.svg";
import informationIcon from "../../../asset/information.svg";

const Card = ({ item }) => {
  const refineData = petworkRefineData(item);
  return (
    <ListCard>
      <CardImgWrapper>
        <CardImg src={item.postImages[0]?.imageURL}></CardImg>
        <StateSpan>{refineData.upkind}</StateSpan>
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
`;

const CardImgWrapper = styled.div`
  position: relative;
`;

const CardImg = styled.img`
  width: 160px;
  height: 120px;
`;

const StateSpan = styled.span`
  ${StateSpanStyle}
  position: absolute;
  top: 16px;
  left: 16px;
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
