import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { SignSvgStyle, FlexAttribute } from "../../../style/Mixin";
import location from "../../../asset/location.svg";
import time from "../../../asset/time.svg";
import information from "../../../asset/information.svg";
import Button from "../../../elements/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  __GetLink,
  __PostLink,
  __DeleteLink,
} from "../../../redux/modules/linkSlice";

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
  width: 21.875rem;
  height: 13.75rem;
  padding: 0.625rem;
`;

// 마커 클릭시 보여줄 모달
export function MarkerModal(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstId, setFirstId] = useState("");
  const [secondId, setSecondId] = useState("");
  // console.log(firstId);
  // console.log(secondId);
  const data = props?.data;
  const Stringkm = String(data?.km);

  const Arraykm = Stringkm.split("");
  Arraykm.splice(Arraykm.length - 3, 0, ".");
  const KMDATA = Arraykm.slice(0, 5);

  if (data?.upkind === "DOG") {
    data.upkind = "강아지";
  } else if (data?.upkind === "CAT") {
    data.upkind = "고양이";
  } else if (data?.upkind === "ETC") {
    data.upkind = "기타";
  }

  const linkaddfirst = () => {
    setFirstId(data.id);
    props.onClose();
  };

  const linkaddsecond = () => {
    setSecondId(data.id);
    props.onClose();
  };

  useEffect(() => {
    const one = {
      first: firstId,
      second: {
        linkedPostId: secondId,
      },
    };

    if (firstId !== "" && secondId !== "") {
      dispatch(__PostLink(one)).then((response) => {
        console.log(response);
        if (response.type == "postLink/rejected") {
          // console.log("실패");
          setFirstId("");
          setSecondId("");
        } else if (response.type == "postLink/fulfilled") {
          // console.log("연결성공");
          setFirstId("");
          setSecondId("");
        }
      });
    }
  }, [secondId]);

  const [showLink, setShowLink] = useState("");
  console.log(showLink.length);

  const linkshow = () => {
    dispatch(__GetLink(data.id)).then((response) => {
      if (response.type == "getLink/fulfilled") {
        console.log("통신성공");
        if (response.payload.data == []) {
          console.log("연결은 됬는데 없다");
        } else {
          setShowLink(response.payload.data);
          console.log(response.payload.data);
        }
      } else {
        console.log("통신 실패");
      }
    });
  };

  const linkDelete = () => {
    dispatch(__DeleteLink(data.id)).then((response) => {
      // if (response.type == "getLink/fulfilled") {
      console.log("통신성공");
      //   if (response.payload.data == []) {
      //     console.log("연결은 됬는데 없다");
      //   } else {
      //     console.log(response.payload.data);
      //   }
      // } else {
      //   console.log("통신 실패");
      // }
    });
  };
  console.log(data);
  return (
    <Modal isOpen={props.isOpen} onClose={props.toggle}>
      <ModalInBox>
        {/* <ModalTopLinknumber>
          링크{showLink.length == 0 ? null : showLink.length}
        </ModalTopLinknumber>
        <ModalSideLinkLook onClick={linkshow}>🔍</ModalSideLinkLook>
        {firstId === "" ? (
          <ModalSideLinkadd onClick={linkaddfirst}>➕1</ModalSideLinkadd>
        ) : (
          <ModalSideLinkadd onClick={linkaddsecond}>➕2</ModalSideLinkadd>
        )} */}
        <ModalSideDelete onClick={linkDelete}>🗑</ModalSideDelete>
        <ModalTitle>
          <ModalTitleinfo>
            {data?.name !== "missingdetail" ? (
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
                펫이름:&nbsp;{data?.petName} / 색깔: {data?.colorCd}
              </span>
            ) : (
              <span>
                <img src={information} />
                작성자:&nbsp;{data?.nickname} / 색깔: {data?.colorCd}
              </span>
            )}

            <h4>
              <Button
                moveToDetailButton
                type="button"
                onClick={() => {
                  props.onClose();
                  navigate(`/${data.name}/${data.id}`);
                }}
              >
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

const ModalInBox = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 0.625rem;
  overflow: hidden;
`;
const ModalTitle = styled.div`
  width: 100%;
  height: 15%;
  ${(props) => props.theme.FlexRow}
`;
const ModalTitleinfo = styled.div`
  position: relative;
  ${FlexAttribute("row", "", "center")}
  display: flex;
  align-items: center;
  width: 70%;
  height: 100%;
  ${(props) => props.theme.Body_400_14}
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
    font-weight: 600;
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

const ModalTopLinknumber = styled.div`
  position: absolute;
  top: -25px;
  right: 1.875rem;
  border-top-right-radius: 0.7rem;
  border-top-left-radius: 0.7rem;
  width: 6.25rem;
  height: 1.5625rem;
  background: white;
  ${(props) => props.theme.FlexCenter}
  ${(props) => props.theme.Body_400_14_16}
`;

const ModalSideLinkLook = styled.div`
  position: absolute;
  ${(props) => props.theme.Body_500_16}
  text-align: center;
  width: 2.25rem;
  height: 2.25rem;
  cursor: pointer;
  background: rgb(255, 255, 255);
  border: solid 3px rgb(220, 220, 220);
  border-radius: 50%;
  top: 0;
  right: -1.25rem;
  box-shadow: 0px 0.125rem 0.125rem rgb(109 109 109);
  ${(props) => props.theme.FlexCenter}
`;

const ModalSideLinkadd = styled.div`
  position: absolute;
  ${(props) => props.theme.Body_500_16}
  text-align: center;
  width: 2.25rem;
  height: 2.25rem;
  cursor: pointer;
  background: rgb(255, 255, 255);
  border: solid 3px rgb(220, 220, 220);
  border-radius: 50%;
  top: 2.5rem;
  right: -1.25rem;
  box-shadow: 0px 0.125rem 0.125rem rgb(109 109 109);
  ${(props) => props.theme.FlexCenter}
`;

const ModalSideDelete = styled.div`
  position: absolute;
  ${(props) => props.theme.Body_500_16}
  text-align: center;
  width: 2.25rem;
  height: 2.25rem;
  cursor: pointer;
  background: rgb(255, 255, 255);
  border: solid 3px rgb(220, 220, 220);
  border-radius: 50%;
  top: 5rem;
  right: -1.25rem;
  box-shadow: 0px 0.125rem 0.125rem rgb(109 109 109);
  ${(props) => props.theme.FlexCenter}
`;

const ModalTitleKm = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  width: 30%;
  height: 100%;
  gap: 0 3.4375rem;
  ${(props) => props.theme.Body_400_12}
`;

const ModlaMiddlContianer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
  gap: 0 1.125rem;
`;

const ModlaMiddleInfoBox = styled.div`
  width: 65%;
  height: 5.8125rem;
  padding: 0.3125rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.3125rem 0;
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

const ModlaImgInfoBox = styled.div`
  width: 30%;
  height: 5.8125rem;
  > div {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    > img {
      width: 6.0625rem;
      height: 6.375rem;
      border-radius: 0.3125rem;
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
