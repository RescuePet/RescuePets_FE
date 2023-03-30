import React, { useEffect } from "react";
import styled from "styled-components";
import { Border_1_color, FlexAttribute } from "../../../style/Mixin";
import { Body_400_12, Button_700_16 } from "../../../style/theme";

import defaultProfile from "../../../asset/profile.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  __getMyCatchPost,
  __getMyMissingPost,
} from "../../../redux/modules/profileSlice";

const UserInformation = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const disapatch = useDispatch();

  const missingPayload = {
    page: 1,
    size: 1000,
  };

  const catchPayload = {
    page: 1,
    size: 1000,
  };

  useEffect(() => {
    disapatch(__getMyMissingPost(missingPayload));
    disapatch(__getMyCatchPost(catchPayload));
  }, []);

  const { myMissing, myCatch } = useSelector((state) => state.profile);

  // console.log("myMissing", myMissing);
  // console.log("myCatch", myCatch);

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
        <CountBox>
          <CountSpan>{myMissing.length + myCatch.length}</CountSpan>
          <TitleSpan>작성 글</TitleSpan>
        </CountBox>
        <CountBox>
          <CountSpan>11</CountSpan>
          <TitleSpan>댓글</TitleSpan>
        </CountBox>
        <CountBox>
          <CountSpan>11</CountSpan>
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

const CountBox = styled.div`
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
