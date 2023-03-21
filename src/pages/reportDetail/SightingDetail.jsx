import React, { useEffect } from "react";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import {
  Border_2_color,
  FlexAttribute,
  PostBorderStyle,
} from "../../style/Mixin";
import ImageCarousel from "./components/ImageCarousel";
import InputContainer from "../../components/InputContainer";
import Title from "./components/Title";
import Location from "./components/Location";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getCatchPostDetail } from "../../redux/modules/petworkSlice";
import {
  toggleEditDone,
  __getCatchComment,
  __postCatchComment,
} from "../../redux/modules/commentSlice";
import Comment from "./components/Comment";

const SightingDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { catchPostDetail } = useSelector((state) => state.petwork);
  const { catchComment, editDone } = useSelector((state) => state?.comment);

  useEffect(() => {
    dispatch(__getCatchPostDetail(id));
    dispatch(__getCatchComment(id));
  }, [id]);

  useEffect(() => {
    if (editDone) {
      window.scrollTo(0, document.body.scrollHeight);
    }
    return () => {
      dispatch(toggleEditDone(false));
    };
  }, [catchComment]);

  if (JSON.stringify(catchPostDetail) === "{}") {
    return <div>로딩 중</div>;
  }

  const titleInfo = {
    state: "목격",
    kindCd: catchPostDetail.kindCd,
    upkind: catchPostDetail.upkind,
    sexCd: catchPostDetail.sexCd,
    info: [
      catchPostDetail.neuterYn,
      catchPostDetail.age,
      catchPostDetail.colorCd,
    ],
  };

  const locationInfo = {
    state: "목격 위치",
    happenLatitude: catchPostDetail.happenLatitude,
    happenLongitude: catchPostDetail.happenLongitude,
  };

  const submitHandler = (content) => {
    let data = {
      id: id,
      content: content,
    };
    dispatch(__postCatchComment(data)).then(() => {
      dispatch(__getCatchComment(id));
    });
  };

  return (
    <Layout>
      <MissingDetailLayout>
        <ImageCarousel images={catchPostDetail?.postImages} />
        <TitleWrapper>
          <Title titleInfo={titleInfo}></Title>
        </TitleWrapper>
        <Location locationInfo={locationInfo}></Location>
        <InfoContainer>
          <InfoWrapper>
            <BodyTitleSvg>📍</BodyTitleSvg>
            <BodyTitleText>위치</BodyTitleText>
            <ContentTextWrapper>
              <ContentText>{catchPostDetail.happenPlace}</ContentText>
            </ContentTextWrapper>
          </InfoWrapper>
          <InfoWrapper>
            <BodyTitleSvg>📍</BodyTitleSvg>
            <BodyTitleText>발견일시</BodyTitleText>
            <ContentTextWrapper>
              <ContentTextBox>
                <ContentOptionText>
                  {catchPostDetail.happenDt} |{" "}
                </ContentOptionText>
                &nbsp;<ContentText>{catchPostDetail.happenHour}</ContentText>
              </ContentTextBox>
            </ContentTextWrapper>
          </InfoWrapper>
          <InfoWrapper>
            <BodyTitleSvg>📍</BodyTitleSvg>
            <BodyTitleText>특징</BodyTitleText>
            <ContentTextWrapper>
              <ContentText>{catchPostDetail.specialMark}</ContentText>
            </ContentTextWrapper>
          </InfoWrapper>
          <InfoWrapper>
            <BodyTitleSvg>📍</BodyTitleSvg>
            <BodyTitleText>메모</BodyTitleText>
            <ContentTextWrapper>
              <ContentText>{catchPostDetail.content}</ContentText>
            </ContentTextWrapper>
          </InfoWrapper>
        </InfoContainer>
        <CommentContainer>
          <CommentButtonWrapper></CommentButtonWrapper>
          <CommentListWrapper>
            {catchComment?.map((item) => {
              return (
                <Comment key={`catch-comment-${item.id}`} item={item}></Comment>
              );
            })}
          </CommentListWrapper>
        </CommentContainer>
        <FloatingChatButton></FloatingChatButton>
      </MissingDetailLayout>
      <InputContainer
        placeholder="댓글을 입력해주세요."
        submitHandler={submitHandler}
      ></InputContainer>
    </Layout>
  );
};

const MissingDetailLayout = styled.div`
  ${FlexAttribute("column", "", "")}
  padding-bottom: 4.75rem;
  width: 100%;
`;

const TitleWrapper = styled.div`
  ${FlexAttribute("row", "center", "center")}
  margin: 16px auto;
  padding-bottom: 16px;
  width: 100%;
  ${Border_2_color}
`;

const InfoContainer = styled.div`
  ${PostBorderStyle}
`;

const InfoWrapper = styled.div`
  ${FlexAttribute("row", "space-evenly")}
`;

const BodyTitleSvg = styled.div`
  flex-basis: 20px;
`;

const BodyTitleText = styled.span`
  flex-basis: 50px;
  padding-top: 2px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #999999;
`;

const ContentTextWrapper = styled.div`
  flex-basis: 220px;
  margin-top: 2px;
  span:first-child {
    margin-bottom: 8px;
  }
`;

const ContentTextBox = styled.div`
  ${FlexAttribute("row")}
`;

const ContentOptionText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #666666;
`;

const ContentText = styled.span`
  display: inline-block;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #222222;
`;

const CommentContainer = styled.div`
  ${FlexAttribute("column", "center", "center")}
`;

const CommentButtonWrapper = styled.div``;

const CommentListWrapper = styled.div`
  ${FlexAttribute("column")}
`;

const FloatingChatButton = styled.div`
  position: fixed;
  bottom: 96px;
  right: 20px;
  width: 56px;
  height: 56px;
  z-index: 10;
  background-color: #666666;
  border-radius: 50%;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export default SightingDetail;
