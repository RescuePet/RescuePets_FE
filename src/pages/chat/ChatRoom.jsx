import React, { useEffect, useState, useCallback, useRef } from "react";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Back from "../../asset/Back.svg";
import { useDispatch, useSelector } from "react-redux";
import Option from "../../components/Option";
import Meatballs from "../../asset/Meatballs";
import { toggleOption } from "../../redux/modules/menubarSlice";
import ReportModal from "../../components/ReportModal";
import { toggleReport } from "../../redux/modules/menubarSlice";
import { resetunreadChat } from "../../redux/modules/chatSlice";
import chatroombackground from "../../asset/chat/chatroombackground.png";

import {
  initAmplitude,
  logEvent,
  setAmplitudeUserId,
  resetAmplitude,
} from "../../utils/amplitude";
import isLogin from "../../utils/isLogin";
import { useModalState } from "../../hooks/useModalState";
import { CheckModal } from "../../elements/Modal";

const ChatRoom = () => {
  // 앰플리튜드
  const location = useLocation();
  useEffect(() => {
    initAmplitude();
    logEvent(`enter_/${location.pathname.split("/")[1]}`);
    if (isLogin()) {
      setAmplitudeUserId();
    }
    return () => {
      resetAmplitude();
    };
  }, []);

  const { id, nickname } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { optionState, reportState } = useSelector((state) => state.menubar);

  const [chatlog, setChatLog] = useState([]);
  const [Msg, setMsg] = useState("");
  const [roleCheckModal, toggleRoleCheckModal] = useModalState(false);
  const sender = JSON.parse(Cookies.get("UserInfo"));

  let client;

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
    client.debug = false; // Debug 옵션을 false로 설정
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
      dispatch(resetunreadChat(id));
      getChatLog(id);
    };
  }, []);

  const messagesRef = useRef(null); // 메시지 엘리먼트를 저장

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [chatlog]);

  // client undefined 였는데, useCallback을 사용하니 정상 작동
  const submitHandler = useCallback((register) => {
    let message = register.message;
    if (message === "") {
      return;
    } else if (sender.memberRole === "BAD_MEMBER") {
      toggleRoleCheckModal();
      setMsg("BAD MEMBER는 채팅을 보낼 수 없습니다.");
      setTimeout(() => {
        setMsg("");
        return;
      }, 1500);
      return;
    }
    const sendSettings = {
      sender: sender.nickname,
      profileImage: sender.profileImage,
      message: message,
    };
    client.send(`/pub/${id}`, {}, JSON.stringify(sendSettings));
  }, []);

  const leaveChatHandler = async () => {
    try {
      await instance.delete(`/chat/room/exit/${id}`);
      navigate("/chatlist");
    } catch (error) {
      console.log(error);
    }
  };

  const OpenReportHandler = () => {
    dispatch(toggleReport());
    dispatch(toggleOption());
  };

  const ChatRoomMeatData = [
    {
      option: "채팅방 나가기",
      color: "normal",
      handler: leaveChatHandler,
    },
    {
      option: "신고하기",
      color: "report",
      handler: OpenReportHandler,
    },
  ];

  const reportModalData = {
    type: "member",
    nickname: nickname,
  };

  return (
    <Layout>
      <ChatRoomHeader>
        <BackSvg src={Back} onClick={() => navigate("/chatlist")} />
        <HeaderTitle>{nickname}</HeaderTitle>
        <OptionChat onClick={() => dispatch(toggleOption())} />
      </ChatRoomHeader>
      <ChatRoomBody ref={messagesRef} image={chatroombackground}>
        {chatlog.length !== 0 &&
          chatlog.map((item, index) => {
            if (item.sender === sender.nickname) {
              return (
                <Send
                  key={`send-item-${index}`}
                  message={item.message}
                  chatTime={item.chatTime}
                ></Send>
              );
            } else {
              return (
                <Receive
                  key={`receive-item-${index}`}
                  message={item.message}
                  receiver={item.sender}
                  receiverImage={item.profileImage}
                  chatTime={item.chatTime}
                ></Receive>
              );
            }
          })}
      </ChatRoomBody>
      <InputContainer
        placeholder="메세지를 입력해주세요."
        submitHandler={submitHandler}
      ></InputContainer>
      {optionState && <Option setting={ChatRoomMeatData} />}
      {reportState && <ReportModal setting={reportModalData} />}
      {Msg === "" ? null : (
        <CheckModal
          isOpen={roleCheckModal}
          toggle={toggleRoleCheckModal}
          onClose={toggleRoleCheckModal}
        >
          {Msg}
        </CheckModal>
      )}
    </Layout>
  );
};

const ChatRoomHeader = styled.div`
  ${FlexAttribute("row", "center", "center")}
  ${HeaderStyle}
  position: sticky;
  top: 0;
  z-index: 10;
  padding-bottom: 1.0625rem;
  background-color: ${(props) => props.theme.color.white};
`;

const BackSvg = styled.img`
  position: absolute;
  left: 1.25rem;
  cursor: pointer;
`;

const HeaderTitle = styled.span`
  ${Body_500_16}
`;

const OptionChat = styled(Meatballs)`
  position: absolute;
  right: 1.25rem;
  cursor: pointer;
`;

const ChatRoomBody = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-image: url(${(props) => props.image});
  background-size: 200px;
  background-repeat: no-repeat;
  background-position: center;
`;

export default ChatRoom;
