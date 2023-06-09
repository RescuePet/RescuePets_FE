import React, { useRef } from "react";
import Button from "../elements/Button";
import styled, { css } from "styled-components";
import { FlexAttribute } from "../style/Mixin";
import { useDispatch } from "react-redux";
import { toggleOption } from "../redux/modules/menubarSlice";
import ModalPortal from "../elements/ModalPortal";
import { toUp } from "../style/Animation";
import useOutSideClick from "../hooks/useOutsideClick";

const Option = ({ setting, mapCloseHandler }) => {
  const dispatch = useDispatch();
  const closeHandler = () => {
    dispatch(toggleOption());
  };

  const optionRef = useRef();

  let handler = null;

  if (mapCloseHandler) {
    handler = mapCloseHandler;
  } else {
    handler = closeHandler;
  }

  useOutSideClick(optionRef, handler);

  return (
    <>
      <ModalPortal>
        <OptionBackground></OptionBackground>
        <OptionContainer>
          <OptionWrapper ref={optionRef}>
            {setting.map((item, index) => {
              return (
                <OptionSelect
                  key={`Meatball-option-${index}`}
                  color={item.color}
                  onClick={item.handler}
                >
                  <span>{item.option}</span>
                </OptionSelect>
              );
            })}
          </OptionWrapper>
          {mapCloseHandler ? (
            <Button OptionClose onClick={mapCloseHandler}>
              닫기
            </Button>
          ) : (
            <Button OptionClose onClick={closeHandler}>
              닫기
            </Button>
          )}
        </OptionContainer>
      </ModalPortal>
    </>
  );
};

const OptionBackground = styled.div`
  position: fixed;
  inset: 0;
  z-index: 500;
  background-color: rgba(0, 0, 0, 0.5);
`;

const OptionContainer = styled.div`
  position: fixed;
  ${FlexAttribute("column", "flex-end", "center")};
  bottom: 0;
  right: calc(50% - 215px);
  height: 100%;
  width: 430px;
  z-index: 600;
`;

const OptionWrapper = styled.div`
  width: 80%;
  margin-bottom: 8px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.color.white};
  animation: ${toUp} 0.5s ease-in-out;
`;

const OptionSelect = styled.div`
  ${FlexAttribute("row", "center", "center")}
  width: 100%;
  height: 56px;
  color: ${(props) => props.theme.color.text_normal};
  cursor: pointer;
  :not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.color.text_disable};
  }
  span {
    ${(props) => props.theme.Body_500_14};
    ${(props) =>
      props.color === "report" &&
      css`
        color: ${(props) => props.theme.color.status_caution};
      `};
    ${(props) =>
      props.color === "normal" &&
      css`
        color: ${(props) => props.theme.color.text_normal};
      `};
    ${(props) =>
      props.color === "MEMBER" &&
      css`
        color: ${(props) => props.theme.color.primary_normal};
      `}
    ${(props) =>
      props.color === "MANAGER" &&
      css`
        color: ${(props) => props.theme.color.status_positive};
      `}
  }
`;

export default Option;
