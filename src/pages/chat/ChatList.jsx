import React, { useEffect } from "react";
import Layout from "../../layouts/Layout";
import { HeaderStyle } from "../../style/Mixin";
import styled from "styled-components";
import chattingheader from "../../asset/header/chattingheader.png";
import ChatListBox from "./components/ChatListBox";
import { useDispatch, useSelector } from "react-redux";
import { __getMyChatRoom } from "../../redux/modules/chatSlice";

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
    logEvent(`/${location.pathname}`);
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
      {myChatRoom?.map((item) => {
        return (
          <ChatListBox
            key={`mychat-room-item-${item.roomId}`}
            item={item}
          ></ChatListBox>
        );
      })}
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

export default ChatList;
