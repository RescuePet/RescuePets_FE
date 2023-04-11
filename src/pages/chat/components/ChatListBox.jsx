import React from "react";

import {
  AlertMessageCountStyle,
  FlexAttribute,
  PostBorderStyle,
} from "../../../style/Mixin";
import styled, { css } from "styled-components";
import { Body_400_12, Body_300_10 } from "../../../style/theme";
import profile from "../../../asset/profile.svg";
import { Link } from "react-router-dom";

const ChatListBox = ({ item }) => {
  let refineData = {
    state: "",
  };
  // console.log(item);
  if (item.postName === "MISSING") {
    refineData.state = "실종";
  } else if (item.postName === "CATCH") {
    refineData.state = "목격";
  }
  // console.log(item);
  return (
    <ChatRoomListContainer>
      <ClickDiv to={`/chatroom/${item.partner}/${item.roomId}`}>
        <ProfileImage
          src={item.profileImage !== null ? item.profileImage : profile}
        />
        <TextWrapper>
          <TitleWrapper>
            <UserName>{item.partner}</UserName>
            <PostState category={refineData.state}>
              {refineData.state}
            </PostState>
            <PostKindCd>{item.roomName}</PostKindCd>
            <Time>{item.time}</Time>
            {item.unreadChat === 0 ? null : (
              <MessageCount alertCss={item.unreadChat >= 100 && true}>
                {item.unreadChat >= 100 ? "99+" : item.unreadChat}
              </MessageCount>
            )}
          </TitleWrapper>
          {item.lastChat == null ? (
            <Contents>채팅이 없습니다.</Contents>
          ) : (
            <Contents>
              {item.lastChat.length <= 20
                ? item.lastChat
                : item.lastChat.substring(0, 20) + ".."}
            </Contents>
          )}
        </TextWrapper>
      </ClickDiv>
    </ChatRoomListContainer>
  );
};

const ChatRoomListContainer = styled.div`
  ${PostBorderStyle}
  width: 100%;
  padding-top: 1rem;
`;

const ClickDiv = styled(Link)`
  position: relative;
  ${FlexAttribute("row", "", "center")}
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 16px;
  border-radius: 50%;
`;

const TextWrapper = styled.div`
  ${FlexAttribute("column")}
  flex-basis: 230px;
  margin-left: 20px;
`;

const TitleWrapper = styled.div`
  ${FlexAttribute("row", "", "center")}
  span:not(:first-child) {
    margin-left: 0.5rem;
  }
`;

const PostState = styled.span`
  height: 1rem;
  padding: 0.125rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.white};
  text-align: center;
  font-weight: 500;
  font-size: 0.625rem;
  box-shadow: 0.0313rem 0.0313rem 0.0625rem rgba(0, 0, 0, 0.1);
  flex-basis: 2.1875rem;
  ${(props) =>
    props.category === "실종" &&
    css`
      border: 0.0625rem solid ${(props) => props.theme.color.status_caution};
      color: ${(props) => props.theme.color.status_caution};
    `}
  ${(props) =>
    props.category === "목격" &&
    css`
      border: 0.0625rem solid ${(props) => props.theme.color.status_alert};
      color: ${(props) => props.theme.color.status_alert};
    `}
`;

const PostKindCd = styled.span`
  ${(props) => props.theme.Body_400_12};
  line-height: 1.25rem;
  color: ${(props) => props.theme.color.text_alternative};
`;

const UserName = styled.span`
  ${(props) => props.theme.Body_400_14};
  line-height: 1.25rem;
  color: ${(props) => props.theme.color.text_normal};
`;

const Contents = styled.span`
  ${Body_400_12}
  margin-top: .5rem;
  color: #666666;
`;

const Time = styled.span`
  position: absolute;
  right: 16px;
  ${Body_300_10}
`;

const MessageCount = styled.div`
  position: absolute;
  top: 20px;
  left: calc(100% - 35px);
  ${AlertMessageCountStyle}
  ${(props) =>
    props.alertCss &&
    css`
      content: "99+";
      width: auto;
      margin-top: 0.25rem;
      padding: 2.4px 3.4px;
      border-radius: 30px;
      top: 20px;
      left: calc(100% - 40px);
    `};
`;

export default ChatListBox;
