import React, { useEffect } from "react";
import styled from "styled-components";
import { FlexAttribute, PostBorderStyle } from "../../../style/Mixin";
import ClippingFill from "../../../asset/profile/ClippingFill";
import Comment from "../../../asset/Comment";
import { useDispatch } from "react-redux";
import {
  resetCommentInput,
  toggleCommentInput,
} from "../../../redux/modules/petworkSlice";
import Cookies from "js-cookie";

const PostInformation = ({ postInfo }) => {
  const dispatch = useDispatch();
  const { memberRole } = JSON.parse(Cookies.get("UserInfo"));

  useEffect(() => {
    return () => {
      dispatch(resetCommentInput());
    };
  }, []);

  return (
    <PostInfoWrapper>
      <InfoBox
        onClick={() => {
          if (memberRole === "BAD_MEMBER") {
            alert("BAD_MEMBER는 댓글을 작성할 수 없습니다.");
            return;
          }
          dispatch(toggleCommentInput());
        }}
      >
        <Comment />
        <span>댓글 달기</span>
        &nbsp;
        <span>{postInfo.commentCount}</span>
      </InfoBox>
      <InfoBox onClick={postInfo.scrapHandler}>
        <ClippingFill />
        <span>스크랩</span>
        &nbsp;
        <span>{postInfo.scrapCount}</span>
      </InfoBox>
    </PostInfoWrapper>
  );
};

const PostInfoWrapper = styled.div`
  position: sticky;
  top: 0;
  ${FlexAttribute("row", "space-evenly")}
  width: 100%;
  height: 2.5rem;
  padding-top: 1rem;
  background-color: transparent;
  z-index: 10;
  backdrop-filter: blur(10px);
  ${PostBorderStyle}
`;

const InfoBox = styled.div`
  ${FlexAttribute("row", "", "center")}
  width: 90px;
  cursor: pointer;
  img {
    width: 1.5rem;
    height: 1.5rem;
  }
  span {
    ${(props) => props.theme.Body_400_12};
    color: ${(props) => props.theme.color.text_alternative};
    line-height: 1.5rem;
    white-space: nowrap;
  }
  :hover {
    span {
      color: ${(props) => props.theme.color.primary_strong};
    }
    path {
      fill: ${(props) => props.theme.color.primary_strong};
    }
    path.white {
      fill: ${(props) => props.theme.color.white};
    }
  }
  :active {
    span {
      color: ${(props) => props.theme.color.primary_heavy};
    }
    path {
      fill: ${(props) => props.theme.color.primary_heavy};
    }
    path.white {
      fill: ${(props) => props.theme.color.white};
    }
  }
`;

export default PostInformation;
