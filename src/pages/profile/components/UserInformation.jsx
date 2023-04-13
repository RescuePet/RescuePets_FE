import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Border_1_color, FlexAttribute } from "../../../style/Mixin";
import { Body_400_12, Button_700_16 } from "../../../style/theme";

import defaultProfile from "../../../asset/profile.svg";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import isLogin from "../../../utils/isLogin";
import { useDispatch, useSelector } from "react-redux";
import {
  __getMyInfo,
  resetProfileState,
} from "../../../redux/modules/profileSlice";

import managerImage from "../../../asset/userGrade/manager.png";
import memberImage from "../../../asset/userGrade/member.png";
import banImage from "../../../asset/userGrade/ban.png";

const UserInformation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const { myData } = useSelector((state) => state.profile);
  const { memberRole } = JSON.parse(Cookies.get("UserInfo"));

  useEffect(() => {
    if (isLogin() === false) {
      navigate("/signin");
      return;
    }
    setUserInfo(JSON.parse(Cookies.get("UserInfo")));
  }, [navigate]);

  useEffect(() => {
    dispatch(__getMyInfo());
    return () => {
      dispatch(resetProfileState());
    };
  }, []);

  const userGradeRender = () => {
    switch (memberRole) {
      case "MANAGER":
        return <UserGradeImage src={managerImage} />;
      case "MEMBER":
        return <UserGradeImage src={memberImage} />;
      case "BAD_MEMBER":
        return <UserGradeImage src={banImage} />;
      default:
        return null;
    }
  };

  return (
    <UserInfoContainer>
      {userGradeRender()}
      <UserImage
        src={
          userInfo.profileImage !== null
            ? userInfo.profileImage
            : defaultProfile
        }
      ></UserImage>
      <UserName>{userInfo.nickname}</UserName>
      <UserEmail>{userInfo.email}</UserEmail>
      <UserActivityWrapper>
        <CountBox to="/profile/mypost">
          <CountSpan>{myData.postCount}</CountSpan>
          <TitleSpan>작성 글</TitleSpan>
        </CountBox>
        <CountBox to="/profile/mycomment">
          <CountSpan>{myData.commentCount}</CountSpan>
          <TitleSpan>댓글</TitleSpan>
        </CountBox>
        <CountBox to="/profile/myscrap">
          <CountSpan>{myData.scrapCount}</CountSpan>
          <TitleSpan>스크랩</TitleSpan>
        </CountBox>
      </UserActivityWrapper>
    </UserInfoContainer>
  );
};

const UserInfoContainer = styled.div`
  position: relative;
  ${FlexAttribute("column", "center", "center")}
  padding: 2rem 0;
  ${Border_1_color}
`;

const UserGradeImage = styled.img`
  position: absolute;
  bottom: calc(100% - 49px);
`;

const UserImage = styled.img`
  width: 5rem;
  height: 5rem;
  margin-bottom: 0.875rem;
  border-radius: 50%;
  background-color: tran;
  object-fit: cover;
`;

const UserName = styled.span`
  ${Button_700_16}
  margin-bottom: .25rem;
`;

const UserEmail = styled.span`
  ${Body_400_12}
  margin-bottom: 1.5rem;
  color: #999999;
`;

const UserActivityWrapper = styled.div`
  ${FlexAttribute("row", "space-evenly")}
  width: 100%;
`;

const CountBox = styled(Link)`
  ${FlexAttribute("column", "center", "center")}
`;

const CountSpan = styled.span`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.5rem;
`;

const TitleSpan = styled.span`
  ${Body_400_12};
  color: #666666;
`;

export default UserInformation;
