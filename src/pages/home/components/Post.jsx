import React from "react";
import styled from "styled-components";
import { FlexAttribute } from "../../../style/Mixin";

const Post = () => {
  return (
    <PostContainer>
      <ThunbnailWrapper>
        <Tuumbnail></Tuumbnail>
      </ThunbnailWrapper>
      <InformationWrapper>
        <TitleBox>
          <h2>러시안 블루</h2>
          <span>성별</span>
        </TitleBox>
        <TextBox>
          <span>이미지</span>
          <span>수원시 동물 보호 센터</span>
        </TextBox>
        <TextBox>
          <span>이미지</span>
          <span>수원시 동물 보호 센터</span>
        </TextBox>
        <TextBox>
          <span>이미지</span>
          <span>수원시 동물 보호 센터</span>
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
  width: 120px;
  height: 120px;
  border-radius: 4px;
  background-color: #cccccc;
`;

const Tuumbnail = styled.div``;

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
