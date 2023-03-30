import React from "react";
import styled from "styled-components";
import { FlexAttribute } from "../../../style/Mixin";

const Shelter = ({ item }) => {
  return (
    <ShelterWrapper>
      <BodyTitleSvg src={item.icon}></BodyTitleSvg>
      <BodyTitleText>{item.option}</BodyTitleText>
      <ContentTextWrapper>
        {typeof item.data === "object" ? (
          <>
            <ContentText>{item.data[0]}</ContentText>
            <ContentTextBox>
              <ContentOptionText>TEL |&nbsp;</ContentOptionText>
              <ContentText>{item.data[1]}</ContentText>
            </ContentTextBox>
          </>
        ) : (
          <ContentText>{item.data}</ContentText>
        )}
      </ContentTextWrapper>
    </ShelterWrapper>
  );
};

const ShelterWrapper = styled.div`
  ${FlexAttribute("row", "space-evenly")}
`;

const BodyTitleSvg = styled.img`
  flex-basis: 1.5rem;
  height: 1.5rem;
`;

const BodyTitleText = styled.span`
  flex-basis: 3.125rem;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: #999999;
  vertical-align: middle;
  white-space: nowrap;
`;

const ContentTextWrapper = styled.div`
  flex-basis: 13.75rem;
  span:first-child {
    margin-bottom: 0.5rem;
  }
`;

const ContentTextBox = styled.div`
  ${FlexAttribute("row")}
`;

const ContentOptionText = styled.span`
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: #666666;
`;

const ContentText = styled.span`
  display: inline-block;

  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: #222222;
`;

export default Shelter;
