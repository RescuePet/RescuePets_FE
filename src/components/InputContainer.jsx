import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FlexAttribute, InputBorder_1 } from "../style/Mixin";
import { Body_400_12 } from "../style/theme";
import ChatSubmit from "../asset/ChatSubmit";

const InputContainer = ({ placeholder, submitHandler }) => {
  const { register, reset, handleSubmit } = useForm();
  const textarea = useRef();

  const handleResizeHeight = () => {
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  };

  return (
    <ChatFooter>
      <ChatContainer>
        <InputWrapper
          onSubmit={handleSubmit((register) => {
            submitHandler(register);
            reset();
          })}
        >
          <Input
            placeholder={placeholder}
            {...register("message")}
            rows={1}
            onChange={handleResizeHeight}
            ref={textarea}
          />
          <SubmitButton />
        </InputWrapper>
      </ChatContainer>
    </ChatFooter>
  );
};

const ChatFooter = styled.div`
  ${FlexAttribute("row", "space-around", "center")}
  width: 26.875rem;
  height: auto;
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
`;

const ChatContainer = styled.div`
  ${FlexAttribute("row", "space-evenly", "center")}
  width: 100%;
`;

const InputWrapper = styled.form`
  position: relative;
  height: 100%;
`;

const Input = styled.textarea`
  width: 335px;
  min-height: 30px;
  padding: 10px 25px 5px 20px;
  resize: none;
  line-height: 24px;
  overflow: hidden;
  ${Body_400_12};
  ${InputBorder_1};
  ::placeholder {
    ${Body_400_12}
    color: #CCCCCC;
  }
`;

const SubmitButton = styled(ChatSubmit)`
  position: absolute;
  bottom: 6px;
  right: 0.25rem;
  cursor: pointer;
`;

export default InputContainer;
