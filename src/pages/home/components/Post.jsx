import React from "react";

import styled from "styled-components";
import { FlexAttribute, StateSpanStyle } from "../../../style/Mixin";
import location from "../../../asset/location.svg";
import time from "../../../asset/time.svg";
import information from "../../../asset/information.svg";

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
  z-index: 10;
  backdrop-filter: blur(3px);
`;

const KindSpan = styled.span`
  ${StateSpanStyle}
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
`;

const InformationWrapper = styled.div`
  padding: 8px 15px;
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
  ${FlexAttribute("row", "", "flex-start")}
  margin-top: 2px;
  span {
    ${(props) => props.theme.Body_400_12}
    color: #999999;
    line-height: 18px;
  }
`;

export default Post;
