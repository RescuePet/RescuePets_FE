import React, { useEffect, useRef } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getMissingPostDetail } from "../../redux/modules/petworkSlice";
import Comment from "./components/Comment";
import {
  toggleEditDone,
  __getMissingComment,
  __postMissingComment,
} from "../../redux/modules/commentSlice";
import petworkRefineData from "../../utils/petworkRefine";

import location from "../../asset/location.svg";
import time from "../../asset/time.svg";
import informationIcon from "../../asset/information.svg";
import memo from "../../asset/memo.svg";
import gratuity from "../../asset/gratuity.svg";

const MissingDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollRef = useRef();

  const { missingPostDetail } = useSelector((state) => state?.petwork);
  const { missingComment, editDone } = useSelector((state) => state?.comment);

  console.log(missingPostDetail);

  useEffect(() => {
    dispatch(__getMissingPostDetail(id));
    dispatch(__getMissingComment(id));
  }, [id]);

  useEffect(() => {
    if (editDone) {
      window.scrollTo(0, document.body.scrollHeight);
    }
    return () => {
      dispatch(toggleEditDone(false));
    };
  }, [missingComment]);

  if (JSON.stringify(missingPostDetail) === "{}") {
    return <div>로딩중...</div>;
  }

  const refineData = petworkRefineData(missingPostDetail);

  const titleInfo = {
    state: "실종",
    kindCd: missingPostDetail.kindCd,
    upkind: refineData.upkind,
    sexCd: refineData.sexCd,
    info: refineData.information.join("/"),
  };

  const locationInfo = {
    state: "실종 위치",
    happenLatitude: missingPostDetail.happenLatitude,
    happenLongitude: missingPostDetail.happenLongitude,
  };

  const submitHandler = async (content) => {
    let data = {
      id: id,
      content: content.message,
    };
    dispatch(__postMissingComment(data)).then(() => {
      dispatch(__getMissingComment(id));
    });
  };

  const chatHandler = async () => {
    console.log("hi");
    const postname = "missing-room";
    navigate(`/chatroom/${postname}/${id}`);
  };

  return (
    <Layout ref={scrollRef}>
      <MissingDetailLayout>
        <ImageCarousel images={missingPostDetail.postImages} />
        <TitleWrapper>
          <Title titleInfo={titleInfo}></Title>
        </TitleWrapper>
        <Location locationInfo={locationInfo}></Location>
        <InfoContainer>
          <InfoWrapper>
            <BodyTitleSvg src={location} />
            <BodyTitleText>위치</BodyTitleText>
            <ContentTextWrapper>
              <ContentText>{missingPostDetail.happenPlace}</ContentText>
            </ContentTextWrapper>
          </InfoWrapper>
          <InfoWrapper>
            <BodyTitleSvg src={time} />
            <BodyTitleText>실종일시</BodyTitleText>
            <ContentTextWrapper>
              <ContentTextBox>
                <ContentOptionText>
                  {missingPostDetail.happenDt} |{" "}
                </ContentOptionText>
                &nbsp;<ContentText>{missingPostDetail.happenHour}</ContentText>
              </ContentTextBox>
            </ContentTextWrapper>
          </InfoWrapper>
          <InfoWrapper>
            <BodyTitleSvg src={informationIcon} />
            <BodyTitleText>특징</BodyTitleText>
            <ContentTextWrapper>
              <ContentText>
                {missingPostDetail.specialMark !== null
                  ? missingPostDetail.specialMark
                  : "없음"}
              </ContentText>
            </ContentTextWrapper>
          </InfoWrapper>
          <InfoWrapper>
            <BodyTitleSvg src={memo} />
            <BodyTitleText>메모</BodyTitleText>
            <ContentTextWrapper>
              <ContentText>
                {missingPostDetail.content !== null
                  ? missingPostDetail.content
                  : "없음"}
              </ContentText>
            </ContentTextWrapper>
          </InfoWrapper>
          {missingPostDetail.gratuity && (
            <InfoWrapper>
              <BodyTitleSvg src={gratuity} />
              <BodyTitleText>사례금</BodyTitleText>
              <ContentTextWrapper>
                <ContentText>{missingPostDetail.gratuity}원</ContentText>
              </ContentTextWrapper>
            </InfoWrapper>
          )}
        </InfoContainer>
        <CommentContainer>
          <CommentButtonWrapper></CommentButtonWrapper>
          <CommentListWrapper>
            {missingComment?.map((item) => {
              return (
                <Comment
                  key={`missing-comment-${item.id}`}
                  item={item}
                ></Comment>
              );
            })}
          </CommentListWrapper>
          <FloatingChatButton
            onClick={() => chatHandler()}
          ></FloatingChatButton>
        </CommentContainer>
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

const BodyTitleSvg = styled.img``;

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
  z-index: 50;
  background-color: #666666;
  border-radius: 50%;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export default MissingDetail;
