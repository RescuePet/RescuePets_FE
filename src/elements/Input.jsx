import React from "react";
import styled, { css } from "styled-components";

const Input = ({ children, ...props }) => {
  return <DefailtInput {...props}>{children}</DefailtInput>;
};

export default Input;
const DefailtInput = styled.input`
  width: 9.75rem;
  height: 1.5625rem;
  margin-top: 0.3125rem;
  border-bottom: 0.125rem solid #eeeeee;
  background: transparent;
  font-size: 12px;
  cursor: pointer;
  ${(props) =>
    props.lg &&
    css`
      width: 335px;
    `}
  ${(props) =>
    props.signlg &&
    css`
      width: 20.9375rem;
      height: 2.875rem;
      font-size: 0.75rem;
      ::placeholder {
        color: #cccccc;
      }
    `}
    &:hover {
    cursor: pointer;
    transition: 0.2s ease;
  }
`;
