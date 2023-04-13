import React from "react";
import styled from "styled-components";
import close from "../../../asset/Close.svg";
import { HeaderStyle, FlexAttribute } from "../../../style/Mixin";
import { useNavigate } from "react-router-dom";

const ProfileHeader = ({ children }) => {
  const navigate = useNavigate();
  const MoveBackpage = () => {
    navigate(-1);
  };
  return (
    <Header>
      <h2>{children}</h2>
      <CloseSvg src={close} onClick={MoveBackpage} />
    </Header>
  );
};

export default ProfileHeader;

const Header = styled.header`
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
