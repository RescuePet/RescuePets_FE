import React from "react";
import styled, { css } from "styled-components";

const State = ({ children, category }) => {
  return <StateSpan category={category}>{children}</StateSpan>;
};

const StateSpan = styled.span`
  padding: 0.125rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.white};
  box-shadow: 0.0313rem 0.0313rem 0.0625rem rgba(0, 0, 0, 0.1);
  text-align: center;
  font-weight: 500;
  font-size: 0.625rem;
  color: ${(props) => props.theme.color.white};
  white-space: nowrap;
  ${(props) =>
    props.category === "실종" &&
    css`
      border: 0.0625rem solid ${(props) => props.theme.color.status_caution};
      color: ${(props) => props.theme.color.status_caution};
      background-color: ${(props) => props.theme.color.white};
      flex-basis: 2.1875rem;
    `}
  ${(props) =>
    props.category === "목격" &&
    css`
      border: 0.0625rem solid ${(props) => props.theme.color.status_alert};
      color: ${(props) => props.theme.color.status_alert};
      flex-basis: 2.1875rem;
    `}
    ${(props) =>
    props.category === "petworkKind" &&
    css`
      position: absolute;
      top: 1rem;
      left: 1rem;
      border: 0.0625rem solid ${(props) => props.theme.color.white};
      background-color: rgba(138, 138, 138, 0.5);
    `}
    ${(props) =>
    props.category === "adoptionKind" &&
    css`
      position: absolute;
      top: 0.625rem;
      left: 0.625rem;
      border: 0.0625rem solid ${(props) => props.theme.color.white};
      background-color: rgba(138, 138, 138, 0.5);
      flex-basis: 2.1875rem;
    `}
    ${(props) =>
    props.category === "adoptionDetail" &&
    css`
      flex-basis: 2.1875rem;
      color: ${(props) => props.theme.color.status_positive};
      border: 0.0625rem solid ${(props) => props.theme.color.status_positive};
    `}
        ${(props) =>
    props.category === "adoptionstate" &&
    css`
      margin-right: 0.75rem;
      flex-basis: 2.1875rem;
      color: ${(props) => props.theme.color.status_positive};
      border: 0.0625rem solid ${(props) => props.theme.color.status_positive};
    `}
`;

export default State;
