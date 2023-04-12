import React from "react";
import styled from "styled-components";
import { FlexAttribute, Border_2_color } from "../../style/Mixin";
import { useNavigate } from "react-router-dom";
import back from "../../asset/Back.svg";


const SignHeader = ({ children }) => {
  const navigate = useNavigate();
  const MoveBackpage = () => {
    navigate(-1);
  };

  return (
    <SignHeaderContainer>
      <div onClick={MoveBackpage}>
        <img src={back} alt="back" />
      </div>
      <div>{children}</div>
      <div></div>
    </SignHeaderContainer>
  );
};

export default SignHeader;

const SignHeaderContainer = styled.header`
  ${FlexAttribute("row", "", "center")};
  width: 100%;
  height: 5rem;
  padding-top: 1.25rem;
  color: ${(props) => props.theme.color.text_normal};
  div {
    height: 100%;
    width: 33.3%;
    ${(props) => props.theme.FlexCenter}
    ${(props) => props.theme.Title_700_18}
  }
  img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 3.125rem;
    cursor: pointer;
  }
`;
