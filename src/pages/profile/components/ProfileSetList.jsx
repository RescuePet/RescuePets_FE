import React from "react";
import styled from "styled-components";
import { Border_1_color, FlexAttribute } from "../../../style/Mixin";
import { Body_500_14 } from "../../../style/theme";

const ProfileSetList = () => {
  return (
    <ProfileSetListsContainer>
      <ListBox>
        <Svg></Svg>
        <List>작성 글 목록</List>
        <ArrowSvg>&gt;</ArrowSvg>
      </ListBox>
      <ListBox>
        <Svg></Svg>
        <List>스크랩 목록</List>
        <ArrowSvg>&gt;</ArrowSvg>
      </ListBox>
      <ListBox>
        <Svg></Svg>
        <List>신고관리</List>
        <ArrowSvg>&gt;</ArrowSvg>
      </ListBox>
      <ListBox>
        <Svg></Svg>
        <List>고객센터</List>
        <ArrowSvg>&gt;</ArrowSvg>
      </ListBox>
    </ProfileSetListsContainer>
  );
};

const ProfileSetListsContainer = styled.div`
  ${FlexAttribute("column", "center", "center")};
  width: 100%;
`;

const ListBox = styled.div`
  ${FlexAttribute("row", "space-between", "center")}
  width: 335px;
  height: 68px;
  ${Border_1_color}
`;

const Svg = styled.div`
  width: 16px;
  height: 16px;
  background-color: #999999;
`;

const List = styled.span`
  ${Body_500_14}
  flex-basis: 289px;
`;

const ArrowSvg = styled.div`
  color: #666666;
`;

export default ProfileSetList;
