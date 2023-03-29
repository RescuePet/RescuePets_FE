import React from "react";
import styled, { css } from "styled-components";
import { Body_500_14 } from "../style/theme";

const Button = ({ children, ...props }) => {
  return (
    <>
      <BtnStyle onClick={props.deleteItem} {...props}>
        {children}
      </BtnStyle>
    </>
  );
};

const BtnStyle = styled.button`
  width: 20.9375rem;
  height: 3.5rem;
  border: none;
  border-radius: 0.25rem;
  ${Body_500_14}
  cursor: pointer;
  outline: none;
  ${(props) => props.theme.FlexCenter}
  ${(props) =>
    props.emptyButton &&
    css`
      ${(props) => props.theme.Body_700_14}
      color: ${(props) => props.theme.color.black};
      border: 1px solid ${(props) => props.theme.color.primary_normal};
    `}
    ${(props) =>
    props.fillButton &&
    css`
      ${(props) => props.theme.Body_700_14}
      color: ${(props) => props.theme.color.white};
      background: ${(props) => props.theme.color.primary_normal};
    `}
    ${(props) =>
    props.assistiveFillButton &&
    css`
      ${(props) => props.theme.Body_700_14}
      color: ${(props) => props.theme.color.white};
      background: ${(props) => props.theme.color.text_assistive};
    `}
    ${(props) =>
    props.GOToDetailButton &&
    css`
      width: 9.75rem;
      ${(props) => props.theme.Body_700_14}
      color: ${(props) => props.theme.color.white};
      background: ${(props) => props.theme.color.primary_normal};
    `}
`;

export default Button;
