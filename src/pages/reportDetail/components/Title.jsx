import React from "react";
import styled, { css } from "styled-components";
import { Body_400_14 } from "../../../style/theme";
import { ContentInformationStyle, FlexAttribute } from "../../../style/Mixin";

const Title = ({ titleInfo }) => {
  return (
    <TitleWrapper>
      <State category={titleInfo.state}>{titleInfo.state}</State>
      <SemiText>{titleInfo.kindCd}</SemiText>
      <img src={titleInfo.sexCd} alt="missingSex" />
      <RegularText>{titleInfo.info}</RegularText>
    </TitleWrapper>
  );
};

const TitleWrapper = styled.div`
  ${FlexAttribute("row", "space-between", "center")}
  width: 335px;
`;

const State = styled.span`
  padding: 2px;

  border-radius: 8px;
  background-color: ${(props) => props.theme.white};
  text-align: center;
  font-weight: 500;
  font-size: 10px;

  box-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.1);
  flex-basis: 35px;
  ${(props) =>
    props.category === "실종" &&
    css`
      border: 1px solid ${(props) => props.theme.color.status_caution};
      color: ${(props) => props.theme.color.status_caution};
    `}
  ${(props) =>
    props.category === "목격" &&
    css`
      border: 1px solid ${(props) => props.theme.color.status_alert};
      color: ${(props) => props.theme.color.status_alert};
    `}
`;

const SemiText = styled.span`
  flex-basis: 80px;
  text-align: center;
  ${Body_400_14}
`;

const RegularText = styled.span`
  ${ContentInformationStyle}
  flex-basis: 190px;
`;

export default Title;
