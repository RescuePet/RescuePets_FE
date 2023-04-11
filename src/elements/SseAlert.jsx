import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import ModalImg from "../asset/Spinner/spinner.png";

export default function Modal({ isOpen, onClose, children }) {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: "50%" },
  };

  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 750);
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
  margin: auto;
  border-radius: 0.5rem;
  position: absolute;
  top: 9%;
  right: 15%;
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
  ${(props) => props.theme.FlexCenter}
  padding-left: .625rem;
  > img {
    position: fixed;
    width: 2.5rem;
    height: 2.5rem;
    top: -13%;
    left: -3%;
  }
`;

// Sign 커스텀 모달
export function SseAlertModal(props) {
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.toggle}>
        <ModalSEEMsgContainer>
          <img src={ModalImg} />
          <h2>{props.children}</h2>
        </ModalSEEMsgContainer>
      </Modal>
    </>
  );
}
