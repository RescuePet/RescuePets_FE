import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ isOpen, onClose, children }) {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: "50%" },
  };
  // const [isOpenModal, setIsOpenModal] = useState(true);
  // console.log("기존모달값", isOpen);
  // // console.log("현재모달값", isOpenModal);
  // useEffect(() => {
  //   console.log("이펙트", isOpen);
  //   setIsOpenModal(isOpen);
  //   if (isOpen) {
  //     console.log("이펙트22", isOpen);
  //     console.log("이펙트33", isOpenModal);
  //     const timeoutId = setTimeout(() => {
  //       setIsOpenModal(!isOpenModal);
  //     }, 750);
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [isOpen]);

  // // console.log("현재모달값2", isOpenModal);
  // console.log("내장", isOpen);
  useEffect(() => {
    // console.log("use내장", isOpen);
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 650);
      return () => clearTimeout(timeoutId);
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
  position: absolute;
  z-index: 99999;
  top: 0;
  width: 27rem;
  height: 100%;
  overflow: auto;
`;

const ModalContainer = styled(motion.div)`
  background-color: ${(props) => props.theme.color.primary_normal};

  margin: auto; /* 추가 */
  border-radius: 0.5rem;
  position: absolute;
  top: 2%;
  right: 5%;
  width: 14.0625rem;
  height: 3rem;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
`;

export const ModalSEEMsgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.color.white};
  ${(props) => props.theme.Body_400_14_16}
  display: flex;
  align-items: center;
  ${(props) => props.theme.FlexCenter}
  > h2 {
    ${(props) => props.theme.Body_400_14_16}
  }
`;

// Sign 커스텀 모달
export function SseAlertModal(props) {
  // console.log("모달에 보일 text,", props);
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.toggle}>
        <ModalSEEMsgContainer>
          <h2>{props.children}</h2>
        </ModalSEEMsgContainer>
      </Modal>
    </>
  );
}
