import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { FlexAttribute, InputBorder_1 } from "../style/Mixin";
import { Body_400_12 } from "../style/theme";
import ChatSubmit from "../asset/ChatSubmit";
import { useDispatch, useSelector } from "react-redux";

import Close from "../asset/Close.svg";
import { toggleCommentInput } from "../redux/modules/petworkSlice";
import { useLocation } from "react-router-dom";

const InputContainer = ({ placeholder, submitHandler }) => {
  const { register, reset, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const location = useLocation();
  const { CommentInputState } = useSelector((state) => state.petwork);
  const [inputValue, setInputValue] = useState("");

  const message = watch("message", "");

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSubmit((register) => {
        submitHandler(register);
        reset();
      })();
    }
  };

  useEffect(() => {
    const textarea = document.getElementById("message-textarea");
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [message]);

  const handleInputValue = (e) => {
    if (e.target.value.length <= 200) {
      setInputValue(e.target.value);
    }
  };

  return (
    <ChatFooter toggle={CommentInputState}>
      <ChatContainer>
        <InputWrapper
          onSubmit={handleSubmit((register) => {
            submitHandler(register);
            reset();
            setInputValue("");
          })}
        >
          <Input
            placeholder={placeholder}
            rows={1}
            onKeyDown={handleKeyDown}
            id="message-textarea"
            {...register("message", { required: true, maxLength: 200 })}
            value={inputValue}
            onInput={handleInputValue}
          />
          <SubmitButton>
            <ChatSubmit />
          </SubmitButton>
        </InputWrapper>
        {location.pathname.split("/")[1] !== "chatroom" && (
          <CloseBox
            onClick={() => {
              reset();
              dispatch(toggleCommentInput());
            }}
          >
            <CloseImg src={Close} alt="close" />
          </CloseBox>
        )}
      </ChatContainer>
    </ChatFooter>
  );
};

const ChatFooter = styled.div`
  ${FlexAttribute("row", "space-around", "center")}
  width: 26.875rem;
  height: auto;
  min-height: 76px;
  position: fixed;
  bottom: 0;
  padding-top: 1rem;
  padding-bottom: 1.5rem;
  border-top: 0.0625rem solid ${(props) => props.theme.color.text_disable};
  background-color: ${(props) => props.theme.color.white};
  @media screen and (max-width: 26.9375rem) {
    width: 100%;
    position: fixed;
    bottom: 0;
  }
  ${(props) =>
    props.toggle &&
    css`
      z-index: 150;
    `}
`;

const ChatContainer = styled.div`
  ${FlexAttribute("row", "center", "center")}
  width: 100%;
`;

const CloseBox = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 1rem;
  margin-bottom: 5px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
`;

const CloseImg = styled.img`
  border-radius: 50%;
  background-color: transparent;
`;

const InputWrapper = styled.form`
  position: relative;
  height: 100%;
`;

const Input = styled.textarea`
  width: 290px;
  min-height: 30px;
  padding: 3px 30px 3px 20px;
  resize: none;
  overflow: hidden;
  ${Body_400_12};
  line-height: 24px;
  ${InputBorder_1};
  ::placeholder {
    ${Body_400_12}
    line-height: 24px;
    color: #cccccc;
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  bottom: 2px;
  right: 0;
  cursor: pointer;
  background-color: transparent;
`;

export default InputContainer;
