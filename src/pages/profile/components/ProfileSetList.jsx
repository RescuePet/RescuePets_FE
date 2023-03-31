import React from "react";
import styled from "styled-components";
import { Border_1_color, FlexAttribute } from "../../../style/Mixin";
import { Body_500_14 } from "../../../style/theme";

import memo from "../../../asset/memo.svg";
import setting from "../../../asset/profile/setting.svg";
import headphone from "../../../asset/profile/headphone.svg";
import Reportcatch from "../../../asset/Reportcatch";
import ClippingFill from "../../../asset/profile/ClippingFill";
import comment from "../../../asset/comment.svg";
import { useNavigate } from "react-router-dom";

const ProfileSetList = () => {
  const navigate = useNavigate();

  return (
    <ProfileSetListsContainer>
      <ListBox onClick={() => navigate("/profile/mypost")}>
        <img src={memo} alt="my_post" />
        <List>작성 글 목록</List>
        <ArrowSvg>&gt;</ArrowSvg>
      </ListBox>
      <ListBox onClick={() => alert("준비중 입니다.")}>
        <img src={comment} alt="my_post" />
        <List>댓글 목록</List>
        <ArrowSvg>&gt;</ArrowSvg>
      </ListBox>
      <ListBox onClick={() => alert("준비중 입니다.")}>
        <ClippingFill />
        <List>스크랩 목록</List>
        <ArrowSvg>&gt;</ArrowSvg>
      </ListBox>
      <ListBox onClick={() => alert("준비중 입니다.")}>
        <ReportSvg></ReportSvg>
        <List>신고관리</List>
        <ArrowSvg>&gt;</ArrowSvg>
      </ListBox>
      <ListBox onClick={() => alert("준비중 입니다.")}>
        <img src={setting} alt="setting" />
        <List>App 설정</List>
        <ArrowSvg>&gt;</ArrowSvg>
      </ListBox>
      <ListBox onClick={() => alert("준비 중 입니다.")}>
        <img src={headphone} alt="service_center" />
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
  width: 20.9375rem;
  height: 4.25rem;
  ${Border_1_color}
  cursor: pointer;
`;

const ReportSvg = styled(Reportcatch)`
  path {
    fill: ${(props) => props.theme.color.text_alternative};
  }
`;

const List = styled.span`
  ${Body_500_14}
  flex-basis: 18.0625rem;
`;

const ArrowSvg = styled.div`
  color: #666666;
`;

export default ProfileSetList;
