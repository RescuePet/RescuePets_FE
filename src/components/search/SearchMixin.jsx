import { css } from "styled-components";
import { FlexAttribute } from "../../style/Mixin";

export const CategoryBoxStyle = css`
  ${FlexAttribute("row", "center", "center")}
  width: 102px;
  height: 32px;
  margin-left: 4px;
  border: 1px solid
    ${(props) =>
      props.active
        ? props.theme.color.primary_normal
        : props.theme.color.text_disable};
  border-radius: 16px;
  cursor: pointer;
  span {
    ${(props) => props.theme.Body_400_12}
    color: ${(props) =>
      props.active
        ? props.theme.color.primary_normal
        : props.theme.color.text_disable};
  }
`;
