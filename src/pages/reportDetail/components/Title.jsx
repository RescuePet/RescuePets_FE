import React from "react";
import styled from "styled-components";
import { Body_400_14 } from "../../../style/theme";
import { ContentInformationStyle, FlexAttribute } from "../../../style/Mixin";
import State from "../../../elements/State";

const Title = ({ titleInfo }) => {
  return (
    <TitleWrapper>
      <PetworkState category={titleInfo.state}>{titleInfo.state}</PetworkState>
      <SemiText>{titleInfo.kindCd}</SemiText>
      <img src={titleInfo.sexCd} alt="missingSex" />
      <RegularText>{titleInfo.info}</RegularText>
    </TitleWrapper>
  );
};

const TitleWrapper = styled.div`
  ${FlexAttribute("row", "space-between", "center")}
  width: 20.9375rem;
`;

const PetworkState = styled(State)`
  flex-basis: 2.1875rem;
`;

const SemiText = styled.span`
  flex-basis: 5rem;
  text-align: center;
  ${Body_400_14}
`;

const RegularText = styled.span`
  ${ContentInformationStyle}
  flex-basis: 11.875rem;
`;

export default Title;
