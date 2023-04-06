import React, { useEffect, useState } from "react";
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
import {
  __getMissingPostDetail,
  __postMissingScrap,
} from "../../redux/modules/petworkSlice";
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
import Memo from "../../asset/Memo";
import gratuity from "../../asset/gratuity.svg";
import PostInformation from "./components/PostInformation";
import FloatingButton from "./components/FloatingButton";
import { instance } from "../../utils/api";
import ScrollToTop from "../../elements/ScrollToTop";
import Cookies from "js-cookie";
import { Loading } from "../../components/Loading";

const MissingDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = JSON.parse(Cookies.get("UserInfo"));

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

  console.log(missingPostDetail);

  if (JSON.stringify(missingPostDetail) === "{}") {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
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
    if (content.message === "") {
      return;
    }
    dispatch(__postMissingComment(data)).then(() => {
      dispatch(__getMissingComment(id));
    });
  };

  const chatHandler = async () => {
    const response = await instance.post(`/chat/room/${missingPostDetail.id}`);
    console.log("post response", response.data);
    navigate(`/chatroom/${missingPostDetail.nickname}/${response.data}`);
  };

  const scrapHandler = () => {
    let payload = {
      page: "petworkDetail",
      state: missingPostDetail.isWished,
      id: missingPostDetail.id,
    };
    dispatch(__postMissingScrap(payload));
  };

  const imageCarouselInfo = {
    scrapState: missingPostDetail.isWished,
    scrapHandler: scrapHandler,
  };

  const postInfo = {
    commentCount: missingComment.length,
    scrapCount: missingPostDetail.wishedCount,
    scrapHandler: scrapHandler,
  };

  const MoveData = {
    number: missingPostDetail.id,
    path: "editmissing",
  };

  return (
    <Layout>
      <ScrollToTop />
      <ImageCarousel
        images={missingPostDetail.postImages}
        imageCarouselInfo={imageCarouselInfo}
        data={MoveData}
      />
      <TitleWrapper>
        <Title titleInfo={titleInfo}></Title>
      </TitleWrapper>
      <Location locationInfo={locationInfo}></Location>
      <InfoContainer>
        <InfoWrapper>
          <BodyTitleWrapper>
            <BodyTitleSvg src={location} />
            <BodyTitleText>위치</BodyTitleText>
          </BodyTitleWrapper>
          <ContentTextWrapper>
            <ContentText>{missingPostDetail.happenPlace}</ContentText>
          </ContentTextWrapper>
        </InfoWrapper>
        <InfoWrapper>
          <BodyTitleWrapper>
            <BodyTitleSvg src={time} />
            <BodyTitleText>실종일시</BodyTitleText>
          </BodyTitleWrapper>
          <ContentTextWrapper>
            <ContentTextBox>
              <ContentOptionText>
                {missingPostDetail.happenDt} |{" "}
              </ContentOptionText>
              &nbsp;<ContentText>{missingPostDetail.happenHour}</ContentText>
            </ContentTextBox>
          </ContentTextWrapper>
        </InfoWrapper>
        {missingPostDetail.specialMark && (
          <InfoWrapper>
            <BodyTitleWrapper>
              <BodyTitleSvg src={informationIcon} />
              <BodyTitleText>특징</BodyTitleText>
            </BodyTitleWrapper>
            <ContentTextWrapper>
              <ContentText>{missingPostDetail.specialMark}</ContentText>
            </ContentTextWrapper>
          </InfoWrapper>
        )}
        {missingPostDetail.content && (
          <InfoWrapper>
            <BodyTitleWrapper>
              <Memo />
              <BodyTitleText>메모</BodyTitleText>
            </BodyTitleWrapper>
            <ContentTextWrapper>
              <ContentText>{missingPostDetail.content}</ContentText>
            </ContentTextWrapper>
          </InfoWrapper>
        )}
        {missingPostDetail.gratuity && (
          <InfoWrapper>
            <BodyTitleWrapper>
              <BodyTitleSvg src={gratuity} />
              <BodyTitleText>사례금</BodyTitleText>
            </BodyTitleWrapper>
            <ContentTextWrapper>
              <ContentText>{missingPostDetail.gratuity}원</ContentText>
            </ContentTextWrapper>
          </InfoWrapper>
        )}
      </InfoContainer>
      <PostInformation postInfo={postInfo}></PostInformation>
      <CommentContainer>
        <CommentListWrapper>
          {missingComment?.map((item) => {
            return (
              <Comment key={`missing-comment-${item.id}`} item={item}></Comment>
            );
          })}
        </CommentListWrapper>
      </CommentContainer>
      {userName.nickname !== missingPostDetail.nickname && (
        <FloatingButton
          onClick={() => {
            chatHandler();
          }}
        ></FloatingButton>
      )}
      <InputContainer
        placeholder="댓글을 입력해주세요."
        submitHandler={submitHandler}
      ></InputContainer>
    </Layout>
  );
};

const TitleWrapper = styled.div`
  ${FlexAttribute("row", "center", "center")}
  margin: 1rem auto;
  padding-bottom: 1rem;
  width: 100%;
  ${Border_2_color}
`;

const InfoContainer = styled.div`
  ${PostBorderStyle}
`;

const InfoWrapper = styled.div`
  ${FlexAttribute("row", "space-evenly")}
`;

const BodyTitleWrapper = styled.div`
  ${FlexAttribute("row", "center")}
  width: 5rem;
`;

const BodyTitleSvg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const BodyTitleText = styled.span`
  flex-basis: 3.125rem;
  font-weight: 400;
  margin-left: 0.25rem;
  padding-top: 0.0625rem;
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: #999999;
  white-space: nowrap;
`;

const ContentTextWrapper = styled.div`
  flex-basis: 13.75rem;
  margin-top: 0.125rem;
  span:first-child {
    margin-bottom: 0.5rem;
  }
`;

const ContentTextBox = styled.div`
  ${FlexAttribute("row")}
`;

const ContentOptionText = styled.span`
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: #666666;
`;

const ContentText = styled.span`
  display: inline-block;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: #222222;
`;

const CommentContainer = styled.div`
  ${FlexAttribute("column", "center", "center")}
`;

const CommentListWrapper = styled.div`
  ${FlexAttribute("column")}
`;

export default MissingDetail;
