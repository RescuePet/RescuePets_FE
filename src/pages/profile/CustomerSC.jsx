import React from "react";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import Header from "../map/components/Header";
import { HeaderStyle, Border_1_color, FlexAttribute } from "../../style/Mixin";
import close from "../../asset/Close.svg";
import { useNavigate } from "react-router-dom";

const CustomerSC = () => {
  const navigate = useNavigate();

  const MoveToBackPage = () => {
    navigate("/profile");
  };
  return (
    <Layout>
      <CustomerSCHeader>
        <h2>고객 센터</h2>
        <CloseSvg src={close} onClick={MoveToBackPage} />
      </CustomerSCHeader>

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

const CustomerSCHeader = styled.header`
  position: relative;
  ${FlexAttribute("row", "center")};
  ${HeaderStyle}
  h2 {
    ${(props) => props.theme.Body_500_16};
    color: ${(props) => props.theme.color.text_normal};
    line-height: 1.5rem;
    margin-bottom: 16px;
  }
`;

const CloseSvg = styled.img`
  position: absolute;
  right: 1.25rem;
  cursor: pointer;
`;

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
