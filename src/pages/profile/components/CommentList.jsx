import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FlexAttribute } from "../../../style/Mixin";

const CommentList = ({ item }) => {
  const navigate = useNavigate();

  console.log(item);

  const navigateHandler = () => {
    if (item.postType === "MISSING") {
      navigate(`/missingdetail/${item.postId}`);
    } else {
      navigate(`/sightingdetail/${item.postId}`);
    }
  };

  return (
    <ListContainer onClick={navigateHandler}>
      <Image src={item.profileImage} />
      <div>
        <ListTitleWrapper>
          <Title>{item.content}</Title>
          <Info>{item.userNickName}</Info>
        </ListTitleWrapper>
        <AdditionalInfoWrapper>
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

export default CommentList;
