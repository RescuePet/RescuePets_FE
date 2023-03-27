import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
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
  const { id, postname } = useParams();
  const sender = JSON.parse(localStorage.getItem("userInfo"));
  const [currentChat, setCurrentChat] = useState([]);
  console.log(process.env.REACT_APP_CHAT_TEST);

  const socket = new SockJS(`${process.env.REACT_APP_CHAT_TEST}/ws/chat`);
  console.log("socket", socket);
  const ws = Stomp.over(socket);

  console.log("ws", ws);

  let postchatroomid = "";

  const [roomId, setRoomId] = useState("");

  const TOKEN = Cookies.get("Token");

  let headers = {
    Access_Token: TOKEN,
  };

  useEffect(() => {
    connectChatroom();
    return () => {
      wsDisconnect();
    };
  }, []);

  // 연결 async
  const connectChatroom = async () => {
    console.log("post room", postname);
    console.log("post id", id);
    instance
      .post(`/chat/${postname}/${id}`)
      .then((response) => {
        console.log(response.data);
        setRoomId(response.data);
        postchatroomid = response.data;
        console.log("response data", roomId);
        wsConnectSubscribe(response.data);
        return instance.get(`/room/${response.data}`);
      })
      .then((response) => {
        setCurrentChat([...response.data.data.dto]);
        return;
      });
  };

  // 연결 시 실행
  const waitForConnection = (ws, callback) => {
    setTimeout(
      () => {
        // 연결되었을 때 콜백함수 실행
        if (ws.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(ws, callback);
        }
      },
      1 // 밀리초 간격으로 실행
    );
  }; //stomp 메시지 에러 waitForConnection함수로 해결

  const wsConnectSubscribe = (roomId) => {
    ws.connect(headers, {}, () => {
      ws.subscribe(`/sub/${roomId}`, (response) => {
        let data = JSON.parse(response.body);
        setCurrentChat((prev) => [...prev, data]);
      });
    });
  };

  const wsDisconnect = () => {
    try {
      ws.unsubscribe("sub-0");
      ws.disconnect(() => {
        console.log("WebSocket disconnected.");
        clearTimeout(waitForConnection);
      });
    } catch (e) {}
  };

  const submitHandler = (register) => {
    let message = register.message;
    if (message === "") {
      return;
    }
    const sendSettings = {
      type: "TALK",
      sender: sender.nickname,
      message: message,
    };
    waitForConnection(ws, () => {
      console.log("send roomId", roomId);
      ws.send(`/pub/${roomId}`, {}, JSON.stringify(sendSettings));
    });
  };

  return (
    <Layout>
      <ChatRoomHeader>
        <HeaderTitle>밤빵이아빠</HeaderTitle>
      </ChatRoomHeader>
      <ChatRoomBody>
        {currentChat.length !== 0 &&
          currentChat.map((item, index) => {
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
