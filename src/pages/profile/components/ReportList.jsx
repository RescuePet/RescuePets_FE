import React, { useState } from "react";
import styled from "styled-components";
import { FlexAttribute } from "../../../style/Mixin";
import Meatballs from "../../../asset/Meatballs";
import Option from "../../../components/Option";
import {
  __deleteReportList,
  __putUserGrade,
} from "../../../redux/modules/profileSlice";
import { useDispatch } from "react-redux";

const ReportList = ({ item }) => {
  const dispatch = useDispatch();
  const [reportOption, setReportOption] = useState(false);

  console.log(item);

  const reportOptionSetting = [
    {
      option: "Bad Member로 변경",
      color: "normal",
      handler: () => {
        dispatch(
          __putUserGrade({
            nickname: item.respondentNickname,
            memberRoleEnum: "BAD_MEMBER",
          })
        );
        setReportOption(false);
      },
    },
    {
      option: "신고 내용 삭제하기",
      color: "report",
      handler: () => {
        dispatch(__deleteReportList(item.id));
        setReportOption(false);
      },
    },
  ];

  const reportOptionAdminSetting = [
    {
      option: "신고 내용 삭제하기",
      color: "report",
    },
  ];

  return (
    <>
      <ReportListContainer>
        <Image src={item.respondentProfileImage} />
        <div>
          <ListTitleWrapper>
            <Title>{item.respondentNickname}</Title>
            <Info>{item.reportType}</Info>
            <Info>| &nbsp; {item.reportReason}</Info>
          </ListTitleWrapper>
          <AdditionalInfoWrapper>
            <span>신고내용</span>
            <p>{item.content}</p>
          </AdditionalInfoWrapper>
        </div>
        <ReportMeatballs onClick={() => setReportOption(!reportOption)} />
      </ReportListContainer>
      {reportOption && (
        <Option
          setting={
            item.respondentRole === "MEMBER"
              ? reportOptionSetting
              : reportOptionAdminSetting
          }
          mapCloseHandler={() => setReportOption(!reportOption)}
        />
      )}
    </>
  );
};

const ReportListContainer = styled.div`
  position: relative;
  ${FlexAttribute("row", "", "flex-start")}
  width: 335px;
  padding: 16px 0;
  border-bottom: 1px solid ${(props) => props.theme.color.input_border};
  cursor: pointer;
  :hover {
    transform: translate(0px, -1px);
    box-shadow: 0px 1px ${(props) => props.theme.color.primary_strong};
    transition: 0.3s;
  }
  :active {
    background-color: ${(props) => props.theme.color.background_tertiary};
    transform: translate(0px, 1px);
    box-shadow: none;
    border-bottom: 1px solid ${(props) => props.theme.color.primary_strong};
    transition: 0.3s;
  }
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const ListTitleWrapper = styled.div`
  ${FlexAttribute("row", "", "center")}
  margin-left: 16px;
`;

const Title = styled.span`
  ${(props) => props.theme.Body_500_14};
  white-space: nowrap;
`;

const Info = styled.span`
  margin-left: 8px;
  ${(props) => props.theme.Body_400_12};
  color: ${(props) => props.theme.color.text_alternative};
  white-space: nowrap;
`;

const AdditionalInfoWrapper = styled.div`
  margin-top: 2px;
  margin-left: 16px;
  span {
    ${(props) => props.theme.Body_400_12};
    color: ${(props) => props.theme.color.text_assistive};
  }
  p {
    margin-top: 8px;
    width: 260px;
    ${(props) => props.theme.Body_400_10};
    color: ${(props) => props.theme.color.text_assistive};
    word-break: keep-all;
  }
`;

const ReportMeatballs = styled(Meatballs)`
  position: absolute;
  left: calc(100% - 26px);
  cursor: pointer;
  z-index: 10;
`;

export default ReportList;
