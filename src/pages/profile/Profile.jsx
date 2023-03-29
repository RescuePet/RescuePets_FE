import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import { HeaderStyle } from "../../style/Mixin";
import { Body_400_12 } from "../../style/theme";
import ProfileSetList from "./components/ProfileSetList";
import UserInformation from "./components/UserInformation";
import profileHeader from "./../../asset/header/profileheader.png";
import hamburger from "../../asset/hamburger.png"
import { useModalState } from "../../hooks/useModalState";
import { HamburgerModal } from "./components/Modal";


const Profile = () => {
  const [loginModal, toggleModal] = useModalState(false);
  const [menubar, setmenubar] = useState(false)

  // DB에 저장된 리프레시 토큰 삭제하기 위해서 ? 

  const onClickMenuBarHandler = () => {
    setmenubar(!menubar)
  }


  useEffect(() => {
    if (menubar === true) {
      toggleModal()
    }
  }, [menubar])
  console.log(menubar)
  // 로그
  return (
    <Layout>
      <ProfileHeader>
        <HeaderImage> <img src={profileHeader} /></HeaderImage>
        <HeaderHamburgermenu><img src={hamburger} onClick={onClickMenuBarHandler} /></HeaderHamburgermenu>
      </ProfileHeader>
      <UserInformation />
      <ProfileSetList />
      <Withdrawal>회원탈퇴</Withdrawal>
      <HamburgerModal
        isOpen={loginModal}
        toggle={toggleModal}
        onClose={toggleModal} />
    </Layout>
  );
};

const ProfileHeader = styled.div`
  ${HeaderStyle}
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-left: 18px;
`;

const HeaderImage = styled.div`
   margin-left: 18px;
   width: 50%;
   height: 100%;
   > img {
    width: 8.75rem;
    height: 1.875rem;
   }
`;


const HeaderHamburgermenu = styled.div`
  margin-left: 7.5rem;
    >img {
    width: 1.5rem;
    height: 1.5rem;
  }
`

const Withdrawal = styled.button`
  margin: 0 auto;
  width: 335px;
  min-height: 68px;
  ${Body_400_12}
  color: #999999;
  text-decoration: underline;
`;

export default Profile;
