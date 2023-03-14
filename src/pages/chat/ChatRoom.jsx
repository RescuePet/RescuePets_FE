import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getChatRoom } from "../../redux/modules/chatSlice";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Cookies from "js-cookie";

const ChatRoom = () => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const postId = 1;
  const roomId = useSelector((state) => state.chat.roomId);

  const TOKEN = Cookies.get("Token");
  let headers = {
    Access_Token: TOKEN,
  };

  useEffect(() => {
    dispatch(__getChatRoom(postId));

    wsConnectSubscribe();

    return () => {
      onbeforeunloda();
    };
  }, [roomId]);

  console.log("roomId ->", roomId);
  console.log("JS TOKEN ->", TOKEN);

  const socket = new SockJS(`${process.env.REACT_APP_CHAT_TEST}/ws/chat`);
  // SockJS를 내부에 들고 있는 stomp를 내어줌
  const ws = Stomp.over(socket);
  console.log("infomation ws -> ", ws);

  const content = {
    type: "TALK",
    sender: "test1",
    message: message,
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

  const wsConnectSubscribe = () => {
    try {
      console.log("headers", headers);
      ws.connect(headers, (frame) => {
        ws.subscribe(`/sub/${roomId}`, (response) => {
          let data = JSON.parse(response.body);
          console.log("sucsess connect");
          console.log("data message ->", data);
        });
      });
    } catch (error) {
      console.log("error message ->", error);
    }
  };

  const onbeforeunloda = () => {
    try {
      ws.disconnect(
        () => {
          ws.unsubscribe("sub-0");
          clearTimeout(waitForConnection);
        },
        { Access_Token: localStorage.getItem("Access_Token") }
      );
    } catch (e) {}
  };

  const handleSubmit = () => {
    waitForConnection(ws, () => {
      ws.send(`/pub/${roomId}`, {}, JSON.stringify(content));
    });
  };

  return (
    <>
      <div></div>
      <br />
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => handleSubmit()}>보내기</button>
    </>
  );
};

export default ChatRoom;
