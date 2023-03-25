import React from "react";
import Layout from "../../layouts/Layout";
import { HeaderStyle } from "../../style/Mixin";
import styled from "styled-components";
import chattingheader from "../../asset/header/chattingheader.png";
import ChatListBox from "./components/ChatListBox";

const ChatList = () => {
  return (
    <Layout>
      <ChatHeader>
        <HeaderImage src={chattingheader} />
      </ChatHeader>
      <ChatListBox></ChatListBox>
      <ChatListBox></ChatListBox>
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
