import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import cancel from "../asset/cancel.svg"

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
  backdrop-filter: blur(1px);
`;

const ModalContainer = styled(motion.div)`
  background-color: white;
  margin: auto; /* 추가 */
  border-radius: 0.5rem;
  position: absolute;
  top: 2%;
  width: 21.875rem;
  height: 4rem;
  /* filter: drop-shadow(rgba(0, 0, 0, 0.8) 2px 2px 20px); */
`;
export const ModalMsgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  color: #333333;
  display: flex;    
  align-items: center;
  
  > h2 {
    margin-left: 1.25rem;
    ${props => props.theme.Body_400_14_16}
  }
`;

export const CloseContainer = styled.div`
    position: absolute;
    width: 1rem;
    height: 1rem;
    right: 3%;
    top: 8%;
`;



// Sign 커스텀 모달
export function CheckModal(props) {
    return (
        <>
            {/* 모달밖을 클릭하거나 확인 버튼 클릭시 사라진다  사라진다  */}
            <Modal isOpen={props.isOpen} onClose={props.toggle}>
                <ModalMsgContainer>
                    <CloseContainer><img src={cancel} onClick={props.onClose} /></CloseContainer>
                    <h2>{props.children}</h2> </ModalMsgContainer>
            </Modal>
        </>
    );
}

