import React from "react";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import { HeaderStyle } from "../../style/Mixin";
import { Body_400_12 } from "../../style/theme";
import ProfileSetList from "./components/ProfileSetList";
import UserInformation from "./components/UserInformation";
import profileHeader from "./../../asset/header/profileheader.png";

const Profile = () => {
  return (
    <Layout>
      <ProfileHeader>
        <HeaderImage src={profileHeader} />
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

const HeaderImage = styled.img`
  width: 140px;
  height: 30px;
  margin-left: 18px;
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
