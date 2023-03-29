import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';


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
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  position: absolute;
  bottom: 0%;
  width: 23.4375rem;
  height: 15rem;
  box-shadow: 0 4px 0 2px rgba(0,0,0,0.4);
  padding: 10px;
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

export const ModalInBox = styled.div`
    width: 100%;
    height: 100%;
`
export const ModalTitle = styled.div`
    width: 100%;
    height: 15%;
    ${props => props.theme.FlexRow}
`;
export const ModalTitleinfo = styled.div`
       display: flex;
       align-items: center;
       width: 50%;
       height: 100%;
       /* border: 1px solid blue; */
       gap: 0 .625rem;
       h1 {
        border: 1px solid #D6459C;
        color: #D6459C;
        width: 40px;
        height: 20px;
        ${props => props.theme.FlexCenter}
        border-radius:8px;
        padding: 4px, 4px, 2px, 4px;
       }
`;
export const ModalTitleKm = styled.div`
       display: flex;
       align-items: center;
       justify-content: right;
       width: 50%;
       height: 100%;
       border: 1px solid blue;
`;



const ModlaMainInfo = styled.div`
    width: 100%;
    height: 50%;
    border: 1px solid red;
`

// 마커 클릭시 보여줄 모달 
export function MarkerModal(props) {
    const data = props?.data
    const Stringkm = String(data?.km)
    const Arraykm = Stringkm.split('')
    Arraykm.splice(Arraykm.length - 3, 0, '.')
    const KMDATA = Arraykm.slice(0, 5)


    return (
        <Modal isOpen={props.isOpen} onClose={props.toggle}>
            <ModalInBox >
                <ModalTitle>
                    <ModalTitleinfo>
                        {
                            data?.type === 'catch' ? <h1>목격</h1> : <h1 style={{ border: "1px solid #714FD1", color: "#714FD1" }}>실종</h1>
                        }

                        <h2>{data?.upkind}</h2>
                        <h3>{data?.kindCd}</h3>
                    </ModalTitleinfo>
                    <ModalTitleKm>
                        <h3>{KMDATA}Km</h3>
                    </ModalTitleKm>
                    {/* <div>{data?.upkind}</div>
                    <div>{data?.kindCd}</div> */}
                </ModalTitle>
            </ModalInBox>
            {/* <ModalTitle>
                <h1>{data?.upkind}</h1>
                <h2>{data?.kindCd}</h2>
                <h3>{data?.id}번</h3>
                <h4>{KMDATA}Km</h4>
            </ModalTitle>
            <ModlaMainInfo>
                위치 : {data?.happenPlace}
                {
                    data?.postImages?.map((item, index) => {
                        return <img src={item?.imageURL} key={index} style={{ width: "100px", height: "100px" }} />
                    })
                }
            </ModlaMainInfo> */}
        </Modal >
    );
}