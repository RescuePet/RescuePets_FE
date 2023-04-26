import React from "react";
import styled from "styled-components";
import { FlexAttribute } from "../../../style/Mixin";
import { Body_400_10, Body_400_14 } from "../../../style/theme";

const Receive = ({ message, receiver, receiverImage, chatTime }) => {
  return (
    <ReceiveBox>
      <ReceiverImage src={receiverImage} />
      <ReceiveText>
        <Receiver>{receiver}</Receiver>
        <ReceiveMessage>
          <ReceiveSpan>{message}</ReceiveSpan>
          <ReceiveTimeSpan>{chatTime}</ReceiveTimeSpan>
        </ReceiveMessage>
      </ReceiveText>
    </ReceiveBox>
  );
};
const ReceiveBox = styled.div`
  ${FlexAttribute("row", "flex-start", "")}
  margin: 0rem 1.25rem 0 1.625rem;
  :first-child {
    margin-top: 1rem;
  }
  :last-child {
    margin-bottom: 1.125rem;
  }
`;

const ReceiverImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const ReceiveText = styled.div`
  margin-left: 8px;
  white-space: pre-line;
`;

const ReceiveMessage = styled.div`
  position: relative;
  min-height: 2rem;
  max-width: 15.625rem;
  margin-bottom: 0.5rem;
  padding: 0.375rem 1rem;
  border-radius: 0.25rem;
  background: ${(props) => props.theme.color.text_normal};
  word-break: break-all;
  ::after {
    content: "";
    position: absolute;
    left: 0;
    top: 12px;
    width: 0;
    height: 0;
    border: 0.6875rem solid transparent;
    border-right-color: ${(props) => props.theme.color.text_normal};
    border-left: 0;
    border-top: 0;
    margin-top: -0.1563rem;
    margin-left: -0.3125rem;
  }
`;

const Receiver = styled.span`
  display: inline-block;
  margin-bottom: 2px;
  ${(props) => props.theme.Body_400_12};
  line-height: 18px;
`;

const ReceiveSpan = styled.span`
  ${Body_400_14};
  color: ${(props) => props.theme.color.white};
`;

const ReceiveTimeSpan = styled.span`
  position: absolute;
  right: -31px;
  bottom: 0.0625rem;
  ${Body_400_10};
  color: ${(props) => props.theme.color.text_normal}; ;
`;
export default Receive;
