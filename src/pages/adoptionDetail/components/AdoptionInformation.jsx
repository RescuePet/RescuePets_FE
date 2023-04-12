import React from "react";
import styled from "styled-components";
import { FlexAttribute, PostBorderStyle } from "../../../style/Mixin";
import ClippingFill from "../../../asset/profile/ClippingFill";
import inquiry from "../../../asset/inquiry.svg";

const AdoptionInformation = ({ adoptionInfoData }) => {
  return (
    <PostInfoWrapper>
      <InfoBox>
        <img src={inquiry} alt="postComment" />
        <span>문의</span>
        <span>{adoptionInfoData.inquiryCount}</span>
      </InfoBox>
      <InfoBox>
        <ClippingFill />
        <span>스크랩</span>
        <span>{adoptionInfoData.scrapCount}</span>
      </InfoBox>
    </PostInfoWrapper>
  );
};

const PostInfoWrapper = styled.div`
  ${FlexAttribute("row", "space-evenly")}
  width: 100%;
  height: 2.5rem;
  padding-top: 1rem;
  ${PostBorderStyle}
`;

const InfoBox = styled.div`
  ${FlexAttribute("row", "space-around", "center")}
  width: 5rem;
  img {
    width: 1.5rem;
    height: 1.5rem;
  }
  span {
    ${(props) => props.theme.Body_400_12};
    color: ${(props) => props.theme.color.text_alternative};
    line-height: 1.5rem;
  }
`;

export default AdoptionInformation;
