import React, { useState } from "react";
import styled, { css } from "styled-components";
import "./Footer.css";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../redux/modules/menubarSlice";
import { useLocation, useNavigate } from "react-router-dom";
import reportmissing from "../asset/reportmissing.svg";
import { FlexAttribute } from "../style/Mixin";

import FooterIconHome from "../asset/footericon/FooterIconHome";
import FooterIconNetwork from "../asset/footericon/FooterIconNetwork";
import FooterIconChat from "../asset/footericon/FooterIconChat";
import FooterIconProfile from "../asset/footericon/FooterIconProfile";
import Reportcatch from "../asset/Reportcatch";

const Footer = () => {
  // payload로 값 보내기 위한 훅
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuBar, setMenuBar] = useState(false);

  const [menuBarToggle, setMenuBarToggle] = useState(false);

  const onClickMenuBarHandler = () => {
    setMenuBar(!menuBar);
    setMenuBarToggle(!menuBarToggle);
    dispatch(toggleMenu(menuBarToggle));
    const ToggleBtn = document.querySelector(".toggleBtn");
    if (menuBar === true) {
      ToggleBtn.classList.remove("active");
    } else {
      ToggleBtn.classList.add("active");
    }
  };

  return (
    <FooterContiner>
      <FooterEachIconContiner
        active={location.pathname === "/home"}
        onClick={() => navigate("/home")}
      >
        <FooterIconHome></FooterIconHome>
        <span>홈</span>
      </FooterEachIconContiner>
      <FooterEachIconContiner
        active={
          location.pathname === "/map" || location.pathname === "/petwork"
        }
        onClick={() => navigate("/map")}
      >
        <FooterIconNetwork></FooterIconNetwork>
        <span>펫트워크</span>
      </FooterEachIconContiner>
      <FooterEachIconContiner
        active={location.pathname === "/chatlist"}
        onClick={() => navigate("/chatlist")}
      >
        <FooterIconChat></FooterIconChat>
        <span>채팅</span>
      </FooterEachIconContiner>
      <FooterEachIconContiner
        active={location.pathname === "/profile"}
        onClick={() => navigate("/profile")}
      >
        <FooterIconProfile></FooterIconProfile>
        <span>마이페이지</span>
      </FooterEachIconContiner>
      <div>
        <FooterIconToggleBtn
          className="toggleBtn"
          onClick={onClickMenuBarHandler}
        ></FooterIconToggleBtn>
        {menuBar && (
          <Navigation>
            <FooterMenuList onClick={() => navigate("/missing")}>
              <img src={reportmissing} alt="missing" />
              <span>실종 글 작성하기</span>
            </FooterMenuList>
            <FooterMenuList onClick={() => navigate("/catch")}>
              <Reportcatch></Reportcatch>
              <span>목격 글 작성하기</span>
            </FooterMenuList>
          </Navigation>
        )}
        {menuBar && <ToggleBackground />}
      </div>
    </FooterContiner>
  );
};

export default Footer;

const FooterContiner = styled.div`
  ${FlexAttribute("row", "space-around", "center")}
  width: 430px;
  height: 74px;
  border-top: 1px solid ${(props) => props.theme.color.text_disable};
  position: fixed;
  bottom: 0;
  background-color: ${(props) => props.theme.color.white};
  @media screen and (max-width: 431px) {
    width: 100%;
    position: fixed;
    bottom: 0;
  }
`;

// 메뉴바 모달
const Navigation = styled.div`
  position: absolute;
  right: 10px;
  bottom: 40px;
  width: 200px;
  height: 170px;
  ${(props) => props.theme.FlexColumn}
`;

const FooterMenuList = styled.div`
  width: 9.6875rem;
  height: 2.75rem;
  z-index: 50;
  margin-top: 10px;
  border-radius: 4px;
  background: ${(props) => props.theme.color.text_nomal};
  color: ${(props) => props.theme.color.white};
  ${(props) => props.theme.FlexCenter};
  cursor: pointer;
  span {
    ${(props) => props.theme.Body_400_14};
    line-height: 24px;
    vertical-align: middle;
  }
`;

// 모달 보이게 하는 검정색 원형
const FooterIconToggleBtn = styled.div`
  position: relative;
  z-index: 50;
  ${FlexAttribute("row", "center")}
  width: 40px;
  height: 40px;
  background: ${(props) => props.theme.color.text_nomal};
  border-radius: 50%;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-weight: 300;
  &::before {
    height: 40px;
    width: 40px;
    content: "+";
    text-align: center;
    font-size: 3em;
    font-weight: 300;
    color: ${(props) => props.theme.color.white};
    transition: 1s;
  }
`;

const FooterEachIconContiner = styled.div`
  ${FlexAttribute("column", "", "center")};
  width: 30px;
  cursor: pointer;
  span {
    ${(props) => props.theme.Body_400_12};
    color: ${(props) => props.theme.color.text_alternative};
    white-space: nowrap;
  }
  ${(props) =>
    props.active &&
    css`
  span {
      color: ${(props) => props.theme.color.primary_nomal};
    }
    path {
      fill: ${(props) => props.theme.color.primary_nomal};
    }
    circle {
      fill: ${(props) => props.theme.color.primary_nomal};
    }
    .default {
      fill: ${(props) => props.theme.color.white};
    }
  }
  `}
  :hover {
    span {
      color: ${(props) => props.theme.color.primary_strong};
    }
    path {
      fill: ${(props) => props.theme.color.primary_strong};
    }
    circle {
      fill: ${(props) => props.theme.color.primary_strong};
    }
    .default {
      fill: ${(props) => props.theme.color.white};
    }
  }
  :active {
    span {
      color: ${(props) => props.theme.color.primary_heavy};
    }
    path {
      fill: ${(props) => props.theme.color.primary_heavy};
    }
    circle {
      fill: ${(props) => props.theme.color.primary_heavy};
    }
    .default {
      fill: ${(props) => props.theme.color.white};
    }
  }
`;

const ToggleBackground = styled.div`
  position: fixed;
  inset: 0;
  z-index: 40;
  background-color: rgba(34, 34, 34, 0.5);
  width: 100%;
  height: 100%;
`;
