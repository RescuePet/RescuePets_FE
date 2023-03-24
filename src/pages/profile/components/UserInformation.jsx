import React from "react";
import styled from "styled-components";
import { Border_1_color, FlexAttribute } from "../../../style/Mixin";
import { Body_400_12, Button_700_16 } from "../../../style/theme";

import defaultProfile from "../../../asset/profile.svg";

const UserInformation = () => {
  return (
    <UserInfoContainer>
      <UserImage src={defaultProfile}></UserImage>
      <UserName>펫벤져스</UserName>
      <UserEmail>rescuepets@naver.com</UserEmail>
      <UserActivityWrapper>
        <CountBox>
          <CountSpan>11</CountSpan>
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
  padding: 32px 0;
  ${Border_1_color}
`;

const UserImage = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 14px;
`;

const UserName = styled.span`
  ${Button_700_16}
  margin-bottom: 4px;
`;

const UserEmail = styled.span`
  ${Body_400_12}
  margin-bottom: 24px;
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
  font-size: 24px;
  line-height: 24px;
`;

const TitleSpan = styled.span`
  ${Body_400_12};
  color: #666666;
`;

export default UserInformation;
