import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import { FlexAttribute, HeaderStyle } from "../../style/Mixin";
import { Body_400_12 } from "../../style/theme";
import ProfileSetList from "./components/ProfileSetList";
import UserInformation from "./components/UserInformation";
import { useNavigate } from "react-router-dom";
import profileHeader from "./../../asset/header/profileheader.png";
import Setting from "../../asset/profile/Setting";
import Cookies from "js-cookie";
import { useModalState } from "../../hooks/useModalState";
import { useDispatch } from "react-redux";
import { __SignoutUser } from "../../redux/modules/signSlice";
import { CheckModal } from "../../elements/Modal";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginModal, toggleModal] = useModalState(false);

  const MoveToSettingHandler = () => {
    navigate("/editinfo");
  };

  const [Msg, setMsg] = useState("");

  const onClickLogoutHandler = () => {
    toggleModal();
    dispatch(__SignoutUser()).then((response) => {
      if (response.payload === "LOGOUT_SUCCESS") {
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
        setMsg("로그아웃 실패!");
      }
    });
  };

  // 로그
  return (
    <Layout>
      <ProfileHeader>
        <HeaderImage>
          <img src={profileHeader} alt="proflieheader" />
        </HeaderImage>
        <HeaderHamburgermenu>
          <Setting onClick={MoveToSettingHandler} />
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
  padding-left: 1.25rem;
  padding-right: 1.25rem;
`;

const HeaderImage = styled.div`
  width: 50%;
  height: 100%;
  > img {
    height: 1.875rem;
  }
`;

const HeaderHamburgermenu = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: right;

  > svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 20px;
    cursor: pointer;
  }
`;

const Withdrawal = styled.button`
  margin: 0 auto;
  width: 20.9375rem;
  min-height: 4.25rem;
  ${Body_400_12}
  color: ${(props) => props.theme.color.text_alternative};
  text-decoration: underline;
  :hover {
    transform: translate(0px, -1px);
    background-color: ${(props) => props.theme.color.line_alternative};
    transition: 0.3s;
    color: ${(props) => props.theme.color.status_caution};
  }
  :active {
    background-color: ${(props) => props.theme.color.line_alternative};
    color: ${(props) => props.theme.color.status_caution};
    transform: translate(0px, 1px);
    box-shadow: none;
    transition: 0.3s;
  }
`;

export default Profile;
