import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../elements/Button';
import { NavLink } from 'react-router-dom';

export default function Modal({ isOpen, onClose, children }) {
    const backdropVariants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    };

    const modalVariants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: '-100%', transition: { duration: 0.1 } },
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
  margin: auto;
  border-radius: 0.5rem;
  position: absolute;
  bottom: 0%;
  width: 23.4375rem;
  height: 15rem;
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

export const ModalTitle = styled.div`
  font-size: 16px;
  padding: 10px 20px;
  border: 1px solid red;
  ${props => props.theme.FlexRow}
  /* letter-spacing: -0.5px;
  white-space: pre-line; */
  line-height: 21px;
  font-weight: bold;
  color: #333333;
  gap: 0 20px;
  > p {

  }
  > span {
    
  }
`;

// 마커 클릭시 보여줄 모달 
export function MarkerModal(props) {
    const data = props?.data
    console.log(data)
    return (
        <Modal isOpen={props.isOpen} onClose={props.toggle}>
            <ModalTitle>
                <p>{data?.upkind}</p>
                <span>{data?.kindCd}</span>
                <h4>{data?.id}번</h4>
            </ModalTitle>
            <div>
                위치 : {data?.happenPlace}
                {
                    data?.postImages?.map((item, index) => {
                        return <img src={item?.imageURL} key={index} style={{ width: "100px", height: "100px" }} />
                    })
                }
            </div>
        </Modal >
    );
}