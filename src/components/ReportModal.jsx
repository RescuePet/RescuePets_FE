import React from "react";
import styled from "styled-components";
import { FlexAttribute } from "../style/Mixin";
import { instance } from "../utils/api";
import Button from "../elements/Button";
import { useDispatch } from "react-redux";
import { toggleReport } from "../redux/modules/menubarSlice";

const ReportModal = () => {
  const dispatch = useDispatch();

  const submitReport = async () => {
    try {
      const response = await instance.post(`/api/report/member`);
      console.log(response);
    } catch (error) {}
  };

  return (
    <>
      <ReportBackground></ReportBackground>
      <ReportContainer>
        <ReportWrapper>
          <ReportTitle>
            <span>신고하기</span>
          </ReportTitle>
          <ReportContents></ReportContents>
          <ButtonWrapper>
            <Button fillButton report>
              신고하기
            </Button>
            <Button emptyButton onClick={() => dispatch(toggleReport())}>
              닫기
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
  height: 40px;
  background-color: ${(props) => props.theme.color.primary_assistive};
  span {
    color: ${(props) => props.theme.color.status_caution};
  }
`;

const ReportContents = styled.div`
  background-color: ${(props) => props.theme.color.white};
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
