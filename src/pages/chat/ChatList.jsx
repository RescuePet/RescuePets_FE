import React from "react";
import Layout from "../../layouts/Layout";
import Footer from "../../layouts/Footer";
import { HeaderStyle } from "../../style/Mixin";
import styled from "styled-components";
import { Title_700_18 } from "../../style/theme";
import ChatListBox from "./components/ChatListBox";

const ChatList = () => {
  return (
    <Layout>
      <ChatHeader>
        <HeaderTitle>Chatting</HeaderTitle>
      </ChatHeader>
      <ChatListBox></ChatListBox>
      <ChatListBox></ChatListBox>
      <Footer></Footer>
    </Layout>
  );
};

const ChatHeader = styled.div`
  ${HeaderStyle}
`;

const HeaderTitle = styled.div`
  ${Title_700_18}
  margin-left: 25px;
`;

export default ChatList;
