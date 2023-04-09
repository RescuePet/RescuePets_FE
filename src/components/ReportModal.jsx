import React, { useState } from "react";
import styled from "styled-components";
import { FlexAttribute } from "../style/Mixin";
import { instance } from "../utils/api";
import Button from "../elements/Button";
import { useDispatch } from "react-redux";
import { toggleReport } from "../redux/modules/menubarSlice";
import { useForm } from "react-hook-form";
import { CustomSelect } from "../elements/CustomSelect";
import ModalPortal from "../elements/ModalPortal";
import { useModalState } from "../hooks/useModalState";
import { CheckModal } from "../elements/Modal";

const ReportModal = ({ setting, reportCloseHandler, onChangeMsg }) => {
  const reportOption = [
    { id: 0, name: "부적절한단어", value: "부적절한단어" },
    { id: 1, name: "거짓정보", value: "거짓정보" },
    { id: 2, name: "신체노출", value: "신체노출" },
    { id: 3, name: "기타", value: "기타" },
  ];

  // console.log(onChangeMsg);
  //

  const [type, setType] = useState(reportOption[0].name);
  const [typeID, setTypeID] = useState("부적절한단어");
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const [loginModal, toggleModal] = useModalState(false);

  const [reportMsg, setReportMsg] = useState("");

  const onChangeData = (newData) => {
    setType(newData);
  };

  const onChangeID = (newData) => {
    setTypeID(newData);
  };

  const submitPostReport = async (payload) => {
    // console.log(payload);
    const data = {
      content: payload.reason,
      postId: Number(setting.postId),
      commentId: 0,
      reportCode: typeID,
    };
    try {
      // console.log("request data", data);
      const response = await instance.post(`/api/report/post`, data);
      console.log(response);
      if (response.status === 200) {
        toggleModal();
        // setReportMsg("신고가 완료되었습니다.");
        onChangeMsg("신고가 완료되었습니다.");
        // alert("신고가 완료되었습니다.");
      }
    } catch (error) {
      // console.log("수정실패!");
      if (error.response.status === 409) {
        toggleModal();
        onChangeMsg("이미 신고한 게시물 입니다.");
        // alert("이미 신고하였습니다.");
      } else if (error.response.status === 400) {
        // toggleModal();
        onChangeMsg("서버 오류");
      }
    }
  };

  const submitCommentReport = async (payload) => {
    const data = {
      content: payload.reason,
      postId: null,
      commentId: setting.commentId,
      reportCode: typeID,
    };
    try {
      const response = await instance.post(`/api/report/comment`, data);
      console.log("response", response);
      if (response.status === 200) {
        // toggleModal();
        console.log("이즈굿~");
        setReportMsg("신고가 완료되었습니다.");
        // alert("신고가 완료되었습니다.");
      }
    } catch (error) {
      if (error.response.status === 409) {
        // toggleModal();
        setReportMsg("이미 신고한 유저입니다.");
        // alert("이미 신고하였습니다.");
      }
    }
  };

  const submitMemberReport = async (payload) => {
    const data = {
      content: payload.reason,
      informantId: 0,
      nickname: setting.nickname,
      reportCode: typeID,
    };
    try {
      console.log("request data", data);
      const response = await instance.post(`/api/report/member`, data);
      console.log(response);
      if (response.status === 200) {
        // toggleModal();
        setReportMsg("신고가 완료되었습니다.");
        // alert("신고가 완료되었습니다.");
      }
    } catch (error) {
      if (error.response.status === 409) {
        // alert("이미 신고하였습니다.");
        // toggleModal();
        setReportMsg("이미 신고한 댓글입니다.");
      }
    }
  };

  const submitHandler = (payload) => {
    // console.log("입력값", payload.reason);
    if (payload.reason === "") {
      toggleModal();
      setReportMsg("내용을 작성해주세요");
      return;
    }
    if (setting.type === "post") {
      console.log("게시물 신고");
      toggleModal();
      console.log(payload);
      submitPostReport(payload);
      dispatch(toggleReport());
      // reset();
    } else if (setting.type === "member") {
      console.log("맴버 신고");
      submitMemberReport(payload);
      dispatch(toggleReport());
      reset();
    } else if (setting.type === "comment") {
      console.log("댓글 신고");
      submitCommentReport(payload);
      reportCloseHandler();
      reset();
    }
  };

  return (
    <>
      <ModalPortal>
        {reportMsg == "" ? null : (
          <CheckModal
            isOpen={loginModal}
            toggle={toggleModal}
            onClose={toggleModal}
          >
            {reportMsg}
          </CheckModal>
        )}
        <ReportBackground></ReportBackground>
        <ReportContainer>
          <ReportWrapper>
            <ReportTitle>
              <span>신고하기</span>
            </ReportTitle>
            <ReportContents onSubmit={handleSubmit(submitHandler)}>
              <SelectWrapper>
                <SelectTitle>신고 사유</SelectTitle>
                <CustomSelect
                  data={reportOption}
                  onChangeData={onChangeData}
                  onChangeID={onChangeID}
                />
              </SelectWrapper>
              <ContentsWrapper>
                <ContentsTitle>상세내용</ContentsTitle>
                <Contents
                  placeholder="상세내용을 작성해주세요."
                  {...register("reason")}
                />
              </ContentsWrapper>
            </ReportContents>
            <ButtonWrapper>
              {reportCloseHandler ? (
                <Button emptyButton normal onClick={reportCloseHandler}>
                  닫기
                </Button>
              ) : (
                <Button
                  emptyButton
                  normal
                  onClick={() => dispatch(toggleReport())}
                >
                  닫기
                </Button>
              )}

              <Button fillButton onClick={handleSubmit(submitHandler)}>
                신고하기
              </Button>
            </ButtonWrapper>
          </ReportWrapper>
        </ReportContainer>
      </ModalPortal>
    </>
  );
};

const ReportBackground = styled.div`
  position: fixed;
  inset: 0;
  z-index: 500;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ReportContainer = styled.div`
  position: fixed;
  ${FlexAttribute("column", "center", "center")};
  bottom: 0;
  right: calc(50% - 215px);
  height: 100%;
  width: 430px;
  z-index: 600;
`;

const ReportWrapper = styled.div`
  width: 93%;
  margin-bottom: 8px;
  border-radius: 4px;
  overflow: hidden;
  background-color: ${(props) => props.theme.color.white};
`;

const ReportTitle = styled.div`
  ${FlexAttribute("row", "center", "center")}
  height: 50px;
  background-color: ${(props) => props.theme.color.primary_assistive};
  span {
    ${(props) => props.theme.Title_700_18};
    color: ${(props) => props.theme.color.text_normal};
  }
`;

const ReportContents = styled.form`
  background-color: ${(props) => props.theme.color.white};
`;

const SelectWrapper = styled.div`
  ${FlexAttribute("row", "center", "center")}
  margin-top: 24px;
`;

const SelectTitle = styled.span`
  display: inline-block;
  margin-top: 5px;
  margin-right: 16px;
  ${(props) => props.theme.Body_400_12};
  line-height: 30px;
`;

const ContentsWrapper = styled.div`
  ${FlexAttribute("column", "", "center")}
  margin-top: 32px;
`;

const ContentsTitle = styled.span`
  ${(props) => props.theme.Body_400_12};
  margin-bottom: 12px;
`;

const Contents = styled.textarea`
  resize: none;
  padding: 10px;
  border-radius: 4px;
  width: 92%;
  height: 100px;
  background-color: ${(props) => props.theme.color.line_normal};
  line-height: 1.6em;
`;

const ButtonWrapper = styled.div`
  ${FlexAttribute("row")}
  margin-top: 16px;
  padding: 8px;
  border-top: 1px solid ${(props) => props.theme.color.text_disable};
  button:last-child {
    margin-left: 8px;
  }
`;

export default ReportModal;
