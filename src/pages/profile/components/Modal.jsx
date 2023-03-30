import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { __SignoutUser } from "../../../redux/modules/signSlice";

export default function Modal({ isOpen, onClose, children }) {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "100%", transition: { duration: 0.2 } },
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <ModalContainer
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </ModalContainer>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}

const Backdrop = styled(motion.div)`
  ${(props) => props.theme.FlexRow};
  position: fixed;
  z-index: 9;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(0.0625rem);
`;

const ModalContainer = styled(motion.div)`
  background-color: white;
  margin: auto;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  position: absolute;
  bottom: 0%;
  width: 23.4375rem;
  height: 18.75rem;
  padding: 0.625rem;
`;
const ModalEachBox = styled.div`
  width: 100%;
  height: 3.125rem;
  border-bottom: 1px solid gray;
`;

// 마커 클릭시 보여줄 모달
export function HamburgerModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Msg, setMsg] = useState("");

  const onClickLogoutHandler = () => {
    dispatch(__SignoutUser());
  };

  useEffect(() => {}, [dispatch]);
  const SignoutMsg = useSelector((state) => {
    return state.users?.Signoutmessage;
  });

  useEffect(() => {
    console.log(SignoutMsg);
    setMsg(SignoutMsg);
  }, [SignoutMsg]);

  if (Msg === "LOGOUT_SUCCESS") {
    localStorage.removeItem("userInfo");
    Cookies.remove("Token");
    Cookies.remove("Refresh");
    console.log("로그아웃성공");
    setTimeout(function () {
      navigate("/");
    }, 1000);
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.toggle}>
      <ModalEachBox>
        <div>내정보수정</div>
      </ModalEachBox>
      <ModalEachBox>
        {/* <div onClick={onClickLogoutHandler}>로그아웃</div> */}
      </ModalEachBox>
    </Modal>
  );
}
