import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../../elements/Button";
import { useNavigate } from "react-router-dom";

export default function Modal({ isOpen, onClose, children }) {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "-100%", transition: { duration: 0.1 } },
  };

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
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  position: absolute;
  bottom: 0%;
  width: 23.4375rem;
  height: 12rem;
  box-shadow: 0 0.25rem 0 0.125rem rgba(0, 0, 0, 0.4);
`;

export const CloseContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  min-height: 3.5rem;
  margin-top: 0px;
  align-items: center;
`;

export const ModalTitle = styled.div`
  font-size: 1rem;
  padding: 0.625rem 1.25rem;
  ${(props) => props.theme.FlexRow}
  line-height: 1.3125rem;
  font-weight: bold;
  color: #333333;
  gap: 0 1.25rem;
  > p {
  }
  > span {
  }
`;

const ModlaMainInfo = styled.div`
  width: 100%;
  height: 50%;
  ${(props) => props.theme.FlexCenter}
  gap: 0 1.25rem;
`;

// 마커 클릭시 보여줄 모달
export function PostModal(props) {
  const navigate = useNavigate();
  return (
    <Modal isOpen={props.isOpen} onClose={props.toggle}>
      <ModalTitle>등록완료</ModalTitle>
      <ModlaMainInfo>
        <Button
          GOToDetailButton
          onClick={() => {
            navigate(`/${props?.data?.name}/${props?.data?.number}`);
          }}
        >
          상세보기
        </Button>
      </ModlaMainInfo>
    </Modal>
  );
}
