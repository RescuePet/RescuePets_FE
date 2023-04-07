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
        active={
          location.pathname.split("/")[1] === "home" ||
          location.pathname.split("/")[1] === "adoptiondetail"
        }
        onClick={() => navigate("/home")}
      >
        <FooterIconHome></FooterIconHome>
        <span>홈</span>
      </FooterEachIconContiner>
      <FooterEachIconContiner
        active={
          location.pathname.split("/")[1] === "map" ||
          location.pathname.split("/")[1] === "petwork" ||
          location.pathname.split("/")[1] === "missingdetail" ||
          location.pathname.split("/")[1] === "sightingdetail"
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
        active={location.pathname.split("/")[1] === "profile"}
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
            <FooterMenuList
              onClick={() => {
                navigate("/missing");
                dispatch(toggleMenu(!menuBarToggle));
              }}
            >
              <img src={reportmissing} alt="missing" />
              <span>실종 글 작성하기</span>
            </FooterMenuList>
            <FooterMenuList
              onClick={() => {
                navigate("/catch");
                dispatch(toggleMenu(!menuBarToggle));
              }}
            >
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
  width: 26.875rem;
  height: 10vh;
  /* height: 4.625rem; */
  border-top: 0.0625rem solid ${(props) => props.theme.color.text_disable};
  position: fixed;
  bottom: 0;
  background-color: ${(props) => props.theme.color.white};
  z-index: 100;
  @media screen and (max-width: 26.9375rem) {
    width: 100%;
    height: 4.725rem;
    position: fixed;
    bottom: 0;
  }
`;

// 메뉴바 모달
const Navigation = styled.div`
  position: absolute;
  right: 0.625rem;
  bottom: 2.5rem;
  width: 12.5rem;
  height: 10.625rem;
  ${(props) => props.theme.FlexColumn}
`;

const FooterMenuList = styled.div`
  width: 9.6875rem;
  height: 2.75rem;
  z-index: 1000;
  margin-top: 0.625rem;
  border-radius: 0.25rem;
  background: ${(props) => props.theme.color.text_normal};
  color: ${(props) => props.theme.color.white};
  ${(props) => props.theme.FlexCenter};
  cursor: pointer;
  span {
    ${(props) => props.theme.Body_400_14};
    line-height: 1.5rem;
    vertical-align: middle;
  }
`;

// 모달 보이게 하는 검정색 원형
const FooterIconToggleBtn = styled.div`
  position: relative;
  z-index: 1000;
  ${FlexAttribute("row", "center", "center")}
  width: 2.5rem;
  height: 2.5rem;
  background: ${(props) => props.theme.color.text_normal};
  border-radius: 50%;
  box-shadow: 0 0.9375rem 1.5625rem rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-weight: 300;
  &::before {
    content: "+";
    line-height: 2.5rem;
    text-align: center;
    font-size: 2.5rem;
    color: ${(props) => props.theme.color.white};
    transition: 1s;
  }
`;

const FooterEachIconContiner = styled.div`
  ${FlexAttribute("column", "", "center")};
  width: 1.875rem;
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
      color: ${(props) => props.theme.color.primary_normal};
    }
    path {
      fill: ${(props) => props.theme.color.primary_normal};
    }
    circle {
      fill: ${(props) => props.theme.color.primary_normal};
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
  z-index: 999;
  background-color: rgba(34, 34, 34, 0.5);
  width: 100%;
  height: 100%;
`;
