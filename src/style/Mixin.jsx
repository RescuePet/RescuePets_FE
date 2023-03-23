import { css } from "styled-components";
import { Body_400_12, Body_400_14, Body_400_14_16 } from "./theme";

//BorderStyle
export const Border_1_color = css`
  border-bottom: 1px solid #eeeeee;
`;

export const Border_2_color = css`
  border-bottom: 2px solid #eeeeee;
`;

export const InputBorder_1 = css`
  background: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 20px;
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
  padding-top: 2.5rem;
  ${Border_2_color}
  font-size: 1.125rem;
  font-weight: 700;
`;

export const SignSvgStyle = css`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

export const StateSpanStyle = css`
  padding: 2px;
  border: 1px solid ${(props) => props.theme.color.white};
  border-radius: 8px;
  background-color: rgba(138, 138, 138, 0.5);
  text-align: center;
  font-weight: 500;
  font-size: 10px;
  color: ${(props) => props.theme.color.white};
  box-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.1);
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

export const AlertMessageCountStyle = css`
  border-radius: 50%;
  display: inline-block;
  margin-top: 4px;
  padding-top: 0.15rem;
  width: 16px;
  height: 16px;
  background-color: black;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: white;
`;

export const FooterStyle = css`
  width: 100%;
  height: 4.75rem;
  border-top: 1px solid #eeeeee;
  padding-top: 10px;
  ${(props) => props.theme.FlexCenter}
  gap: 10px 72px;
  position: fixed;
  bottom: 0;
  z-index: 10;
  background-color: white;
  @media screen and (max-width: 431px) {
    position: fixed;
    bottom: 0%;
    z-index: 11;
  }
`;
