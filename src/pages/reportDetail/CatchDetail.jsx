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
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  __deleteAdminPost,
  __deleteMemberPost,
  __getCatchPostDetail,
  __postCatchScrap,
} from "../../redux/modules/petworkSlice";
import {
  __getComment,
  __postComment,
  resetCommentList,
  resetError,
  toggleScroll,
} from "../../redux/modules/commentSlice";
import Comment from "./components/Comment";
import petworkRefineData from "../../utils/petworkRefine";

import locationSvg from "../../asset/location.svg";
import time from "../../asset/time.svg";
import informationIcon from "../../asset/information.svg";
import refresh from "../../asset/refresh.svg";
import PostInformation from "./components/PostInformation";
import FloatingButton from "./components/FloatingButton";
import { instance } from "../../utils/api";
import ScrollToTop from "../../elements/ScrollToTop";
import Cookies from "js-cookie";
import Memo from "../../asset/Memo";
import { Loading } from "../../components/Loading";
import { toggleOption, toggleReport } from "../../redux/modules/menubarSlice";
import ReportModal from "../../components/ReportModal";
import Option from "../../components/Option";
import { useModalState } from "../../hooks/useModalState";
import { CheckModal } from "../../elements/Modal";

import {
  initAmplitude,
  logEvent,
  setAmplitudeUserId,
  resetAmplitude,
} from "../../utils/amplitude";

const SightingDetail = () => {
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
  const [catchdetailMsg, setCatchDetailMsg] = useState("");

  const onChangeReportMsg = (newMsg) => {
    toggleModal();
    setCatchDetailMsg(newMsg);
  };

  const [commentPage, setCommentPage] = useState(1);

  const { catchPostDetail } = useSelector((state) => state.petwork);
  const { commentList, isLast, error, errorMessage } = useSelector(
    (state) => state?.comment
  );
  const { optionState, reportState } = useSelector((state) => state.menubar);

  const commentPayload = {
    postId: id,
    page: commentPage,
  };

  useEffect(() => {
    dispatch(__getCatchPostDetail(id));
    dispatch(__getComment(commentPayload));
    setCommentPage(2);
    return () => {
      dispatch(resetCommentList());
    };
  }, [id]);

  if (JSON.stringify(catchPostDetail) === "{}") {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  if (error) {
    toggleModal();
    setCatchDetailMsg(errorMessage);
    dispatch(resetError());
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

  const postInfo = {
    commentCount: catchPostDetail.commentCount,
    scrapCount: catchPostDetail.wishedCount,
  };

  const submitHandler = (content) => {
    let data = {
      id: id,
      content: content.message,
    };
    if (content.message === "") {
      toggleModal();
      setCatchDetailMsg("댓글을 입력해주세요.");
      return;
    } else {
      dispatch(__postComment(data));
      commentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const chatHandler = async () => {
    try {
      const response = await instance.post(`/chat/room/${catchPostDetail.id}`);
      navigate(`/chatroom/${catchPostDetail.nickname}/${response.data}`);
    } catch (error) {
      console.log(error);
    }
  };

  const scrapHandler = () => {
    let payload = {
      page: "petworkDetail",
      state: catchPostDetail.isWished,
      id: catchPostDetail.id,
    };
    dispatch(__postCatchScrap(payload));
  };

  const refreshCommentHandler = () => {
    setCommentPage((prev) => prev + 1);
    dispatch(__getComment(commentPayload));
    dispatch(toggleScroll());
  };

  const imageCarouselInfo = {
    scrapState: catchPostDetail.isWished,
    scrapHandler: scrapHandler,
  };

  const MoveData = {
    number: catchPostDetail.id,
    path: "editcatch",
    handler: () => dispatch(toggleOption()),
  };

  const optionMySetting = [
    {
      option: "게시물 수정하기",
      color: "normal",
      handler: () => {
        dispatch(toggleOption());
        navigate(`/editcatch/${id}`);
      },
    },
    {
      option: "게시물 삭제하기",
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
    nickname: catchPostDetail.nickname,
    postId: id,
  };

  return (
    <CatchLayout>
      <ScrollToTop />
      <ImageCarousel
        images={catchPostDetail?.postImages}
        imageCarouselInfo={imageCarouselInfo}
        data={MoveData}
      />
      <TitleWrapper>
        <Title titleInfo={titleInfo}></Title>
      </TitleWrapper>
      <Location locationInfo={locationInfo}></Location>
      <InfoContainer>
        <InfoWrapper>
          <BotyTitleWrapper>
            <BodyTitleSvg src={locationSvg} />
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
        {catchPostDetail.specialMark && (
          <InfoWrapper>
            <BotyTitleWrapper>
              <BodyTitleSvg src={informationIcon} />
              <BodyTitleText>특징</BodyTitleText>
            </BotyTitleWrapper>
            <ContentTextWrapper>
              <ContentText>{catchPostDetail.specialMark}</ContentText>
            </ContentTextWrapper>
          </InfoWrapper>
        )}
        {catchPostDetail.content && (
          <InfoWrapper>
            <BotyTitleWrapper>
              <Memo />
              <BodyTitleText>메모</BodyTitleText>
            </BotyTitleWrapper>
            <ContentTextWrapper>
              <ContentText>{catchPostDetail.content}</ContentText>
            </ContentTextWrapper>
          </InfoWrapper>
        )}
      </InfoContainer>
      <PostInformation postInfo={postInfo}></PostInformation>
      <CommentContainer>
        <CommentListWrapper>
          {commentList.length >= 8 && <div ref={commentRef}></div>}
          {commentList?.map((item) => {
            return (
              <Comment key={`catch-comment-${item.id}`} item={item}></Comment>
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
      <InputContainer
        placeholder="댓글을 입력해주세요."
        submitHandler={submitHandler}
      ></InputContainer>
      {nickname !== catchPostDetail.nickname && (
        <FloatingButton
          onClick={() => {
            chatHandler();
          }}
        ></FloatingButton>
      )}
      {optionState &&
        catchPostDetail.nickname === nickname &&
        memberRole !== "ADMIN" && <Option setting={optionMySetting} />}
      {optionState &&
        catchPostDetail.nickname !== nickname &&
        memberRole !== "ADMIN" && <Option setting={optionOtherSetting} />}
      {optionState && memberRole === "ADMIN" && (
        <Option setting={optionAdminSetting} />
      )}
      {reportState && (
        <ReportModal setting={reportSetting} onChangeMsg={onChangeReportMsg} />
      )}
      {catchdetailMsg === "" ? null : (
        <CheckModal
          isOpen={loginModal}
          toggle={toggleModal}
          onClose={toggleModal}
        >
          {catchdetailMsg}
        </CheckModal>
      )}
    </CatchLayout>
  );
};

const CatchLayout = styled(Layout)`
  overflow-y: scroll;
`;

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

const BotyTitleWrapper = styled.div`
  ${FlexAttribute("row", "center")}
  width: 5rem;
`;

const BodyTitleSvg = styled.img`
  flex-basis: 1.25rem;
  width: 1.5rem;
  height: 1.5rem;
`;

const BodyTitleText = styled.span`
  flex-basis: 3.125rem;
  margin-left: 0.25rem;
  padding-top: 0.0625rem;
  font-weight: 400;
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

export default SightingDetail;
