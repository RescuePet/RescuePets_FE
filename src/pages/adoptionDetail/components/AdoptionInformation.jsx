import React from "react";
import styled from "styled-components";
import { FlexAttribute, PostBorderStyle } from "../../../style/Mixin";
import scrap from "../../../asset/profile/clipping.svg";
import inquiry from "../../../asset/inquiry.svg";

const AdoptionInformation = () => {
  return (
    <PostInfoWrapper>
      <InfoBox>
        <img src={inquiry} alt="postComment" />
        <span>문의</span>
        <span>0</span>
      </InfoBox>
      <InfoBox>
        <img src={scrap} alt="postScrap" />
        <span>북마크</span>
        <span>0</span>
      </InfoBox>
    </PostInfoWrapper>
  );
};

const PostInfoWrapper = styled.div`
  ${FlexAttribute("row", "space-evenly")}
  width: 100%;
  height: 40px;
  padding-top: 16px;
  ${PostBorderStyle}
`;

const InfoBox = styled.div`
  ${FlexAttribute("row", "space-around", "center")}
  width: 80px;
  img {
    width: 24px;
    height: 24px;
  }
  span {
    ${(props) => props.theme.Body_400_12};
    color: ${(props) => props.theme.color.text_alternative};
    line-height: 24px;
  }
`;

export default AdoptionInformation;
