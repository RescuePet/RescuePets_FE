import React from "react";

import styled from "styled-components";
import { FlexAttribute, StateSpanStyle } from "../../../style/Mixin";
import { Body_400_14 } from "../../../style/theme";
import CardInfo from "./CardInfo";
import petworkRefineData from "../../../utils/petworkRefine";

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
          <CardInfo>{item.happenPlace}</CardInfo>
          <CardInfo>{item.happenDt}</CardInfo>
          <CardInfo>{refineData.information.join("/")}</CardInfo>
        </CardInfoWrapper>
      </CardInfoContainer>
    </ListCard>
  );
};

const ListCard = styled.div`
  width: 160px;
  height: 226px;
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
`;

const CardInfoWrapper = styled.div`
  ${FlexAttribute("column")}
`;

export default Card;
