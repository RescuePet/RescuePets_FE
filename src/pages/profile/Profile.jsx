import React from "react";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import { HeaderStyle } from "../../style/Mixin";
import { Body_400_12, Title_700_18 } from "../../style/theme";
import ProfileSetList from "./components/ProfileSetList";
import UserInformation from "./components/UserInformation";

const Profile = () => {
  return (
    <Layout>
      <ProfileHeader>
        <HeaderTitle>My Page</HeaderTitle>
      </ProfileHeader>
      <UserInformation />
      <ProfileSetList />
      <Withdrawal>회원탈퇴</Withdrawal>
    </Layout>
  );
};

const ProfileHeader = styled.div`
  ${HeaderStyle}
`;

const HeaderTitle = styled.span`
  ${Title_700_18}
  margin-left: 25px;
`;

const Withdrawal = styled.button`
  margin: 0 auto;
  width: 335px;
  min-height: 68px;
  ${Body_400_12}
  color: #999999;
  text-decoration: underline;
`;

export default Profile;
