import React from "react";
import styled, { css } from "styled-components";

const State = ({ children, category }) => {
  return <StateSpan category={category}>{children}</StateSpan>;
};

const StateSpan = styled.span`
  padding: 2px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.white};
  box-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-weight: 500;
  font-size: 10px;
  color: ${(props) => props.theme.color.white};
  ${(props) =>
    props.category === "실종" &&
    css`
      border: 1px solid ${(props) => props.theme.color.status_caution};
      color: ${(props) => props.theme.color.status_caution};
      flex-basis: 35px;
    `}
  ${(props) =>
    props.category === "목격" &&
    css`
      border: 1px solid ${(props) => props.theme.color.status_alert};
      color: ${(props) => props.theme.color.status_alert};
      flex-basis: 35px;
    `}
    ${(props) =>
    props.category === "petworkKind" &&
    css`
      position: absolute;
      top: 16px;
      left: 16px;
      border: 1px solid ${(props) => props.theme.color.white};
      background-color: rgba(138, 138, 138, 0.5);
    `}
    ${(props) =>
    props.category === "adoptionKind" &&
    css`
      position: absolute;
      top: 10px;
      left: 10px;
      border: 1px solid ${(props) => props.theme.color.white};
      background-color: rgba(138, 138, 138, 0.5);
      flex-basis: 35px;
    `}
    ${(props) =>
    props.category === "adoptionDetail" &&
    css`
      flex-basis: 35px;
      color: ${(props) => props.theme.color.status_positive};
      border: 1px solid ${(props) => props.theme.color.status_positive};
    `}
        ${(props) =>
    props.category === "adoptionstate" &&
    css`
      margin-right: 12px;
      flex-basis: 35px;
      color: ${(props) => props.theme.color.status_positive};
      border: 1px solid ${(props) => props.theme.color.status_positive};
    `}
`;

export default State;
