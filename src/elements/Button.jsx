import React from "react";
import styled, { css } from "styled-components";
import { Body_500_14 } from "../style/theme";
import { toUp } from "../style/Animation";

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
    (props.emptyButton || props.propName === "emptyButton") &&
    css`
      ${(props) => props.theme.Body_700_14}
      color: ${(props) =>
        props.normal ? props.theme.color.text_normal : props.theme.color.black};
      border: 1px solid ${(props) => props.theme.color.primary_normal};
    `}
    ${(props) =>
    (props.fillButton || props.propName === "fillButton") &&
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
      cursor: default;
    `}
    ${(props) =>
    props.GOToDetailButton &&
    css`
      width: 9.75rem;
      ${(props) => props.theme.Body_700_14}
      color: ${(props) => props.theme.color.white};
      background: ${(props) => props.theme.color.primary_normal};
    `}
    ${(props) =>
    props.moveToDetailButton &&
    css`
      width: 4.7rem;
      height: 1rem;
      ${(props) => props.theme.Body_400_12}
      ${(props) => props.theme.FlexCenter}
      color: ${(props) => props.theme.color.black};
      background: ${(props) => props.theme.color.primary_normal};
      &:hover {
        cursor: pointer;
        transition: 0.2s ease;
      }
    `}
    ${(props) =>
    props.OptionClose &&
    css`
      width: 93%;
      margin-bottom: 32px;
      background-color: ${(props) => props.theme.color.text_disable};
      border-radius: 20px;
      animation: ${toUp} 0.25s ease-in-out;
    `}
    ${(props) =>
    props.search &&
    css`
      height: 30px;
      width: fit-content;
      margin-right: 10px;
      background-color: ${(props) => props.theme.color.primary_normal};
      color: ${(props) => props.theme.color.white};
      cursor: pointer;
      white-space: nowrap;
    `}
  &:active {
    filter: brightness(10%);
  }
`;

export default Button;
