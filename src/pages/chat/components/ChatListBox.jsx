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
  console.log(item);
  if (item.postName === "MISSING") {
    refineData.state = "실종";
  } else if (item.postName === "CATCH") {
    refineData.state = "목격";
  }
  console.log(item);
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
          </TitleWrapper>
          <Contents>{item.lastChat}</Contents>
        </TextWrapper>
        <InfoWrapper>
          <Time>{item.time}</Time>
          {/* <MessageCount>1</MessageCount> */}
        </InfoWrapper>
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
  ${FlexAttribute("row", "space-evenly", "center")}
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-left: 1.25rem;
`;

const TextWrapper = styled.div`
  ${FlexAttribute("column")}
  flex-basis: 13.5625rem;
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

const InfoWrapper = styled.div`
  ${FlexAttribute("column", "", "flex-end")}
  flex-basis: 2.875rem;
`;

const Time = styled.span`
  ${Body_300_10}
`;

const MessageCount = styled.div`
  ${AlertMessageCountStyle}
`;

export default ChatListBox;
