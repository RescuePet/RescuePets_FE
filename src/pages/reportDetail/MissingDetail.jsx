import React, { useEffect, useRef, useState } from "react";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  __deleteAdminPost,
  __deleteMemberPost,
  __getMissingPostDetail,
  __postMissingScrap,
  addCommentCount,
} from "../../redux/modules/petworkSlice";
import Comment from "./components/Comment";
import {
  __getComment,
  __postComment,
  resetCommentList,
  resetError,
  toggleScroll,
} from "../../redux/modules/commentSlice";
import petworkRefineData from "../../utils/petworkRefine";

import locationSvg from "../../asset/location.svg";
import time from "../../asset/time.svg";
import informationIcon from "../../asset/information.svg";
import Memo from "../../asset/Memo";
import gratuity from "../../asset/gratuity.svg";
import refresh from "../../asset/refresh.svg";
import PostInformation from "./components/PostInformation";
import FloatingButton from "./components/FloatingButton";
import { instance } from "../../utils/api";
import ScrollToTop from "../../elements/ScrollToTop";
import Cookies from "js-cookie";
import { Loading } from "../../components/Loading";
import { toggleOption, toggleReport } from "../../redux/modules/menubarSlice";
import Option from "../../components/Option";
import ReportModal from "../../components/ReportModal";
import { useModalState } from "../../hooks/useModalState";
import { CheckModal } from "../../elements/Modal";

import {
  initAmplitude,
  logEvent,
  setAmplitudeUserId,
  resetAmplitude,
} from "../../utils/amplitude";

const MissingDetail = () => {
  // 앰플리튜드
  const location = useLocation();
  useEffect(() => {
    initAmplitude();
    logEvent(`enter_/${location.pathname.split("/")[1]}`);
    setAmplitudeUserId();
    return () => {
      resetAmplitude();
    };
  }, []);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nickname, memberRole } = JSON.parse(Cookies.get("UserInfo"));
  const commentRef = useRef(null);

  const [loginModal, toggleModal] = useModalState(false);
  const [missingdetailMsg, setMissingDetailMsg] = useState("");

  const onChangeReportMsg = (newMsg) => {
    toggleModal();
    setMissingDetailMsg(newMsg);
  };
  const [commentPage, setCommentPage] = useState(1);

  const { missingPostDetail } = useSelector((state) => state?.petwork);
  const { commentList, isLast, error, errorMessage } = useSelector(
    (state) => state?.comment
  );
  const { optionState, reportState } = useSelector((state) => state.menubar);

  const commentPayload = {
    postId: id,
    page: commentPage,
  };

  useEffect(() => {
    dispatch(__getMissingPostDetail(id));
    dispatch(__getComment(commentPayload));
    setCommentPage(2);
    return () => {
      dispatch(resetCommentList());
    };
  }, [id]);

  if (JSON.stringify(missingPostDetail) === "{}") {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  if (error) {
    toggleModal();
    setMissingDetailMsg(errorMessage);
    dispatch(resetError());
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
      toggleModal();
      setMissingDetailMsg("댓글을 입력해주세요.");
      return;
    } else {
      dispatch(__postComment(data));
      commentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      dispatch(addCommentCount());
    }
  };

  const chatHandler = async () => {
    try {
      const response = await instance.post(
        `/chat/room/${missingPostDetail.id}`
      );
      navigate(`/chatroom/${missingPostDetail.nickname}/${response.data}`);
    } catch (error) {
      console.log(error);
    }
  };

  const scrapHandler = () => {
    let payload = {
      page: "petworkDetail",
      state: missingPostDetail.isWished,
      id: missingPostDetail.id,
    };
    dispatch(__postMissingScrap(payload));
  };

  const refreshCommentHandler = () => {
    setCommentPage((prev) => prev + 1);
    dispatch(__getComment(commentPayload));
    dispatch(toggleScroll());
  };

  const imageCarouselInfo = {
    scrapState: missingPostDetail.isWished,
    scrapHandler: scrapHandler,
  };

  const postInfo = {
    commentCount: missingPostDetail.commentCount,
    scrapCount: missingPostDetail.wishedCount,
    scrapHandler: scrapHandler,
  };

  const MoveData = {
    number: missingPostDetail.id,
    path: "editmissing",
    handler: () => dispatch(toggleOption()),
  };

  const optionMySetting = [
    {
      option: "게시물 수정하기",
      color: "normal",
      handler: () => {
        dispatch(toggleOption());
        navigate(`/editmissing/${id}`);
      },
    },
    {
      option: "게시물 삭제하기",
      color: "report",
      handler: () => {
        const payload = {
          id: id,
          type: "missing",
        };
        dispatch(__deleteMemberPost(payload)).then(() => {
          dispatch(toggleOption());
          navigate("/petwork");
        });
      },
    },
  ];

  const optionOtherSetting = [
    {
      option: "게시물 신고하기",
      color: "report",
      handler: () => {
        dispatch(toggleOption());
        dispatch(toggleReport());
      },
    },
  ];

  const optionAdminSetting = [
    {
      option: "관리자 권한으로 삭제",
      color: "report",
      handler: () => {
        const payload = {
          id: id,
          type: "catch",
        };
        dispatch(__deleteMemberPost(payload)).then(() => {
          dispatch(toggleOption());
          navigate("/petwork");
        });
      },
    },
  ];

  const reportSetting = {
    type: "post",
    nickname: missingPostDetail.nickname,
    postId: id,
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
            <BodyTitleSvg src={locationSvg} />
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
          {commentList.length >= 8 && <div ref={commentRef}></div>}
          {commentList.map((item, index) => {
            return (
              <Comment
                key={`missing-comment-${item.id}-${index}`}
                item={item}
              ></Comment>
            );
          })}
          {isLast ? null : (
            <FetchComment onClick={refreshCommentHandler}>
              <img src={refresh} alt="commentrefresh" />
              <span>댓글 불러오기</span>
            </FetchComment>
          )}
        </CommentListWrapper>
      </CommentContainer>
      {nickname !== missingPostDetail.nickname && (
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
      {optionState &&
        missingPostDetail.nickname === nickname &&
        memberRole !== "ADMIN" && <Option setting={optionMySetting} />}
      {optionState &&
        missingPostDetail.nickname !== nickname &&
        memberRole !== "ADMIN" && <Option setting={optionOtherSetting} />}
      {optionState && memberRole === "ADMIN" && (
        <Option setting={optionAdminSetting} />
      )}
      {reportState && (
        <ReportModal setting={reportSetting} onChangeMsg={onChangeReportMsg} />
      )}
      {missingdetailMsg == "" ? null : (
        <CheckModal
          isOpen={loginModal}
          toggle={toggleModal}
          onClose={toggleModal}
        >
          {missingdetailMsg}
        </CheckModal>
      )}
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

const FetchComment = styled.div`
  ${FlexAttribute("row", "center", "center")}
  width: 100%;
  height: 50px;
  cursor: pointer;
  span {
    margin-left: 4px;
    ${(props) => props.theme.Body_500_16};
  }
`;

export default MissingDetail;
