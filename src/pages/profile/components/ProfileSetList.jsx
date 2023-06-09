import React from "react";
import styled from "styled-components";
import { Border_1_color, FlexAttribute } from "../../../style/Mixin";
import { Body_500_14 } from "../../../style/theme";

import User from "../../../asset/User";
import Headphone from "../../../asset/profile/Headphone";
import Reportcatch from "../../../asset/Reportcatch";
import ClippingFill from "../../../asset/profile/ClippingFill";

import { useNavigate } from "react-router-dom";
import Memo from "../../../asset/Memo";
import Comment from "../../../asset/Comment";
import Cookies from "js-cookie";
import Trash from "../../../asset/Trash";

const ProfileSetList = () => {
  const navigate = useNavigate();
  const { memberRole } = JSON.parse(Cookies.get("UserInfo"));

  return (
    <ProfileSetListsContainer>
      <ListBox onClick={() => navigate("/profile/mypost")}>
        <Memo />
        <List>작성 글 목록</List>
        <ArrowSvg>&gt;</ArrowSvg>
      </ListBox>
      <ListBox onClick={() => navigate("/profile/mycomment")}>
        <Comment />
        <List>댓글 목록</List>
        <ArrowSvg>&gt;</ArrowSvg>
      </ListBox>
      <ListBox onClick={() => navigate("/profile/myscrap")}>
        <ClippingFill />
        <List>스크랩 목록</List>
        <ArrowSvg>&gt;</ArrowSvg>
      </ListBox>
      {(memberRole === "ADMIN" || memberRole === "MANAGER") && (
        <ListBox onClick={() => navigate("/profile/usergrade")}>
          <User />
          <List>사용자 등급 관리</List>
          <ArrowSvg>&gt;</ArrowSvg>
        </ListBox>
      )}
      {(memberRole === "ADMIN" || memberRole === "MANAGER") && (
        <ListBox onClick={() => navigate("/profile/deletelists")}>
          <Trash />
          <List>임시 삭제 게시물</List>
          <ArrowSvg>&gt;</ArrowSvg>
        </ListBox>
      )}
      {memberRole === "ADMIN" && (
        <ListBox onClick={() => navigate("/profile/reportmanagement")}>
          <ReportSvg></ReportSvg>
          <List>게시물 신고관리</List>
          <ArrowSvg>&gt;</ArrowSvg>
        </ListBox>
      )}
      <ListBox onClick={() => navigate("/profile/customer")}>
        <Headphone />
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
  :hover {
    transform: translate(0px, -1px);
    transition: 0.3s;
    border-bottom: 1px solid ${(props) => props.theme.color.primary_strong};
    span {
      color: ${(props) => props.theme.color.primary_strong};
    }
    path {
      fill: ${(props) => props.theme.color.primary_strong};
    }
    path.white {
      fill: ${(props) => props.theme.color.white};
    }
    div {
      color: ${(props) => props.theme.color.primary_heavy};
    }
  }
  :active {
    background-color: ${(props) => props.theme.color.line_alternative};
    border-bottom: 1px solid ${(props) => props.theme.color.primary_heavy};
    transform: translate(0px, 1px);
    box-shadow: none;
    border-bottom: 1px solid ${(props) => props.theme.color.primary_strong};
    transition: 0.3s;
    path {
      fill: ${(props) => props.theme.color.primary_heavy};
    }
    path.white {
      fill: ${(props) => props.theme.color.white};
    }
    div {
      color: ${(props) => props.theme.color.primary_heavy};
    }
  }
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
