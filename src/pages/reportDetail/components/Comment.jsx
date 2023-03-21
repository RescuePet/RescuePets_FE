import React from "react";
import styled from "styled-components";
import { Border_1_color, FlexAttribute } from "../../../style/Mixin";
import { Body_400_10, Body_400_12, Body_500_14 } from "../../../style/theme";

const Comment = ({ item }) => {
  console.log("comment Item", item);
  return (
    <CommentBox>
      <UserInfo>
        <UserImg></UserImg>
        <UserBox>
          <UserName>{item.userNickName}</UserName>
          {/* <CommentTime>43분전</CommentTime> */}
        </UserBox>
      </UserInfo>
      <CommentText>{item.content}</CommentText>
    </CommentBox>
  );
};

const CommentBox = styled.div`
  ${FlexAttribute("column")}
  width: 335px;
  padding: 16px 0;
  word-break: break-all;
  :not(:last-child) {
    ${Border_1_color}
  }
`;

const UserImg = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999999;
`;

const UserInfo = styled.div`
  ${FlexAttribute("row")}
`;

const UserBox = styled.div`
  margin-left: 16px;
  margin-bottom: 8px;
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
  margin-left: 49px;
`;

export default Comment;
