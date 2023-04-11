import React, { useState } from "react";
import styled from "styled-components";
import { Border_1_color, FlexAttribute } from "../../../style/Mixin";
import { Body_400_10, Body_400_12, Body_500_14 } from "../../../style/theme";
import profileIcon from "../../../asset/profile.svg";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import Option from "../../../components/Option";
import ReportModal from "../../../components/ReportModal";
import { __deleteComment } from "../../../redux/modules/commentSlice";
import Meatballs from "../../../asset/Meatballs";
import { removeCommentCount } from "../../../redux/modules/petworkSlice";

const Comment = ({ item }) => {
  const dispatch = useDispatch();

  const [commentOption, setCommentOption] = useState(false);
  const [commentReport, setCommentReport] = useState(false);
  const { nickname } = JSON.parse(Cookies.get("UserInfo"));

  const optionMySetting = [
    {
      option: "댓글 삭제하기",
      color: "report",
      handler: () => {
        dispatch(removeCommentCount());
        dispatch(__deleteComment(item.id));
      },
      type: "comment",
    },
  ];

  const optionOtherSetting = [
    {
      option: "댓글 신고하기",
      color: "report",
      handler: () => {
        setCommentReport(!commentReport);
        setCommentOption(!commentOption);
      },
      type: "comment",
    },
  ];

  const commentCloseHandler = () => {
    setCommentOption(!commentOption);
  };

  const reportCloseHandler = () => {
    setCommentReport(!commentReport);
  };

  const reportSetting = {
    type: "comment",
    nickname: item.userNickName,
    postId: 0,
    commentId: item.id,
  };

  return (
    <>
      <CommentBox>
        <UserInfo>
          <UserImg
            src={item.profileImage !== null ? item.profileImage : profileIcon}
          />
          <UserBox>
            <UserName>{item.userNickName}</UserName>
            <CommentTime>
              {item.modifiedAt.substring(0, 10)}&nbsp;
              {item.modifiedAt.substring(11, 16)}
            </CommentTime>
          </UserBox>
          <CommentMeatBalls onClick={() => setCommentOption((prev) => !prev)} />
        </UserInfo>
        <CommentText>{item.content}</CommentText>
      </CommentBox>
      {commentOption && (
        <Option
          setting={
            nickname === item.userNickName
              ? optionMySetting
              : optionOtherSetting
          }
          mapCloseHandler={commentCloseHandler}
        />
      )}
      {commentReport && (
        <ReportModal
          setting={reportSetting}
          reportCloseHandler={reportCloseHandler}
        />
      )}
    </>
  );
};

const CommentBox = styled.div`
  ${FlexAttribute("column")}
  width: 20.9375rem;
  padding: 1rem 0;
  word-break: break-all;
  position: relative;
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
  position: relative;
  ${FlexAttribute("row")}
`;

const UserBox = styled.div`
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  ${FlexAttribute("column")}
`;

const CommentMeatBalls = styled(Meatballs)`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
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
  line-height: 18px;
`;

export default Comment;
