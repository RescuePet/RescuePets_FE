import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Border_1_color, FlexAttribute } from "../../../style/Mixin";
import { Body_400_12, Button_700_16 } from "../../../style/theme";

import defaultProfile from "../../../asset/profile.svg";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import isLogin from "../../../utils/isLogin";
import { instance } from "../../../utils/api";

const UserInformation = () => {
  const [userInfo, setUserInfo] = useState({});
  const [myData, setMyData] = useState({});

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await instance.get("api/mypage");
      setMyData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLogin() === false) {
      navigate("/signin");
      return;
    }
    setUserInfo(JSON.parse(Cookies.get("UserInfo")));
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <UserInfoContainer>
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
          <CountSpan>
            {myData.postCount != null ? myData.postCount : 0}
          </CountSpan>
          <TitleSpan>작성 글</TitleSpan>
        </CountBox>
        <CountBox to="/profile/mycomment">
          <CountSpan>
            {myData.commentCount != null ? myData.commentCount : 0}
          </CountSpan>
          <TitleSpan>댓글</TitleSpan>
        </CountBox>
        <CountBox to="/profile/myscrap">
          <CountSpan>
            {myData.scrapCount != null ? myData.scrapCount : 0}
          </CountSpan>
          <TitleSpan>스크랩</TitleSpan>
        </CountBox>
      </UserActivityWrapper>
    </UserInfoContainer>
  );
};

const UserInfoContainer = styled.div`
  ${FlexAttribute("column", "center", "center")}
  padding: 2rem 0;
  ${Border_1_color}
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
