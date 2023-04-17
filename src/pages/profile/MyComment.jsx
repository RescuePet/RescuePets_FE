import React, { useEffect } from "react";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import { FlexAttribute, HeaderStyle } from "../../style/Mixin";
import CommentList from "./components/CommentList";
import ProfileHeader from "./components/ProfileHeader";

import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  __getMyComment,
  __getMyInfo,
  resetProfileState,
} from "../../redux/modules/profileSlice";
import { useInView } from "react-intersection-observer";
import Error404 from "../../elements/Error404";
import ErrorComment from "../../asset/error/404comment.png";

import {
  initAmplitude,
  logEvent,
  setAmplitudeUserId,
  resetAmplitude,
} from "../../utils/amplitude";
import isLogin from "../../utils/isLogin";

const MyComment = () => {
  // 앰플리튜드
  const location = useLocation();
  useEffect(() => {
    initAmplitude();
    logEvent(`enter_${location.pathname}`);
    if (isLogin()) {
      setAmplitudeUserId();
    }
    return () => {
      resetAmplitude();
    };
  }, []);

  const dispatch = useDispatch();
  const [ref, inView] = useInView();

  const { myCommentList, myCommentPage, myData } = useSelector(
    (state) => state.profile
  );

  const payload = {
    page: myCommentPage,
    size: 15,
  };

  useEffect(() => {
    dispatch(__getMyInfo());
    return () => {
      dispatch(resetProfileState());
    };
  }, []);

  useEffect(() => {
    if (inView) {
      dispatch(__getMyComment(payload));
    }
  }, [inView]);

  return (
    <Layout>
      <ProfileHeader>댓글 목록</ProfileHeader>
      <PostInfoContainer>
        <PostInfoWrapper>
          <div>
            <EntireTitle>총 댓글</EntireTitle>
            <EntireCount>{myData.commentCount}</EntireCount>
          </div>
        </PostInfoWrapper>
      </PostInfoContainer>
      <ListContainer>
        {myCommentList.length === 0 ? (
          <Error404 srcUrl={ErrorComment} />
        ) : (
          myCommentList.map((item) => {
            return (
              <CommentList
                key={`comment-item-${item.id}`}
                item={item}
              ></CommentList>
            );
          })
        )}
        <div ref={ref}></div>
      </ListContainer>
    </Layout>
  );
};

const MyCommentHeader = styled.div`
  position: relative;
  ${FlexAttribute("row", "center")};
  ${HeaderStyle}
  h2 {
    ${(props) => props.theme.Body_500_16};
    color: ${(props) => props.theme.color.text_normal};
    line-height: 1.5rem;
    margin-bottom: 16px;
  }
`;

const CloseSvg = styled.img`
  position: absolute;
  right: 1.25rem;
  cursor: pointer;
`;

const PostInfoContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.color.input_border}; ;
`;

const EntireTitle = styled.span`
  ${(props) => props.theme.Body_400_12};
`;

const EntireCount = styled.span`
  margin-left: 8px;
  ${(props) => props.theme.Body_500_12};
  color: ${(props) => props.theme.color.primary_normal};
`;

const PostInfoWrapper = styled.div`
  ${FlexAttribute("row", "space-between", "center")}
  margin: 8px 20px;
`;

const ListContainer = styled.div`
  ${FlexAttribute("column", "", "center")}
`;

export default MyComment;
