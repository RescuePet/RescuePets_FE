import React, { useEffect, useState, useCallback } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import styled from "styled-components";
import { FlexAttribute, HeaderStyle } from "../../style/Mixin";
import { Body_500_16 } from "../../style/theme";

import Layout from "../../layouts/Layout";
import InputContainer from "../../components/InputContainer";
import Send from "./components/Send";
import Receive from "./components/Receive";
import { instance } from "../../utils/api";
import { useParams } from "react-router-dom";

const ChatRoom = () => {
  const { id, nickname } = useParams();
  const [chatlog, setChatLog] = useState([]);
  const sender = JSON.parse(localStorage.getItem("userInfo"));

  let client;
  console.log("roomId", id);
  const getChatLog = async (roomId) => {
    try {
      const response = await instance.get(`/room/${roomId}`);
      setChatLog(response.data.data.messages);
    } catch (error) {
      console.log(error);
    }
  };

  const stompConnect = () => {
    const socket = new SockJS(`${process.env.REACT_APP_HOME_URL}/ws/chat`);
    client = Stomp.over(socket);
    client.connect({}, () => {
      client.subscribe(
        `/sub/${id}`,
        (response) => {
          let data = JSON.parse(response.body);
          setChatLog((prev) => [...prev, data]);
        },
        { id: id }
      );
    });
  };

  const stompDisconnect = async () => {
    try {
      await client.disconnect();
      await client.unsubscribe(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getChatLog(id);
      stompConnect();
    };
    fetchData();
    return () => {
      stompDisconnect();
    };
  }, []);

  // client undefined 였는데, useCallback을 사용하니 정상 작동
  const submitHandler = useCallback((register) => {
    let message = register.message;
    if (message === "") {
      return;
    }
    const sendSettings = {
      type: "TALK",
      sender: sender.nickname,
      message: message,
    };
    client.send(`/pub/${id}`, {}, JSON.stringify(sendSettings));
  }, []);

  return (
    <Layout>
      <ChatRoomHeader>
        <HeaderTitle>{nickname}</HeaderTitle>
      </ChatRoomHeader>
      <ChatRoomBody>
        {chatlog.length !== 0 &&
          chatlog.map((item, index) => {
            if (item.sender === sender.nickname) {
              return (
                <Send key={`send-item-${index}`} message={item.message}></Send>
              );
            } else {
              return (
                <Receive
                  key={`receive-item-${index}`}
                  message={item.message}
                ></Receive>
              );
            }
          })}
      </ChatRoomBody>
      <InputContainer
        placeholder="메세지를 입력해주세요."
        submitHandler={submitHandler}
      ></InputContainer>
    </Layout>
  );
};

const ChatRoomHeader = styled.div`
  ${FlexAttribute("row", "center", "center")}
  ${HeaderStyle}
`;

const HeaderTitle = styled.span`
  ${Body_500_16}
  padding-bottom: 17px;
`;

const ChatRoomBody = styled.div`
  width: 100%;
`;

export default ChatRoom;
