import React, { useEffect } from "react";
import Layout from "../../layouts/Layout";
import { HeaderStyle } from "../../style/Mixin";
import styled from "styled-components";
import chattingheader from "../../asset/header/chattingheader.png";
import ChatListBox from "./components/ChatListBox";
import { useDispatch, useSelector } from "react-redux";
import { __getMyChatRoom } from "../../redux/modules/chatSlice";

const ChatList = () => {
  const dispatch = useDispatch();
  const { myChatRoom } = useSelector((state) => state.myChat);

  useEffect(() => {
    dispatch(__getMyChatRoom());
  }, []);

  // console.log(myChatRoom);

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
