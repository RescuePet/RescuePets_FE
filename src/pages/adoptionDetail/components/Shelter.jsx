import React from "react";
import styled from "styled-components";
import { FlexAttribute } from "../../../style/Mixin";

const Shelter = ({ item }) => {
  return (
    <ShelterWrapper>
      <BodyTitleSvg>📍</BodyTitleSvg>
      <BodyTitleText>{item.option}</BodyTitleText>
      <ContentTextWrapper>
        {typeof item.data === "object" ? (
          <>
            <ContentText>{item.data[0]}</ContentText>
            <ContentTextBox>
              <ContentOptionText>TEL | </ContentOptionText>
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

const BodyTitleSvg = styled.div`
  flex-basis: 20px;
`;

const BodyTitleText = styled.span`
  flex-basis: 50px;
  padding-top: 2px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #999999;
`;

const ContentTextWrapper = styled.div`
  flex-basis: 220px;
  margin-top: 2px;
  span:first-child {
    margin-bottom: 8px;
  }
`;

const ContentTextBox = styled.div`
  ${FlexAttribute("row")}
`;

const ContentOptionText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #666666;
`;

const ContentText = styled.span`
  display: inline-block;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #222222;
`;

export default Shelter;
