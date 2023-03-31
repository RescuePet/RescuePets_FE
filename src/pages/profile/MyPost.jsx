import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import { FlexAttribute, HeaderStyle } from "../../style/Mixin";
import PostList from "./components/PostList";
import {
  addMyPostPage,
  __getMyCatchPost,
  __getMyMissingPost,
} from "../../redux/modules/profileSlice";
import { useInView } from "react-intersection-observer";

const MyPost = () => {
  const dispatch = useDispatch();
  const [ref, inView] = useInView();

  const { entirePostList, entirePostPage } = useSelector(
    (state) => state.profile
  );

  console.log(entirePostList);

  let payload = {
    page: entirePostPage,
    size: 5,
  };

  useEffect(() => {
    if (inView) {
      dispatch(addMyPostPage());
      dispatch(__getMyMissingPost(payload));
      dispatch(__getMyCatchPost(payload));
    }
  }, [inView]);

  return (
    <Layout>
      <MyPostHeader>
        <h2>작성 글 목록</h2>
      </MyPostHeader>
      <PostInfoContainer>
        <PostInfoWrapper>
          <div>
            <EntireTitle>총 작성 글</EntireTitle>
            <EntireCount>{entirePostList.length}</EntireCount>
          </div>
          {/* <EditButton>편집</EditButton> */}
        </PostInfoWrapper>
      </PostInfoContainer>
      <ListContainer>
        {entirePostList.map((item) => {
          return (
            <PostList key={`my-post-item-${item.id}`} item={item}></PostList>
          );
        })}
        <div ref={ref}></div>
      </ListContainer>
    </Layout>
  );
};

const MyPostHeader = styled.div`
  ${FlexAttribute("row", "center")}
  ${HeaderStyle}
  h2 {
    ${(props) => props.theme.Body_500_16};
    color: ${(props) => props.theme.color.text_normal};
  }
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

const EditButton = styled.button`
  ${(props) => props.theme.Body_400_12};
  color: ${(props) => props.theme.color.text_alternative};
`;

const PostInfoWrapper = styled.div`
  ${FlexAttribute("row", "space-between", "center")}
  margin: 8px 20px;
`;

const ListContainer = styled.div`
  ${FlexAttribute("column", "", "center")}
`;

export default MyPost;
