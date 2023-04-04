import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import { FlexAttribute, HeaderStyle } from "../../style/Mixin";
import { instance } from "../../utils/api";
import CommentList from "./components/CommentList";

import close from "../../asset/Close.svg";
import { useNavigate } from "react-router-dom";

const MyComment = () => {
  const navigate = useNavigate();
  const [mycomment, setMycomment] = useState([]);
  const MycommnetAxios = async () => {
    const response = await instance.get("api/comments/member");
    console.log(response);
    setMycomment(response.data.data);
  };

  useEffect(() => {
    MycommnetAxios();
  }, []);

  return (
    <Layout>
      <MyPostHeader>
        <h2>댓글 목록</h2>
        <CloseSvg src={close} onClick={() => navigate("/profile")} />
      </MyPostHeader>
      <PostInfoContainer>
        <PostInfoWrapper>
          <div>
            <EntireTitle>총 댓글</EntireTitle>
            <EntireCount>{mycomment.length}</EntireCount>
          </div>
        </PostInfoWrapper>
      </PostInfoContainer>
      <ListContainer>
        {mycomment.map((item) => {
          return (
            <CommentList
              key={`comment-item-${item.id}`}
              item={item}
            ></CommentList>
          );
        })}
      </ListContainer>
    </Layout>
  );
};

const MyPostHeader = styled.div`
  position: relative;
  ${FlexAttribute("row", "center")}
  ${HeaderStyle}
  h2 {
    ${(props) => props.theme.Body_500_16};
    color: ${(props) => props.theme.color.text_normal};
    line-height: 1.5rem;
  }
`;

const CloseSvg = styled.img`
  position: absolute;
  right: 1.25rem;
  cursor: pointer;
`;

const PostInfoContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.color.input_border}; ;
`;

const EntireTitle = styled.span`
  ${(props) => props.theme.Body_400_12};
`;

const EntireCount = styled.span`
  margin-left: 8px;
  ${(props) => props.theme.Body_500_12};
  color: ${(props) => props.theme.color.primary_normal};
`;

const EditButton = styled.button`
  ${(props) => props.theme.Body_400_12};
  color: ${(props) => props.theme.color.text_alternative};
`;

const PostInfoWrapper = styled.div`
  ${FlexAttribute("row", "space-between", "center")}
  margin: 8px 20px;
`;

const ListContainer = styled.div`
  ${FlexAttribute("column", "", "center")}
`;

export default MyComment;
