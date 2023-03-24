import React from "react";

import {
  AlertMessageCountStyle,
  FlexAttribute,
  PostBorderStyle,
} from "../../../style/Mixin";
import styled from "styled-components";
import { Body_400_14, Body_400_12, Body_300_10 } from "../../../style/theme";
import profile from "../../../asset/profile.svg";

const ChatListBox = () => {
  return (
    <ChatRoomListContainer>
      <ClickDiv>
        <ProfileImage src={profile} />
        <TextWrapper>
          <UserName>크롱크롱</UserName>
          <Contents>
            아는 지인분이 보호중인 고양이가 있다고 사진 보내주셨는데 닮은 것
            같아서 연락드려...
          </Contents>
        </TextWrapper>
        <InfoWrapper>
          <Time>오전 09:39</Time>
          <MessageCount>1</MessageCount>
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

const ClickDiv = styled.div`
  ${FlexAttribute("row", "space-evenly", "center")}
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const TextWrapper = styled.div`
  ${FlexAttribute("column")}
  flex-basis: 217px;
`;

const UserName = styled.span`
  ${Body_400_14}
`;

const Contents = styled.span`
  ${Body_400_12}
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
