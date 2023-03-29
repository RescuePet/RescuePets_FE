import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FlexAttribute, InputBorder_1 } from "../style/Mixin";
import { Body_400_12 } from "../style/theme";
import picture from "../asset/picture.svg";

const InputContainer = ({ placeholder, submitHandler }) => {
  const { register, reset, handleSubmit } = useForm();

  return (
    <ChatFooter>
      <ChatContainer>
        <div>
          <img src={picture} alt="pictureIcon" />
        </div>
        <InputWrapper
          onSubmit={handleSubmit((register) => {
            submitHandler(register);
            reset();
          })}
        >
          <Input placeholder={placeholder} {...register("message")} />
          <SubmitButton>↑</SubmitButton>
        </InputWrapper>
      </ChatContainer>
    </ChatFooter>
  );
};

const ChatFooter = styled.div`
  ${FlexAttribute("row", "space-around", "center")}
  width: 430px;
  height: 74px;
  position: fixed;
  bottom: 0;
  padding-top: 16px;
  padding-bottom: 24px;
  border-top: 1px solid ${(props) => props.theme.color.text_disable};
  background-color: ${(props) => props.theme.color.white};
  @media screen and (max-width: 431px) {
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
  flex-basis: 263px;
`;

const Input = styled.input`
  width: 263px;
  height: 32px;
  padding-left: 25px;
  ${Body_400_12}
  ${InputBorder_1};
  ::placeholder {
    ${Body_400_12}
    color: #CCCCCC;
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  right: 4px;
  transform: translate(0, 4px);
  width: 24px;
  height: 24px;
  background-color: #eeeeee;
  border-radius: 50%;
`;

export default InputContainer;
