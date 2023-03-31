import React from "react";
import styled from "styled-components";
import Layout from "../../layouts/Layout";

const MyComment = () => {
  return (
    <Layout>
      <MyPostHeader>작성 글 목록</MyPostHeader>
      <MyPostContainer>
        <PostInfoWrapper></PostInfoWrapper>
        <ListContainer></ListContainer>
      </MyPostContainer>
    </Layout>
  );
};

const MyPostHeader = styled.div``;

const MyPostContainer = styled.div``;

const PostInfoWrapper = styled.div``;

const ListContainer = styled.div``;

export default MyComment;
