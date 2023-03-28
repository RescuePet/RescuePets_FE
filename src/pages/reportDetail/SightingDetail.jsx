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
import { useNavigate, useParams } from "react-router-dom";
import { __getCatchPostDetail } from "../../redux/modules/petworkSlice";
import {
  toggleEditDone,
  __getCatchComment,
  __postCatchComment,
} from "../../redux/modules/commentSlice";
import Comment from "./components/Comment";
import petworkRefineData from "../../utils/petworkRefine";

import location from "../../asset/location.svg";
import time from "../../asset/time.svg";
import informationIcon from "../../asset/information.svg";
import memo from "../../asset/memo.svg";
import PostInformation from "./components/PostInformation";
import FloatingButton from "./components/FloatingButton";

const SightingDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const refineData = petworkRefineData(catchPostDetail);

  const titleInfo = {
    state: "목격",
    kindCd: catchPostDetail.kindCd,
    upkind: refineData.upkind,
    sexCd: refineData.sexCd,
    info: refineData.information.join("/"),
  };

  const locationInfo = {
    state: "목격 위치",
    happenLatitude: catchPostDetail.happenLatitude,
    happenLongitude: catchPostDetail.happenLongitude,
  };

  const submitHandler = (content) => {
    let data = {
      id: id,
      content: content.message,
    };
    dispatch(__postCatchComment(data)).then(() => {
      dispatch(__getCatchComment(id));
    });
  };

  const chatHandler = async () => {
    console.log("hi");
    const postname = "catch-room";
    navigate(`/chatroom/${postname}/${id}`);
  };

  return (
    <Layout>
      <ImageCarousel images={catchPostDetail?.postImages} />
      <TitleWrapper>
        <Title titleInfo={titleInfo}></Title>
      </TitleWrapper>
      <Location locationInfo={locationInfo}></Location>
      <InfoContainer>
        <InfoWrapper>
          <BotyTitleWrapper>
            <BodyTitleSvg src={location} />
            <BodyTitleText>위치</BodyTitleText>
          </BotyTitleWrapper>
          <ContentTextWrapper>
            <ContentText>{catchPostDetail.happenPlace}</ContentText>
          </ContentTextWrapper>
        </InfoWrapper>
        <InfoWrapper>
          <BotyTitleWrapper>
            <BodyTitleSvg src={time} />
            <BodyTitleText>발견일시</BodyTitleText>
          </BotyTitleWrapper>
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
          <BotyTitleWrapper>
            <BodyTitleSvg src={informationIcon} />
            <BodyTitleText>특징</BodyTitleText>
          </BotyTitleWrapper>
          <ContentTextWrapper>
            <ContentText>
              {catchPostDetail.specialMark !== null
                ? catchPostDetail.specialMark
                : "없음"}
            </ContentText>
          </ContentTextWrapper>
        </InfoWrapper>
        <InfoWrapper>
          <BotyTitleWrapper>
            <BodyTitleSvg src={memo} />
            <BodyTitleText>메모</BodyTitleText>
          </BotyTitleWrapper>
          <ContentTextWrapper>
            <ContentText>
              {catchPostDetail.content !== null
                ? catchPostDetail.content
                : "없음"}
            </ContentText>
          </ContentTextWrapper>
        </InfoWrapper>
      </InfoContainer>
      <PostInformation comment={catchComment.length}></PostInformation>
      <CommentContainer>
        <CommentListWrapper>
          {catchComment?.map((item) => {
            return (
              <Comment key={`catch-comment-${item.id}`} item={item}></Comment>
            );
          })}
        </CommentListWrapper>
      </CommentContainer>
      <FloatingButton
        onClick={() => {
          console.log("hihi");
          chatHandler();
        }}
      ></FloatingButton>
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

const BotyTitleWrapper = styled.div`
  ${FlexAttribute("row", "center")}
  width: 80px;
`;

const BodyTitleSvg = styled.img`
  flex-basis: 20px;
  width: 24px;
  height: 24px;
`;

const BodyTitleText = styled.span`
  flex-basis: 50px;
  margin-left: 4px;
  padding-top: 1px;
  font-weight: 400;
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

export default SightingDetail;
