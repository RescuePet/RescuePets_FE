import React, { useState } from "react";
import styled from "styled-components";
import { FlexAttribute } from "../style/Mixin";
import { instance } from "../utils/api";
import Button from "../elements/Button";
import { useDispatch } from "react-redux";
import { toggleReport } from "../redux/modules/menubarSlice";
import { useForm } from "react-hook-form";
import { CustomSelect } from "../elements/CustomSelect";

const ReportModal = ({ setting }) => {
  const reportOption = [
    { id: 0, name: "부적절한 단어", value: "부적절한 단어" },
    { id: 1, name: "거짓정보", value: "거짓정보" },
    { id: 2, name: "신체노출", value: "신체노출" },
    { id: 3, name: "기타", value: "기타" },
  ];

  const [type, setType] = useState(reportOption[0].name);
  const [typeID, setTypeID] = useState("부적절한 단어");
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  console.log("type", type);
  console.log("typeID", typeID);

  const onChangeData = (newData) => {
    setType(newData);
  };

  const onChangeID = (newData) => {
    setTypeID(newData);
  };

  const submitPostReport = async () => {
    const data = {
      content: null,
      postId: null,
      commentId: 0,
      reportCode: typeID,
    };
    try {
      console.log("request data", data);
      const response = await instance.post(`/api/report/member`, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const submitCommentReport = async () => {
    const data = {
      content: null,
      postId: null,
      commentId: null,
      reportCode: typeID,
    };
    try {
      console.log("request data", data);
      const response = await instance.post(`/api/report/member`, data);
      console.log(response);
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (payload) => {
    if (setting.type === "member") {
      submitMemberReport(payload);
      reset();
    }
  };

  return (
    <>
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
            <Button emptyButton normal onClick={() => dispatch(toggleReport())}>
              닫기
            </Button>
            <Button fillButton onClick={handleSubmit(submitHandler)}>
              신고하기
            </Button>
          </ButtonWrapper>
        </ReportWrapper>
      </ReportContainer>
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
