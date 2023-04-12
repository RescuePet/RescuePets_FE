import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import close from "../../../asset/Close.svg";
import { HeaderStyle, FlexAttribute } from "../../../style/Mixin";

const Header = ({ children }) => {
  const navigate = useNavigate();

  const MoveToBackPage = () => {
    navigate(-1);
  };

  return (
    <EditInfoHeader>
      <div>
        <img src={close} style={{ opacity: "0" }} />
      </div>
      <div>
        <h2>{children}</h2>
      </div>
      <div>
        <img
          src={close}
          onClick={MoveToBackPage}
          style={{ cursor: "pointer" }}
        />
      </div>
    </EditInfoHeader>
  );
};

export default Header;

const EditInfoHeader = styled.header`
  ${HeaderStyle}
  ${FlexAttribute("row", "space-between", "center")};
  position: relative;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  > h2 {
    ${(props) => props.theme.FlexCenter}
    ${(props) => props.theme.Title_700_18}
    color: ${(props) => props.theme.color.text_normal};
  }
`;
