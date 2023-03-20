import React from "react";
import styled from "styled-components";
import { FlexAttribute, StateSpanStyle } from "../../../style/Mixin";
import { Body_400_14 } from "../../../style/theme";
import CardInfo from "./CardInfo";

const Card = () => {
  return (
    <ListCard>
      <CardImgWrapper>
        <CardImg></CardImg>
        <StateSpan>강아지</StateSpan>
      </CardImgWrapper>
      <CardInfoContainer>
        <CardTitleWrapper>
          <CardTitle>러시안 블루</CardTitle>
          <SexSvg></SexSvg>
        </CardTitleWrapper>
        <CardInfoWrapper>
          <CardInfo></CardInfo>
          <CardInfo></CardInfo>
          <CardInfo></CardInfo>
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
  background-color: #999999;
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

const SexSvg = styled.div`
  width: 16px;
  height: 16px;
  margin-left: 8px;
  background-color: red;
`;

const CardInfoWrapper = styled.div`
  ${FlexAttribute("column")}
`;

export default Card;
