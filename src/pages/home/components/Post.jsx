import React from "react";

import styled from "styled-components";
import { FlexAttribute, StateSpanStyle } from "../../../style/Mixin";

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
          <span>{item.data.refinedata.sexCd}</span>
        </TitleBox>
        <TextBox>
          <span>📍</span>
          <span>{item.careNm}</span>
        </TextBox>
        <TextBox>
          <span>🕙</span>
          <span>{item.happenDt}</span>
        </TextBox>
        <TextBox>
          <span>ℹ️</span>
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
  border: 1px solid #eeeeee;
  border-radius: 4px;
  cursor: pointer;
`;

const ThunbnailWrapper = styled.div`
  position: relative;
  ${FlexAttribute("row", "center", "center")}
  width: 120px;
  height: 120px;
  border-radius: 4px;
  background-color: #cccccc;
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
  padding: 16px;
  width: 213px;
`;

const TitleBox = styled.div`
  ${FlexAttribute("row", "", "center")}

  h2 {
    font-size: 14px;
  }
  span {
    font-size: 14px;
  }
`;

const TextBox = styled.div`
  margin-top: 8px;
  span {
    font-size: 12px;
    color: #999999;
  }
`;

export default Post;
