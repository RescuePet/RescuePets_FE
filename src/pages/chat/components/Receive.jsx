import React from "react";
import styled from "styled-components";
import { FlexAttribute } from "../../../style/Mixin";
import { Body_400_10, Body_400_14 } from "../../../style/theme";

const Receive = ({ message }) => {
  return (
    <ReceiveBox>
      <ReceiveMessage>
        <ReceiveSpan>{message}</ReceiveSpan>
        {/* <ReceiveTimeSpan>오후 06:15</ReceiveTimeSpan> */}
      </ReceiveMessage>
    </ReceiveBox>
  );
};
const ReceiveBox = styled.div`
  ${FlexAttribute("column", "center", "flex-start")}
  margin: 0px 20px 0 26px;
  :first-child {
    margin-top: 16px;
  }
  :last-child {
    margin-bottom: 18px;
  }
`;

const ReceiveMessage = styled.div`
  position: relative;
  min-height: 32px;
  max-width: 250px;
  margin-bottom: 8px;
  padding: 6px 16px;
  border-radius: 4px;
  background: #999999;
  word-break: break-all;
  ::after {
    content: "";
    position: absolute;
    left: 0;
    top: 35%;
    width: 0;
    height: 0;
    border: 11px solid transparent;
    border-right-color: #999999;
    border-left: 0;
    border-top: 0;
    margin-top: -2.5px;
    margin-left: -5px;
  }
`;

const ReceiveSpan = styled.span`
  ${Body_400_14}
`;

const ReceiveTimeSpan = styled.span`
  position: absolute;
  right: -45px;
  bottom: 1px;
  ${Body_400_10}
  color:#CCCCCC;
`;
export default Receive;
