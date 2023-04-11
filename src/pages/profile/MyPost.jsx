import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import { FlexAttribute, HeaderStyle } from "../../style/Mixin";
import PostList from "./components/PostList";
import {
  __getMyInfo,
  __getMyPost,
  addMyPostPage,
  resetProfileState,
} from "../../redux/modules/profileSlice";
import { useInView } from "react-intersection-observer";
import { useLocation, useNavigate } from "react-router-dom";
import close from "../../asset/Close.svg";
import Error404 from "../../elements/Error404";
import ErrorPost from "../../asset/error/404post.png";

import {
  initAmplitude,
  logEvent,
  setAmplitudeUserId,
  resetAmplitude,
} from "../../utils/amplitude";

const MyPost = () => {
  // 앰플리튜드
  const location = useLocation();
  useEffect(() => {
    initAmplitude();
    logEvent(`/${location.pathname}`);
    setAmplitudeUserId();
    return () => {
      resetAmplitude();
    };
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ref, inView] = useInView();

  const { myPostList, myPostPage, myData } = useSelector(
    (state) => state.profile
  );

  let payload = {
    page: myPostPage,
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
      dispatch(addMyPostPage());
      dispatch(__getMyPost(payload));
    }
  }, [inView]);

  return (
    <>
      <Layout>
        <MyPostHeader>
          <h2>작성 글 목록</h2>
          <CloseSvg src={close} onClick={() => navigate("/profile")} />
        </MyPostHeader>
        <PostInfoContainer>
          <PostInfoWrapper>
            <div>
              <EntireTitle>총 작성 글</EntireTitle>
              <EntireCount>{myData.postCount}</EntireCount>
            </div>
          </PostInfoWrapper>
        </PostInfoContainer>
        <ListContainer>
          {myPostList.length === 0 ? (
            <Error404 srcUrl={ErrorPost} />
          ) : (
            myPostList.map((item) => {
              return (
                <PostList
                  key={`my-post-item-${item.id}`}
                  item={item}
                ></PostList>
              );
            })
          )}
          <div ref={ref}></div>
        </ListContainer>
      </Layout>
    </>
  );
};

const MyPostHeader = styled.div`
  position: relative;
  ${FlexAttribute("row", "center")};
  ${HeaderStyle};
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
  border-bottom: 0.0625rem solid ${(props) => props.theme.color.input_border}; ;
`;

const EntireTitle = styled.span`
  ${(props) => props.theme.Body_400_12};
`;

const EntireCount = styled.span`
  margin-left: 0.5rem;
  ${(props) => props.theme.Body_500_12};
  color: ${(props) => props.theme.color.primary_normal};
`;

const PostInfoWrapper = styled.div`
  ${FlexAttribute("row", "space-between", "center")}
  margin: .5rem 1.25rem;
`;

const ListContainer = styled.div`
  ${FlexAttribute("column", "", "center")}
`;

export default MyPost;
