import React, { useState } from "react";
import styled from "styled-components";
import FooterIconChat from "../asset/footericon/FooterIconChat.svg";
import FooterIconMypage from "../asset/footericon/FooterIconMypage.svg";
import FooterIconHome from "../asset/footericon/FooterIconHome.svg";
import FooterIconNetwork from "../asset/footericon/FooterIconNetwork.svg";
import "./Footer.css";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../redux/modules/menubarSlice";
import { useNavigate } from "react-router-dom";
import reportmissing from "../asset/reportmissing.svg";
import reportcatch from "../asset/reportcatch.svg";

const Footer = () => {
  // payload로 값 보내기 위한 훅
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const MoveToMissing = navigate('/missing')
  // const MoveToSighting = navigate('/sighting')

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
      <FooterEachIconContiner>
        <img src={FooterIconHome} alt="home" />
        <p>홈</p>
      </FooterEachIconContiner>
      <FooterEachIconContiner>
        <img src={FooterIconNetwork} alt="petwork" />
        <p>펫트워크</p>
      </FooterEachIconContiner>
      <FooterEachIconContiner>
        <img src={FooterIconChat} alt="chat" />
        <p>채팅</p>
      </FooterEachIconContiner>
      <FooterEachIconContiner>
        <img src={FooterIconMypage} alt="profile" />
        <p>마이페이지</p>
      </FooterEachIconContiner>
      <FooterEachIconContiner>
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
              <img src={reportcatch} alt="catch" />
              <span>목격 글 작성하기</span>
            </FooterMenuList>
          </Navigation>
        )}
        {menuBar && <ToggleBackground />}
      </FooterEachIconContiner>
    </FooterContiner>
  );
};

export default Footer;

const FooterContiner = styled.div`
  width: 428px;
  height: 76px;
  border-top: 1px solid ${(props) => props.theme.color.text_disable};
  padding-top: 10px;
  ${(props) => props.theme.FlexCenter}
  gap: 10px 72px;
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
  right: -50px;
  bottom: 5px;
  width: 200px;
  height: 170px;
  ${(props) => props.theme.FlexColumn}
  gap: 10px 0;
`;

const FooterMenuList = styled.div`
  width: 9.6875rem;
  height: 2.75rem;
  z-index: 50;
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
  z-index: 50;
  position: absolute;
  bottom: -10px;
  width: 40px;
  height: 40px;
  background: ${(props) => props.theme.color.text_nomal};
  border-radius: 50%;
  ${(props) => props.theme.FlexCenter}
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  &::before {
    position: absolute;
    height: 40px;
    width: 40px;
    top: 0;
    content: "+";
    text-align: center;
    font-size: 3em;
    font-weight: 300;
    color: ${(props) => props.theme.color.white};
    transition: 1s;
  }
`;

const FooterEachIconContiner = styled.div`
  position: relative;
  ${(props) => props.theme.FlexCenter}
  flex-direction: row;
  > img {
    position: absolute;
    bottom: 5px;
  }
  > p {
    width: 80px;
    top: 5px;
    position: absolute;
    font-size: 12px;
    text-align: center;
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
