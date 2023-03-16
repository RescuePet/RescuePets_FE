import { css } from "styled-components";
import { Body_400_12, Body_400_14, Body_400_14_16 } from "./theme";

//BorderStyle
export const Border_1_color = css`
  border-bottom: 1px solid #eeeeee;
`;

export const Border_2_color = css`
  border-bottom: 2px solid #eeeeee;
`;

//Mixin
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
  background-color: transparent;
  text-align: center;
  font-weight: 500;
  font-size: 10px;
`;

export const InfoTitleTextStyle = css`
  ${Body_400_14}
  color: #999999;
`;

export const PostTitleBorderStyle = css`
  padding-bottom: 16px;
  border-bottom: 2px solid #eeeeee;
`;

export const PostBorderStyle = css`
  padding-bottom: 16px;
  ${Border_1_color};
`;

export const ContentOptionTextStyle = css`
  ${Body_400_14_16}
  color: #666666;
`;

export const ContentTextStyle = css`
  ${Body_400_14_16}
  color: #222222;
`;

export const ContentInformationStyle = css`
  ${Body_400_12}
  color: #666666;
`;
