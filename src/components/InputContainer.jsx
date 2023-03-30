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
  width: 26.875rem;
  height: 4.625rem;
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
  flex-basis: 16.4375rem;
`;

const Input = styled.input`
  width: 16.4375rem;
  height: 2rem;
  padding-left: 1.5625rem;
  ${Body_400_12}
  ${InputBorder_1};
  ::placeholder {
    ${Body_400_12}
    color: #CCCCCC;
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  right: 0.25rem;
  transform: translate(0, 0.25rem);
  width: 1.5rem;
  height: 1.5rem;
  background-color: #eeeeee;
  border-radius: 50%;
`;

export default InputContainer;
