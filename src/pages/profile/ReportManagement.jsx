import React, { useEffect } from "react";
import Layout from "../../layouts/Layout";
import ProfileHeader from "./components/ProfileHeader";
import styled from "styled-components";
import { FlexAttribute } from "../../style/Mixin";
import ReportList from "./components/ReportList";
import { useDispatch, useSelector } from "react-redux";
import { __getReportList } from "../../redux/modules/profileSlice";

const ReportManagement = () => {
  const dispatch = useDispatch();
  const { reportList } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(__getReportList());
  }, []);

  return (
    <Layout>
      <ProfileHeader>게시물 신고 관리</ProfileHeader>
      <ReportListContainer>
        {reportList.map((item) => {
          return (
            <ReportList
              key={`reportlist-item-${item.id}`}
              item={item}
            ></ReportList>
          );
        })}
      </ReportListContainer>
    </Layout>
  );
};

const ReportListContainer = styled.div`
  ${FlexAttribute("column", "", "center")}
`;

export default ReportManagement;
