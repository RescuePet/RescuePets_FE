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
  flex-basis: 24px;
  height: 24px;
`;

const BodyTitleText = styled.span`
  flex-basis: 50px;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #999999;
  vertical-align: middle;
`;

const ContentTextWrapper = styled.div`
  flex-basis: 220px;
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
  line-height: 24px;
  color: #666666;
`;

const ContentText = styled.span`
  display: inline-block;

  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #222222;
`;

export default Shelter;
