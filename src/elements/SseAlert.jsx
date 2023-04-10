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
    hidden: { opacity: 0, x: "50%", transition: { duration: 0.1 } },
  };

  const [isOpenModal, setIsOpenModal] = useState(isOpen);


  useEffect(() => {
    if (isOpen) {
      setIsOpenModal(isOpen);
      const timeoutId = setTimeout(() => {
        setIsOpenModal(false);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpenModal && (
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
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1px);
`;

const ModalContainer = styled(motion.div)`
  background-color: white;
  margin: auto; /* 추가 */
  border-radius: 0.5rem;
  position: absolute;
  top: 2%;
  right: 5%;
  width: 14.0625rem;
  height: 4rem;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
`;

export const ModalSEEMsgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  color: #333333;
  display: flex;
  align-items: center;
  ${(props) => props.theme.FlexCenter}
  > h2 {
    ${(props) => props.theme.Body_400_14_16}
  }
`;

// Sign 커스텀 모달
export function SseAlertModal(props) {
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
