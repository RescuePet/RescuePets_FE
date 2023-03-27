import { css } from "styled-components";

export const color = {
  primary_nomal: "#FF9900",
  primary_strong: "#FF8A00",
  primary_heavy: "#FF7A00",
  primary_altemative: "#FFC672",
  primary_assistive: "#FFE4BC",
  text_strong: "#000000",
  text_nomal: "#171717",
  text_alternative: "#8A8A8A",
  text_assistive: "#C4C4C4",
  text_disable: "#DCDCDC",
  background_primary: "#FFFFFF",
  background_secondary: "#F2F2F7",
  background_tertiary: "#F2F2F7",
  line_nomal: "#E1E2E4",
  line_alternative: "#F4F4F5",
  status_alert: "#714FD1",
  status_caution: "#D6459C",
  status_positive: "#005247",
  white: "#ffffff",
  black: "#000000",
  gary: "#666666",
  input_border: "#EEEEEE",
};

export const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexColumn = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const FlexRow = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BorderRadius = css`
  border-radius: 4px;
`;

// Text Style
export const Title_700_18 = css`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
`;

export const Button_700_16 = css`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
`;

export const Body_700_14 = css`
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
`;

export const Body_500_16 = css`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
`;

export const Body_500_14 = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`;

export const Body_400_20_14 = css`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`;

export const Body_400_14 = css`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`;

export const Body_400_14_16 = css`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`;

export const Body_400_12 = css`
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
`;

export const Body_400_10 = css`
  font-weight: 400;
  font-size: 10px;
  line-height: 10px;
`;

export const Body_300_10 = css`
  font-weight: 300;
  font-size: 10px;
  line-height: 16px;
`;

export const Span_alert = css`
  padding-top: 5px;
  font-size: 12px;
  color: #ea5455;
  ${(props) => props.theme.FlexCenter}
`;
