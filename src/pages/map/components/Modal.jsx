import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { SignSvgStyle, FlexAttribute } from "../../../style/Mixin";
import location from "../../../asset/location.svg";
import time from "../../../asset/time.svg";
import information from "../../../asset/information.svg";
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
  height: 13rem;
  /* box-shadow: 0 .25rem 0 .125rem rgba(0,0,0,0.4); */
  padding: 0.625rem;
`;

export const CloseContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  min-height: 3.5rem;
  margin-top: 0rem;
  align-items: center;
`;

export const ModalInBox = styled.div`
  width: 95%;
  height: 100%;
  margin: 0 auto;
`;
export const ModalTitle = styled.div`
  width: 100%;
  height: 15%;
  ${(props) => props.theme.FlexRow}
`;
export const ModalTitleinfo = styled.div`
  /* ${FlexAttribute()} */
  ${FlexAttribute("row", "", "center")}
  display: flex;
  align-items: center;
  width: 70%;
  height: 100%;
  ${(props) => props.theme.Body_400_14}
  /* border: .0625rem solid red; */
       /* gap: 0 10px; */
       h1 {
    border: 0.0625rem solid #d6459c;
    color: #d6459c;
    width: 2.5rem;
    ${(props) => props.theme.FlexCenter}
    border-radius: .5rem;
    padding: 0.25rem, 0.25rem, 0.125rem, 0.25rem;
  }
  h2 {
    padding-left: 0.625rem;
    font-weight: 700;
  }
  h3 {
    padding-left: 0.3125rem;
    color: ${(props) => props.theme.color.gray};
    ${(props) => props.theme.Body_400_12}
  }
  > p {
    padding-left: 10px;
    color: ${(props) => props.theme.color.gray};
    ${(props) => props.theme.Body_400_12}
  }
`;
export const ModalTitleKm = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  width: 30%;
  height: 100%;
  gap: 0 3.4375rem;
  ${(props) => props.theme.Body_400_12}
`;

export const ModlaMiddlContianer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
  gap: 0 0.625rem;
`;

export const ModlaMiddleInfoBox = styled.div`
  width: 65%;
  height: 5.8125rem;
  /* border: .0625rem solid red; */
  padding: 5px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px 0;
  > p {
    width: 100%;
    color: ${(props) => props.theme.color.text_alternative};
    ${(props) => props.theme.Body_400_12};
    display: flex;
    align-items: center;
    > img {
      ${SignSvgStyle}
    }
  }
  > span {
    width: 100%;
    color: ${(props) => props.theme.color.text_alternative};
    ${(props) => props.theme.Body_400_12};
    display: flex;
    align-items: center;
    > img {
      ${SignSvgStyle}
    }
  }
  > h4 {
    ${(props) => props.theme.FlexCenter}
  }
`;
export const ModlaImgInfoBox = styled.div`
  width: 6.0625rem;
  height: 5.8125rem;
  /* border: .0625rem solid red; */
  > div {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    > img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    > p {
      position: absolute;
      ${SignSvgStyle}
      ${(props) => props.theme.FlexCenter}
        background: ${(props) => props.theme.color.gray};
      color: ${(props) => props.theme.color.white};
      ${(props) => props.theme.Body_300_10}
      bottom: 0;
      right: 0;
    }
  }
`;

// 마커 클릭시 보여줄 모달
export function MarkerModal(props) {
  const navigate = useNavigate();

  const data = props?.data;
  // console.log(data)
  const Stringkm = String(data?.km);
  const Arraykm = Stringkm.split("");
  Arraykm.splice(Arraykm.length - 3, 0, ".");
  const KMDATA = Arraykm.slice(0, 5);
  if (data?.upkind === "DOG") {
    data.upkind = "강아지";
  } else if (data?.upkind === "CAT") {
    data.upkind = "고양이";
  }

  // console.log(data)
  // postImages.[0].imageURL

  const MoveToDetailPageHandler = () => {
    navigate(`/${data.name}/${data.id}`);
  };
  return (
    <Modal isOpen={props.isOpen} onClose={props.toggle}>
      <ModalInBox>
        <ModalTitle>
          <ModalTitleinfo>
            {data?.name === "missingdetail" ? (
              <h1
                style={{ border: ".0625rem solid #714FD1", color: "#714FD1" }}
              >
                목격
              </h1>
            ) : (
              <h1>실종</h1>
            )}
            <h2>{data?.upkind}</h2>
            <h3>{data?.kindCd}</h3>
            <p>
              {data?.age}살/{data?.weight}kg
            </p>
          </ModalTitleinfo>
          <ModalTitleKm>
            <h3>거리: {KMDATA}Km</h3>
          </ModalTitleKm>
        </ModalTitle>

        <ModlaMiddlContianer>
          <ModlaMiddleInfoBox>
            <p>
              <img src={location} />
              위치:&nbsp;{data?.happenPlace}
            </p>
            <p>
              <img src={time} />
              일시:&nbsp;{data?.happenDt} / {data?.happenHour}{" "}
            </p>

            {data?.name === "missingdetail" ? (
              <span>
                <img src={information} />
                색깔: {data?.colorCd}
              </span>
            ) : (
              <span>
                <img src={information} />
                이름:&nbsp;{data?.nickname} / 색깔: {data?.colorCd}
              </span>
            )}
            {/* <span><img src={information} />이름:&nbsp;{data?.nickname} / 색깔: {data?.colorCd}</span> */}
            <h4>
              <Button moveToDetailButton onClick={MoveToDetailPageHandler}>
                상세보기
              </Button>
            </h4>
          </ModlaMiddleInfoBox>
          <ModlaImgInfoBox>
            <div>
              {data?.postImages?.length > 0 ? (
                <>
                  <p>{data?.postImages?.length}</p>
                  <img src={data?.postImages[0].imageURL} />
                </>
              ) : null}
            </div>
          </ModlaImgInfoBox>
        </ModlaMiddlContianer>
      </ModalInBox>
    </Modal>
  );
}
