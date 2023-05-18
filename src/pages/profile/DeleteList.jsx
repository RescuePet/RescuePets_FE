import React, { useEffect } from "react";
import Layout from "../../layouts/Layout";
import ProfileHeader from "./components/ProfileHeader";
import styled from "styled-components";
import { FlexAttribute } from "../../style/Mixin";
import PostList from "./components/PostList";
import { useDispatch, useSelector } from "react-redux";
import { __getSoftDeleteList } from "../../redux/modules/petworkSlice";

const DeleteList = () => {
  const dispatch = useDispatch();
  const { softDeleteList } = useSelector((state) => state.petwork);

  useEffect(() => {
    const payload = {
      page: 1,
      size: 100,
    };
    dispatch(__getSoftDeleteList(payload));
  }, []);

  // console.log(softDeleteList);

  return (
    <Layout>
      <ProfileHeader>임시 삭제 게시물</ProfileHeader>
      <ListContainer>
        {softDeleteList.map((item) => {
          return (
            <PostList key={`deletelist-item-${item.id}`} item={item}></PostList>
          );
        })}
      </ListContainer>
    </Layout>
  );
};

const ListContainer = styled.div`
  ${FlexAttribute("column", "", "center")};
`;

export default DeleteList;
