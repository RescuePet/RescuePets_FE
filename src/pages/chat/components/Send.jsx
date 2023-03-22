import React from "react";
import styled from "styled-components";
import { FlexAttribute } from "../../../style/Mixin";
import { Body_400_10, Body_400_14 } from "../../../style/theme";

const Send = ({ message }) => {
  return (
    <SendBox>
      <SendMessage>
        <ContentText>{message}</ContentText>
        {/* <SendTimeSpan>오후 06:15</SendTimeSpan> */}
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
  background: #666666;
  word-break: break-all;
  ::after {
    content: "";
    position: absolute;
    right: 0;
    top: 35%;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-left-color: #666666;
    border-right: 0;
    border-top: 0;
    margin-top: -2.5px;
    margin-right: -5px;
  }
`;

const ContentText = styled.span`
  ${Body_400_14};
  color: white;
`;

const SendTimeSpan = styled.span`
  position: absolute;
  left: -45px;
  bottom: 1px;
  ${Body_400_10}
  color:#CCCCCC;
`;

export default Send;
