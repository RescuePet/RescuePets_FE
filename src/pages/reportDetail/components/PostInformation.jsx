import React from "react";
import styled from "styled-components";
import { FlexAttribute, PostBorderStyle } from "../../../style/Mixin";
import ClippingFill from "../../../asset/profile/ClippingFill";
import commentIcon from "../../../asset/comment.svg";

const PostInformation = ({ comment }) => {
  return (
    <PostInfoWrapper>
      <InfoBox>
        <img src={commentIcon} alt="postComment" />
        <span>댓글</span>
        <span>{comment}</span>
      </InfoBox>
      <InfoBox>
        <ClippingFill />
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

export default PostInformation;
