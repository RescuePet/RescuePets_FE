import React, { useState } from "react";
import styled from "styled-components";
import State from "../../../elements/State";
import { FlexAttribute } from "../../../style/Mixin";

import male from "../../../asset/male.svg";
import female from "../../../asset/female.svg";
import questionmark from "../../../asset/questionmark.svg";
import { useNavigate } from "react-router-dom";
import Option from "../../../components/Option";
import { useDispatch } from "react-redux";
import { __deletePost } from "../../../redux/modules/petworkSlice";
import Meatballs from "../../../asset/Meatballs";
import { deleteMyPost } from "../../../redux/modules/profileSlice";

const PostList = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postOption, setPostOption] = useState(false);

  const refineDataHandler = () => {
    let neuterYn;
    let refineData = {
      ...item,
      sexCd: null,
      info: [],
      URL: null,
    };
    if (item.postType === "MISSING") {
      refineData.postType = "실종";
      refineData.URL = "/missingdetail";
    } else if (item.postType === "CATCH") {
      refineData.postType = "목격";
      refineData.URL = "/catchdetail";
    }
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

  const myPostHandler = (e) => {
    e.stopPropagation();
    setPostOption(!postOption);
  };

  const closePostOption = () => {
    setPostOption(!postOption);
  };

  const deleteHandler = () => {
    if (refineData.postType === "실종") {
      const payload = {
        id: item.id,
        type: "missing",
      };
      dispatch(__deletePost(payload)).then(() => {
        setPostOption(!postOption);
      });
    } else if (refineData.postType === "목격") {
      const payload = {
        id: item.id,
        type: "catch",
      };
      dispatch(__deletePost(payload)).then(() => {
        setPostOption(!postOption);
      });
    }
    dispatch(deleteMyPost(item.id));
  };

  const editHandler = () => {
    if (refineData.postType === "실종") {
      setPostOption(!postOption);
      navigate(`/editmissing/${refineData.id}`);
    } else if (refineData.postType === "목격") {
      setPostOption(!postOption);
      navigate(`/editcatch/${refineData.id}`);
    }
  };

  const optionMySetting = [
    {
      option: "게시물 수정하기",
      color: "normal",
      handler: editHandler,
    },
    {
      option: "게시물 삭제하기",
      color: "report",
      handler: deleteHandler,
    },
  ];

  return (
    <>
      <ListContainer
        onClick={() => navigate(`${refineData.URL}/${refineData.id}`)}
      >
        <Image src={item.postImages[0].imageURL} />
        <div>
          <ListTitleWrapper>
            <State category={refineData.postType}>{refineData.postType}</State>
            <Title>{item.kindCd}</Title>
            <SexCd src={refineData.sexCd} />
            <Info>{refineData.info.join("/")}</Info>
          </ListTitleWrapper>
          <AdditionalInfoWrapper>
            <span>{item.happenDt}</span>
          </AdditionalInfoWrapper>
        </div>
        <PostMeatballs onClick={myPostHandler} />
      </ListContainer>
      {postOption && (
        <Option setting={optionMySetting} mapCloseHandler={closePostOption} />
      )}
    </>
  );
};

const ListContainer = styled.div`
  position: relative;
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
  margin-left: 5px;
  ${(props) => props.theme.Body_500_14};
  white-space: nowrap;
`;

const SexCd = styled.img``;

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

const PostMeatballs = styled(Meatballs)`
  position: absolute;
  left: calc(100% - 26px);
  cursor: pointer;
  z-index: 10;
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
