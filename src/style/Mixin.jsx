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
