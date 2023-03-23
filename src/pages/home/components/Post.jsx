import React from "react";

import styled from "styled-components";
import { FlexAttribute, StateSpanStyle } from "../../../style/Mixin";
import location from "../../../asset/location.svg";
import time from "../../../asset/time.svg";
import information from "../../../asset/information.svg";

const Post = ({ item }) => {
  return (
    <PostContainer>
      <ThunbnailWrapper>
        <Tuumbnail src={item.filename}></Tuumbnail>
        <KindSpan>{item.data.refinedata.kind}</KindSpan>
      </ThunbnailWrapper>
      <InformationWrapper>
        <TitleBox>
          <h2>{item.data.refinedata.kindCd}</h2>
          <img src={item.data.refinedata.sexCd} alt="sexCd" />
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
  ${FlexAttribute("row", "space-between", "")}
  margin-top: 16px;
  width: 335px;
  border: 1px solid ${(props) => props.theme.color.text_disable};
  border-radius: 4px;
  cursor: pointer;
`;

const ThunbnailWrapper = styled.div`
  position: relative;
  ${FlexAttribute("row", "center", "center")}
  width: 120px;
  height: 120px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.text_disable};
  overflow: hidden;
`;

const Tuumbnail = styled.img`
  object-fit: contain;
`;

const KindSpan = styled.span`
  ${StateSpanStyle}
  position: absolute;
  top: 10px;
  left: 10px;
`;

const InformationWrapper = styled.div`
  padding: 10px 15px;
  width: 213px;
`;

const TitleBox = styled.div`
  ${FlexAttribute("row", "", "center")}

  h2 {
    font-size: 14px;
  }
  img {
    padding-bottom: 1px;
  }
`;

const TextBox = styled.div`
  ${FlexAttribute("row", "", "center")}
  margin-top: 4px;
  img {
    margin-bottom: 1px;
  }
  span {
    font-size: 12px;
    color: #999999;
  }
`;

export default Post;
