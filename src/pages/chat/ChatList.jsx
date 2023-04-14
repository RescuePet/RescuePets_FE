import React, { useEffect } from "react";
import Layout from "../../layouts/Layout";
import { HeaderStyle } from "../../style/Mixin";
import styled from "styled-components";
import chattingheader from "../../asset/header/chattingheader.png";
import ChatListBox from "./components/ChatListBox";
import { useDispatch, useSelector } from "react-redux";
import { __getMyChatRoom } from "../../redux/modules/chatSlice";
import chatlistbackground from "../../asset/chat/chatlistbackground.png";

import {
  initAmplitude,
  logEvent,
  setAmplitudeUserId,
  resetAmplitude,
} from "../../utils/amplitude";
import { useLocation } from "react-router-dom";

const ChatList = () => {
  // 앰플리튜드
  const location = useLocation();
  useEffect(() => {
    initAmplitude();
    logEvent(`enter_${location.pathname}`);
    setAmplitudeUserId();
    return () => {
      resetAmplitude();
    };
  }, []);

  const dispatch = useDispatch();
  const { myChatRoom } = useSelector((state) => state.myChat);

  useEffect(() => {
    dispatch(__getMyChatRoom());
  }, []);

  return (
    <Layout>
      <ChatHeader>
        <HeaderImage src={chattingheader} />
      </ChatHeader>
      <ChatListContainer image={chatlistbackground}>
        {myChatRoom?.map((item) => {
          return (
            <ChatListBox
              key={`mychat-room-item-${item.roomId}`}
              item={item}
            ></ChatListBox>
          );
        })}
      </ChatListContainer>
    </Layout>
  );
};

const ChatHeader = styled.div`
  ${HeaderStyle}
`;

const HeaderImage = styled.img`
  width: 140px;
  height: 30px;
  margin-left: 18px;
`;

const ChatListContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: 240px;
  background-position: center;
`;

export default ChatList;
