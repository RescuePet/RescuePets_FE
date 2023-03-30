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
  if (item.postName === "missing-room") {
    refineData.state = "실종";
  } else if (item.postName === "catch-room") {
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
            <div>
              <PostKindCd>{item.roomName}</PostKindCd>
              <UserName>{item.partner}</UserName>
            </div>
            <PostState category={refineData.state}>
              {refineData.state}
            </PostState>
          </TitleWrapper>
          <Contents>{item.lastChat}</Contents>
        </TextWrapper>
        <InfoWrapper>
          {/* <Time>오전 09:39</Time>
          <MessageCount>1</MessageCount> */}
        </InfoWrapper>
      </ClickDiv>
    </ChatRoomListContainer>
  );
};

const ChatRoomListContainer = styled.div`
  ${PostBorderStyle}
  width: 100%;
  padding-top: 16px;
`;

const ClickDiv = styled(Link)`
  ${FlexAttribute("row", "space-evenly", "center")}
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 20px;
`;

const TextWrapper = styled.div`
  ${FlexAttribute("column")}
  flex-basis: 217px;
`;

const TitleWrapper = styled.div`
  ${FlexAttribute("row", "space-between", "center")}
  flex-flow: 300px;
  span:not(:first-child) {
    margin-left: 8px;
  }
`;

const PostState = styled.span`
  height: 16px;
  padding: 2px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.white};
  text-align: center;
  font-weight: 500;
  font-size: 10px;
  box-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.1);
  flex-basis: 35px;
  ${(props) =>
    props.category === "실종" &&
    css`
      border: 1px solid ${(props) => props.theme.color.status_caution};
      color: ${(props) => props.theme.color.status_caution};
    `}
  ${(props) =>
    props.category === "목격" &&
    css`
      border: 1px solid ${(props) => props.theme.color.status_alert};
      color: ${(props) => props.theme.color.status_alert};
    `}
`;

const PostKindCd = styled.span`
  ${(props) => props.theme.Body_400_14};
  line-height: 16px;
`;

const UserName = styled.span`
  ${Body_400_12}
  flex-basis: 90px;
  line-height: 16px;
  color: ${(props) => props.theme.color.text_assistive};
`;

const Contents = styled.span`
  ${Body_400_12}
  margin-top: 8px;
  color: #666666;
`;

const InfoWrapper = styled.div`
  ${FlexAttribute("column", "", "flex-end")}
  flex-basis: 46px;
`;

const Time = styled.span`
  ${Body_300_10}
`;

const MessageCount = styled.div`
  ${AlertMessageCountStyle}
`;

export default ChatListBox;
