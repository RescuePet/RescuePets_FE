import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FlexAttribute } from "../../../style/Mixin";
import State from "../../../elements/State";

const CommentList = ({ item }) => {
  const navigate = useNavigate();

  console.log(item);

  const navigateHandler = () => {
    if (item.postType === "MISSING") {
      navigate(`/missingdetail/${item.postId}`);
    } else {
      navigate(`/catchdetail/${item.postId}`);
    }
  };

  const refineData = {
    ...item,
  };

  if (item.postType === "MISSING") {
    refineData.postType = "실종";
  } else if (item.postType === "CATCH") {
    refineData.postType = "목격";
  }

  return (
    <ListContainer onClick={navigateHandler}>
      <Image src={item.postImageURL} />
      <div>
        <ListTitleWrapper>
          <Title>{item.content}</Title>
          <Info>{item.userNickName}</Info>
        </ListTitleWrapper>
        <AdditionalInfoWrapper>
          <State category={refineData.postType}>{refineData.postType}</State>
          <span>{item.modifiedAt.substring(0, 10)}</span>
        </AdditionalInfoWrapper>
      </div>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  ${FlexAttribute("row", "", "center")}
  width: 335px;
  padding: 16px 0;
  border-bottom: 1px solid ${(props) => props.theme.color.input_border};
  cursor: pointer;
  :hover {
    transform: translate(0px, -1px);
    box-shadow: 0px 1px ${(props) => props.theme.color.primary_strong};
    transition: 0.3s;
  }
  :active {
    background-color: ${(props) => props.theme.color.background_tertiary};
    transform: translate(0px, 1px);
    box-shadow: none;
    border-bottom: 1px solid ${(props) => props.theme.color.primary_strong};
    transition: 0.3s;
  }
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
  margin-right: 5px;
  ${(props) => props.theme.Body_500_14};
  white-space: nowrap;
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
      ${(props) => props.theme.Body_400_10};
      color: ${(props) => props.theme.color.text_assistive};
    }
  }
`;

export default CommentList;
