import React from "react";
import styled from "styled-components";
import { FlexAttribute } from "../../../style/Mixin";
import { Body_400_10, Body_400_14 } from "../../../style/theme";

const Send = ({ message, chatTime }) => {
  return (
    <SendBox>
      <SendMessage>
        <ContentText>{message}</ContentText>
        <SendTimeSpan>{chatTime}</SendTimeSpan>
      </SendMessage>
    </SendBox>
  );
};

const SendBox = styled.div`
  ${FlexAttribute("column", "center", "flex-end")}
  margin: 0px 20px 0px 26px;
  :first-child {
    margin-top: 16px;
  }
  :last-child {
    margin-bottom: 18px;
  }
`;

const SendMessage = styled.div`
  position: relative;
  min-height: 32px;
  max-width: 250px;
  margin-bottom: 8px;
  padding: 6px 16px;
  border-radius: 4px;
  background: ${(props) => props.theme.color.primary_normal};
  word-break: break-all;
  white-space: pre-line;
  ::after {
    content: "";
    position: absolute;
    right: 0;
    top: 12px;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-left-color: ${(props) => props.theme.color.primary_normal};
    border-right: 0;
    border-top: 0;
    margin-top: -2.5px;
    margin-right: -5px;
  }
`;

const ContentText = styled.span`
  ${Body_400_14};
  color: ${(props) => props.theme.color.white};
`;

const SendTimeSpan = styled.span`
  position: absolute;
  left: -31px;
  bottom: 1px;
  ${Body_400_10}
  color: ${(props) => props.theme.color.text_normal}; ;
`;

export default Send;
