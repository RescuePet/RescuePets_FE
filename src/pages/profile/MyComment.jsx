import React, { useEffect } from "react";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import { FlexAttribute, HeaderStyle } from "../../style/Mixin";
import CommentList from "./components/CommentList";

import close from "../../asset/Close.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getMyComment } from "../../redux/modules/profileSlice";
import { useInView } from "react-intersection-observer";

const MyComment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ref, inView] = useInView();

  const { myCommentList, myCommentPage } = useSelector(
    (state) => state.profile
  );

  console.log(myCommentList);

  const payload = {
    page: myCommentPage,
    size: 15,
  };

  useEffect(() => {
    if (inView) {
      dispatch(__getMyComment(payload));
    }
  }, [inView]);

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
            <EntireCount>{myCommentList.length}</EntireCount>
          </div>
        </PostInfoWrapper>
      </PostInfoContainer>
      <ListContainer>
        {myCommentList.map((item) => {
          return (
            <CommentList
              key={`comment-item-${item.id}`}
              item={item}
            ></CommentList>
          );
        })}
        <div ref={ref}></div>
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

const PostInfoWrapper = styled.div`
  ${FlexAttribute("row", "space-between", "center")}
  margin: 8px 20px;
`;

const ListContainer = styled.div`
  ${FlexAttribute("column", "", "center")}
`;

export default MyComment;
