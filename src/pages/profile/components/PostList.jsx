import React from "react";
import styled from "styled-components";
import State from "../../../elements/State";
import { FlexAttribute } from "../../../style/Mixin";
import { color } from "../../../style/theme";

import ClippingFill from "../../../asset/profile/ClippingFill";
import Clippingwhite from "../../../asset/Clippingwhite";
import male from "../../../asset/male.svg";
import female from "../../../asset/female.svg";
import questionmark from "../../../asset/questionmark.svg";

const PostList = ({ item }) => {
  console.log(item);

  const refineDataHandler = () => {
    let neuterYn;
    let refineData = {
      sexCd: null,
      info: [],
    };
    if (item.sexCd === "MALE") {
      refineData.sexCd = male;
    } else if (item.sexCd === "FEMALE") {
      refineData.sexCd = female;
    } else {
      refineData.sexCd = questionmark;
    }
    if (item.neuterYn === "YES") {
      neuterYn = "중성화 O";
    } else if (item.neuterYn === "NO") {
      neuterYn = "중성화 X";
    } else if (item.neuterYn === "UNKNOWN") {
      neuterYn = "중성화 ?";
    }
    refineData.info.push(neuterYn);
    refineData.info.push(item.age + "살");
    refineData.info.push(item.weight + "Kg");

    return refineData;
  };
  const refineData = refineDataHandler();

  console.log(refineData);
  return (
    <ListContainer>
      <Image src={item.postImages[0].imageURL} />
      <div>
        <ListTitleWrapper>
          {/* {category === "myPost" && <State category="목격">목격</State>} */}

          <Title>{item.kindCd}</Title>
          <SexCd src={refineData.sexCd} />
          <Info>{refineData.info.join("/")}</Info>
        </ListTitleWrapper>
        <AdditionalInfoWrapper>
          <span>{item.happenDt}</span>
          {/* <span>댓글 &nbsp; 2</span>
          <span>북마크 &nbsp; 0</span> */}
        </AdditionalInfoWrapper>
      </div>
      {/* <CommentInfo>
        <span>1</span>
      </CommentInfo>
      <ScrapInfo></ScrapInfo> */}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  ${FlexAttribute("row", "", "center")}
  width: 335px;
  padding: 16px 0;
  border-bottom: 1px solid ${(props) => props.theme.color.input_border}; ;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
`;

const ListTitleWrapper = styled.div`
  ${FlexAttribute("row", "", "center")}
  margin-left: 16px;
`;

const Title = styled.span`
  margin-right: 10px;
  ${(props) => props.theme.Body_500_14};
  white-space: nowrap;
`;

const SexCd = styled.img`
  margin-right: 10px;
`;

const Info = styled.span`
  ${(props) => props.theme.Body_400_12};
  color: ${(props) => props.theme.color.text_alternative};
  white-space: nowrap;
`;

const AdditionalInfoWrapper = styled.div`
  margin-top: 2px;
  margin-left: 16px;
  span {
    :not(:first-child) {
      margin-left: 8px;
    }
    ${(props) => props.theme.Body_400_10};
    color: ${(props) => props.theme.color.text_assistive};
  }
`;

const CommentInfo = styled.div`
  width: 28px;
  height: 28px;
  border: 1px solid ${(props) => props.theme.color.text_alternative};
  border-radius: 50%;
  text-align: center;
  span {
    ${(props) => props.theme.Body_300_10};
    color: ${(props) => props.theme.color.text_alternative};
    line-height: 28px;
  }
`;

const ScrapInfo = styled.div`
  width: 24px;
  height: 24px;
  background-color: black;
`;

export default PostList;
