import React from "react";

import styled from "styled-components";
import { FlexAttribute, StateSpanStyle } from "../../../style/Mixin";
import location from "../../../asset/location.svg";
import time from "../../../asset/time.svg";
import information from "../../../asset/information.svg";

import ClippingEmpty from "../../../asset/Clippingwhite.jsx";

const Post = ({ item }) => {
  return (
    <PostContainer>
      <ThunbnailWrapper image={item.filename}>
        <Tuumbnail src={item.filename}></Tuumbnail>
        <KindSpan>{item.data.refinedata.kind}</KindSpan>
      </ThunbnailWrapper>
      <InformationWrapper>
        <TitleBox>
          <h2>{item.data.refinedata.kindCd}</h2>
          <img src={item.data.refinedata.sexCd} alt="sexCd" />
          <ScrapState />
        </TitleBox>
        <TextBox>
          <img src={location} alt="location" />
          <span>{item.careNm}</span>
        </TextBox>
        <TextBox>
          <img src={time} alt="time" />
          <span>{item.happenDt}</span>
        </TextBox>
        <TextBox>
          <img src={information} alt="information" />
          <span>{item.data.refinedata.information.join("/")}</span>
        </TextBox>
      </InformationWrapper>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  ${FlexAttribute("row", "space-between", "center")}
  margin-top: 16px;
  width: 335px;
  border: 1px solid ${(props) => props.theme.color.text_disable};
  border-radius: 4px;
  cursor: pointer;
`;

const ThunbnailWrapper = styled.div`
  position: relative;
  ${FlexAttribute("row", "center", "center")};
  width: 120px;
  height: 120px;
  border-radius: 4px;
  overflow: hidden;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: cover;
`;

const Tuumbnail = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  position: absolute;
  backdrop-filter: blur(3px);
`;

const KindSpan = styled.span`
  ${StateSpanStyle}
  position: absolute;
  top: 10px;
  left: 10px;
`;

const InformationWrapper = styled.div`
  padding: 8px 15px;
  width: 213px;
`;

const TitleBox = styled.div`
  position: relative;
  ${FlexAttribute("row", "", "center")}
  h2 {
    ${(props) => props.theme.Body_400_14};
    padding-top: 2px;
  }
`;

const ScrapState = styled(ClippingEmpty)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  path {
    fill: ${(props) => props.theme.color.text_alternative};
  }
`;

const TextBox = styled.div`
  ${FlexAttribute("row", "", "flex-start")}
  margin-top: 2px;
  span {
    ${(props) => props.theme.Body_400_12}
    color: #999999;
    line-height: 18px;
  }
`;

export default Post;
