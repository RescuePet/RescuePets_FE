import { css } from "styled-components";

export const FlexAttribute = (direction, justify, align) => css`
  display: flex;
  flex-direction: ${direction};
  align-items: ${align};
  justify-content: ${justify};
`;

export const SignSvgStyle = css`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

export const StateSpanStyle = css`
  padding: 2px;
  border: 1px solid black;
  border-radius: 8px;
  font-weight: 700;
`;
