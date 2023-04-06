import { css } from "styled-components";
import { Body_400_12, Body_400_14, Body_400_14_16 } from "./theme";

//BorderStyle
export const Border_1_color = css`
  border-bottom: 0.0625rem solid #eeeeee;
`;

export const Border_2_color = css`
  border-bottom: 0.125rem solid #eeeeee;
`;

export const InputBorder_1 = css`
  background: #ffffff;
  border: 0.0625rem solid #cccccc;
  border-radius: 1.25rem;
`;

//Mixin
export const FlexAttribute = (direction, justify, align) => css`
  display: flex;
  flex-direction: ${direction};
  align-items: ${align};
  justify-content: ${justify};
`;

export const HeaderStyle = css`
  width: 100%;
  height: 5rem;
  padding-top: 2.375rem;
  ${Border_2_color}
`;

export const SignSvgStyle = css`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

export const InfoTitleTextStyle = css`
  ${Body_400_14}
  color: #999999;
`;

export const PostTitleBorderStyle = css`
  padding-bottom: 1rem;
  border-bottom: 0.125rem solid #eeeeee;
`;

export const PostBorderStyle = css`
  padding-bottom: 1rem;
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

export const AlertMessageCountStyle = css`
  border-radius: 50%;
  display: inline-block;
  margin-top: 0.25rem;
  padding-top: 2.4px;
  width: 1rem;
  height: 1rem;
  background-color: black;
  font-weight: 500;
  font-size: 0.625rem;
  line-height: 0.75rem;
  text-align: center;
  color: white;
`;

export const FooterStyle = css`
  width: 100%;
  height: 76px;
  border-top: 0.0625rem solid #eeeeee;
  padding-top: 0.625rem;
  ${(props) => props.theme.FlexCenter}
  gap: .625rem 4.5rem;
  position: fixed;
  bottom: 0;
  z-index: 10;
  background-color: white;
  @media screen and (max-width: 26.9375rem) {
    position: fixed;
    bottom: 0%;
    z-index: 11;
  }
`;

export const FloatingButtonStyle = css`
  bottom: 5.625rem;
  right: 0px;
  margin-right: calc(50% - 10.75rem);
`;

export const ButtonBackgroundStyle = css`
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
`;
