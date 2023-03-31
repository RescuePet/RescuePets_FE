import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import { FlexAttribute, HeaderStyle } from "../../style/Mixin";
import { Body_400_12 } from "../../style/theme";
import ProfileSetList from "./components/ProfileSetList";
import UserInformation from "./components/UserInformation";
import { useNavigate } from "react-router-dom";
import profileHeader from "./../../asset/header/profileheader.png";
import setting from "../../asset/profile/setting.svg";
import Cookies from "js-cookie";
import { useModalState } from "../../hooks/useModalState";
// import { HamburgerModal } from "./components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { __SignoutUser } from "../../redux/modules/signSlice";
import { CheckModal } from "../../elements/Modal";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginModal, toggleModal] = useModalState(false);

  const MoveToSettingHandler = () => {
    navigate("/editinfo");
  };

  // // useEffect(() => {
  // //   if (menubar === true) {
  // //     toggleModal()
  // //   }
  // // }, [menubar])
  // // console.log(menubar)

  const [Msg, setMsg] = useState("");

  const onClickLogoutHandler = () => {
    dispatch(__SignoutUser());
    toggleModal();
  };

  const SignoutMsg = useSelector((state) => {
    return state.users?.Signoutmessage;
  });

  useEffect(() => {
    if (SignoutMsg === "LOGOUT_SUCCESS") {
      setMsg("✅ 로그아웃 성공");
      setTimeout(() => {
        Cookies.remove("Token");
        Cookies.remove("Refresh");
        Cookies.remove("UserInfo");
        console.log("로그아웃성공");
        setMsg("");
        navigate("/signin");
      }, 1000);
    } else {
      setMsg("서버오류");
    }
  }, [SignoutMsg]);

  // 로그
  return (
    <Layout>
      <ProfileHeader>
        <HeaderImage>
          {" "}
          <img src={profileHeader} />
        </HeaderImage>
        <HeaderHamburgermenu>
          <img src={setting} onClick={MoveToSettingHandler} />
        </HeaderHamburgermenu>
      </ProfileHeader>
      <UserInformation />
      <ProfileSetList />
      <Withdrawal onClick={onClickLogoutHandler}>로그아웃</Withdrawal>
      {Msg == "" ? null : (
        <CheckModal
          isOpen={loginModal}
          toggle={toggleModal}
          onClose={toggleModal}
        >
          {Msg}
        </CheckModal>
      )}
    </Layout>
  );
};

const ProfileHeader = styled.div`
  ${HeaderStyle}
  ${FlexAttribute("row", "space-between", "center")}
`;

const HeaderImage = styled.div`
  margin-left: 18px;
  width: 50%;
  height: 100%;

  > img {
    height: 1.875rem;
  }
`;

const HeaderHamburgermenu = styled.div`
  cursor: pointer;
  > img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 20px;
  }
`;

const Withdrawal = styled.button`
  margin: 0 auto;
  width: 20.9375rem;
  min-height: 4.25rem;
  ${Body_400_12}
  color: #999999;
  text-decoration: underline;
`;

export default Profile;
