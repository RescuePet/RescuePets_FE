import React from "react";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import ProfileHeader from "./components/ProfileHeader";

const CustomerSC = () => {
  return (
    <Layout>
      <ProfileHeader>고객 센터</ProfileHeader>
      <CustomerSCMain>
        <div>
          <p>관리자에게 문의하기</p>
          <h2>rescuepets9912@gmail.com</h2>
        </div>
      </CustomerSCMain>
    </Layout>
  );
};

export default CustomerSC;

const CustomerSCMain = styled.main`
  width: 100%;
  height: 50%;
  ${(props) => props.theme.FlexCenter}
  > div {
    width: 18.75rem;
    height: 3.75rem;
    > p {
      width: 100%;
      height: 30%;
      display: flex;
      align-items: center;
    }
    > h2 {
      width: 100%;
      height: 70%;
      display: flex;
      align-items: center;
      border-bottom: 1px solid ${(props) => props.theme.color.text_alternative};
    }
  }
`;
