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
import PostInformation from "./components/PostInformation";
import FloatingButton from "./components/FloatingButton";
import { instance } from "../../utils/api";

const MissingDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    const response = await instance.post(
      `/chat/missing-room/${missingPostDetail.id}`
    );
    console.log("post response", response.data);
    navigate(`/chatroom/${response.data}`);
  };

  return (
    <Layout>
      <ImageCarousel images={missingPostDetail.postImages} />
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
              <BodyTitleSvg src={memo} />
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
      <PostInformation comment={missingComment.length}></PostInformation>
      <CommentContainer>
        <CommentListWrapper>
          {missingComment?.map((item) => {
            return (
              <Comment key={`missing-comment-${item.id}`} item={item}></Comment>
            );
          })}
        </CommentListWrapper>
      </CommentContainer>
      <FloatingButton onClick={chatHandler}></FloatingButton>
      <InputContainer
        placeholder="댓글을 입력해주세요."
        submitHandler={submitHandler}
      ></InputContainer>
    </Layout>
  );
};

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

const BodyTitleWrapper = styled.div`
  ${FlexAttribute("row", "center")}
  width: 80px;
`;

const BodyTitleSvg = styled.img`
  width: 24px;
  height: 24px;
`;

const BodyTitleText = styled.span`
  flex-basis: 50px;
  font-weight: 400;
  margin-left: 4px;
  padding-top: 1px;
  font-size: 14px;
  line-height: 24px;
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
  line-height: 24px;
  color: #666666;
`;

const ContentText = styled.span`
  display: inline-block;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #222222;
`;

const CommentContainer = styled.div`
  ${FlexAttribute("column", "center", "center")}
`;

const CommentListWrapper = styled.div`
  ${FlexAttribute("column")}
`;

export default MissingDetail;
