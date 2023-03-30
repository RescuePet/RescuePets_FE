import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import { HeaderStyle } from "../../style/Mixin";
import { Body_400_12 } from "../../style/theme";
import ProfileSetList from "./components/ProfileSetList";
import UserInformation from "./components/UserInformation";
import { useNavigate } from 'react-router-dom';
import profileHeader from "./../../asset/header/profileheader.png";
import hamburger from "../../asset/hamburger.png"
import Cookies from 'js-cookie';
import { useModalState } from "../../hooks/useModalState";
// import { HamburgerModal } from "./components/Modal";
import { useDispatch, useSelector } from 'react-redux';
import { __SignoutUser } from '../../redux/modules/signSlice';
import { CheckModal } from "../../elements/Modal";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [loginModal, toggleModal] = useModalState(false);
  const [menubar, setmenubar] = useState(false)

  // DB에 저장된 리프레시 토큰 삭제하기 위해서 ? 

  // const onClickMenuBarHandler = () => {
  //   setmenubar(!menubar)
  // }

  // useEffect(() => {
  //   if (menubar === true) {
  //     toggleModal()
  //   }
  // }, [menubar])
  // console.log(menubar)


  const [Msg, setMsg] = useState('');


  const onClickLogoutHandler = () => {
    dispatch(__SignoutUser())
    toggleModal()
  }



  const SignoutMsg = useSelector((state) => {
    return state.users?.Signoutmessage;
  })

  useEffect(() => {
    if (SignoutMsg === "LOGOUT_SUCCESS") {
      setMsg('✅ 로그아웃 성공')
      setTimeout(function () {
        localStorage.removeItem("userInfo");
        Cookies.remove('Token')
        Cookies.remove('Refresh')
        console.log("로그아웃성공")
        setMsg('')
        navigate('/')
      }, 1000);
    } else {
      setMsg('서버오류')
    }
  }, [SignoutMsg])


  // 로그
  return (
    <Layout>
      <ProfileHeader>
        <HeaderImage> <img src={profileHeader} /></HeaderImage>
        <HeaderHamburgermenu><img src={hamburger}
        //  onClick={onClickMenuBarHandler} 
        /></HeaderHamburgermenu>
      </ProfileHeader>
      <UserInformation />
      <ProfileSetList />
      <Withdrawal onClick={onClickLogoutHandler}>로그아웃</Withdrawal>
      {Msg == '' ? null : (
        <CheckModal
          isOpen={loginModal}
          toggle={toggleModal}
          onClose={toggleModal}>
          {Msg}
        </CheckModal>

      )
      }
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
