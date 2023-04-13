import React, { useEffect } from "react";
import Layout from "../../layouts/Layout";
import ProfileHeader from "./components/ProfileHeader";
import { useDispatch, useSelector } from "react-redux";
import { __getUserList } from "../../redux/modules/profileSlice";
import styled from "styled-components";
import { FlexAttribute } from "../../style/Mixin";
import UserList from "./components/UserList";

const UserGrade = () => {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.profile);

  useEffect(() => {
    const payload = {
      page: 1,
      size: 100,
    };
    dispatch(__getUserList(payload));
  }, [userList]);

  console.log(userList);

  return (
    <Layout>
      <ProfileHeader>사용자 등급 관리</ProfileHeader>
      <ListContainer>
        {userList.map((item) => {
          return <UserList key={`userlist-${item.id}`} item={item}></UserList>;
        })}
      </ListContainer>
    </Layout>
  );
};

const ListContainer = styled.div`
  ${FlexAttribute("column", "", "center")}
`;

export default UserGrade;
