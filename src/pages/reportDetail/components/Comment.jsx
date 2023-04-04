import React from "react";
import styled from "styled-components";
import { Border_1_color, FlexAttribute } from "../../../style/Mixin";
import { Body_400_10, Body_400_12, Body_500_14 } from "../../../style/theme";
import profileIcon from "../../../asset/profile.svg";
import close from "../../../asset/profile.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { __deleteMissingComment } from "../../../redux/modules/commentSlice";

const Comment = ({ item }) => {
  // console.log(item);
  const { profileImage } = JSON.parse(localStorage.getItem("userInfo"));
  console.log(profileImage);
  console.log(item);
  const dispatch = useDispatch();

  const handleDeleteComment = () => {
    dispatch(__deleteMissingComment(item.id));
  };

  return (
    <CommentBox>
      <UserInfo>
        <UserImg
          src={item.profileImage !== null ? item.profileImage : profileIcon}
        />
        <UserBox>
          <UserName>{item.userNickName}</UserName>
          {/* <CommentTime>43분전</CommentTime> */}
        </UserBox>
      </UserInfo>
      <CommentText>
        {item.content}
        <DeleteButton>
          <img src={close} alt="delete" />
        </DeleteButton>
      </CommentText>
    </CommentBox>
  );
};

const CommentBox = styled.div`
  ${FlexAttribute("column")}
  width: 20.9375rem;
  padding: 1rem 0;
  word-break: break-all;
  :not(:last-child) {
    ${Border_1_color}
  }
`;

const UserImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  ${FlexAttribute("row")}
`;

const UserBox = styled.div`
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  ${FlexAttribute("column")}
`;

const UserName = styled.span`
  ${Body_500_14}
`;

const CommentTime = styled.span`
  ${Body_400_10}
  color: #999999;
`;

const CommentText = styled.span`
  ${Body_400_12}
  margin-left: 3.0625rem;
`;

const DeleteButton = styled.button``;

export default Comment;
