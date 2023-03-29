import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

export default function Modal({ isOpen, onClose, children }) {
    const backdropVariants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    };
    // 위에서 아래에서 
    // 좌에서 우로는 visible x 0 

    const modalVariants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: '-50%', transition: { duration: 0.1 } },
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
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
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
`;

const ModalContainer = styled(motion.div)`
  background-color: white;
  margin: auto; /* 추가 */
  border-radius: 1rem;
  position: absolute;
  bottom: 70%;
  width: 18.75rem;
  height: 8rem;
  /* filter: drop-shadow(rgba(0, 0, 0, 0.8) 2px 2px 20px); */
`;

export const CloseContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  min-height: 56px;
  margin-top: 0px;
  align-items: center;
  `;

export const ModalMsgContainer = styled.div`
  font-size: 16px;
  padding: 40px 30px;
  text-align: center;
  letter-spacing: -0.5px;
  white-space: pre-line;
  line-height: 21px;
  font-weight: bold;
  color: #333333;
`;

const CloseButtonContainer = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

// Sign 커스텀 모달
export function CheckModal(props) {
    return (
        <>
            {/* 모달밖을 클릭하거나 확인 버튼 클릭시 사라진다  사라진다  */}
            <Modal isOpen={props.isOpen} onClose={props.toggle}>
                <ModalMsgContainer>{props.children}</ModalMsgContainer>
                <CloseContainer>
                    <Button onClick={props.onClose} fillButton type="button">
                        확인
                    </Button>
                </CloseContainer>
            </Modal>
        </>
    );
}

// 마커 클릭시 보여줄 모달 
export function MarkerModal(props) {
    console.log(props.data)
    return (
        <Modal isOpen={props.isOpen} onClose={props.toggle}>
            <ModalMsgContainer>{props.data.id}번 마커 </ModalMsgContainer>
            <CloseContainer>
                <Button onClick={props.onClose} fillButton type="button">
                    확인
                </Button>
            </CloseContainer>
        </Modal >
    );
}