import React from "react";
import Layout from "../../layouts/Layout";
import ProfileHeader from "./components/ProfileHeader";
import styled from "styled-components";
import { FlexAttribute } from "../../style/Mixin";
import PostList from "./components/PostList";
import { useSelector } from "react-redux";

const DeleteList = () => {
  const { softDeleteList } = useSelector((state) => state.petwork);

  return (
    <Layout>
      <ProfileHeader>임시 삭제 게시물</ProfileHeader>
      <ListContainer>{/* <PostList></PostList> */}</ListContainer>
    </Layout>
  );
};

const ListContainer = styled.div`
  ${FlexAttribute("column", "", "center")};
`;

export default DeleteList;
