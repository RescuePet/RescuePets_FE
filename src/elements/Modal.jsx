import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import ModalImg from "../asset/Spinner/spinner.png";

export default function Modal({ isOpen, onClose, children }) {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "-50%", transition: { duration: 0.1 } },
  };

  const [isOpenModal, setIsOpenModal] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsOpenModal(isOpen);
      const timeoutId = setTimeout(() => {
        setIsOpenModal(false);
      }, 900);
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
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1px);
`;

const ModalContainer = styled(motion.div)`
  background-color: white;
  margin: auto;
  border-radius: 0.5rem;
  position: absolute;
  top: 2%;
  width: 21.875rem;
  height: 4rem;
`;
export const ModalMsgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  color: #333333;
  ${(props) => props.theme.FlexCenter}
  > img {
    position: absolute;
    width: 3rem;
    height: 3rem;
    left: -0.8125rem;
    top: -1.25rem;
  }
  > h2 {
    padding: 1.25rem;
    /* margin-left: 1.25rem; */
    ${(props) => props.theme.Body_400_14_16}
    text-align: center;
  }
`;

// Sign 커스텀 모달
export function CheckModal(props) {
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.toggle}>
        <ModalMsgContainer>
          <img src={ModalImg} />
          <h2>{props.children}</h2>
        </ModalMsgContainer>
      </Modal>
    </>
  );
}
