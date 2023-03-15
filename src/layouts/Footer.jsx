import React, { useState } from 'react'
import styled from 'styled-components'
import FooterIconChat from "../asset/FooterIconChat.svg"
import FooterIconMypage from "../asset/FooterIconMypage.svg"
import FooterIconHome from "../asset/FooterIconHome.svg"
import FooterIconNetwork from "../asset/FooterIconNetwork.svg"
import './Footer.css'
import { useDispatch } from 'react-redux';
import { toggleMenu } from "../redux/modules/menubarSlice"

const Footer = () => {

    // payload로 값 보내기 위한 훅 
    const dispatch = useDispatch();

    const [menuBar, setMenuBar] = useState(false)

    const [menuBarToggle, setMenuBarToggle] = useState(false);

    const onClickMenuBarHandler = () => {
        setMenuBar(!menuBar)
        setMenuBarToggle(!menuBarToggle)
        dispatch(toggleMenu(menuBarToggle))
        const ToggleBtn = document.querySelector('.toggleBtn')
        // console.log(ToggleBtn)
        // console.log(menuBar)
        if (menuBar === true) {
            ToggleBtn.classList.remove('active')
        }
        else {
            ToggleBtn.classList.add('active')
        }

    }

    return (
        <FooterContiner>

            {
                menuBar === false ?
                    null
                    :
                    (
                        <Navigation>
                            <FooterMenuList>? 실종 글 작성하기 </FooterMenuList>
                            <FooterMenuList>🚨 목격 글 작성하기</FooterMenuList>
                        </Navigation>
                    )
            }

            {/* <FooterIconToggleBtn className='toggleBtn'
                onClick={onClickMenuBarHandler}></FooterIconToggleBtn> */}

            <FooterEachIconContiner> <img src={FooterIconHome} />    <p>홈</p>       </FooterEachIconContiner>
            <FooterEachIconContiner >   <img src={FooterIconNetwork} /> <p>펫페크워크</p> </FooterEachIconContiner>
            <FooterEachIconContiner >   <img src={FooterIconChat} />    <p>채팅</p>     </FooterEachIconContiner>
            <FooterEachIconContiner>   <img src={FooterIconMypage} />  <p>마이페이지</p> </FooterEachIconContiner>
            <FooterEachIconContiner>   <FooterIconToggleBtn className='toggleBtn'
                onClick={onClickMenuBarHandler}></FooterIconToggleBtn>      </FooterEachIconContiner>

        </FooterContiner>
    )
}

export default Footer

const FooterContiner = styled.div`
    width: 100%;
    height: 4.75rem;
    border-top: 1px solid gray;
    padding-top: 10px;
    ${(props) => props.theme.FlexCenter}
    gap: 10px 72px;
    position: relative;
    z-index: 10;

    @media screen and (min-width: 431px) {
        position: fixed;
        bottom: 0%;
  }
`;

// 메뉴바 모달
const Navigation = styled.div`
    position: absolute;
    left: 50%;
    bottom: 40px;
    width: 200px;
    height: 170px;
    /* border: 1px solid #fff;
    border-radius: 25px; */
    /* opacity: 0.9; */
    ${(props) => props.theme.FlexColumn}
    gap: 10px 0;
    /* &::after{
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -0.625rem;
      border-width: 0.625rem;
      border-style: solid;
      color: #eee;
      border-color: #fff transparent transparent transparent;
    } */
`;

const FooterMenuList = styled.div`
    width: 9.6875rem;
    height: 2.75rem;
    background: #666;
    color: #fff;
    ${props => props.theme.FlexCenter};
`;

// 모달 보이게 하는 검정색 원형 
const FooterIconToggleBtn = styled.div`
    position: absolute;
    bottom: -10px;
    width:  40px;
    height: 40px;
    background: #222222;
    border-radius: 50%;
    /* filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25)); */
    ${(props) => props.theme.FlexCenter}
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
    &::before{
    content: '+';
    position: absolute;
    top: 0;
    font-size: 3em;
    font-weight: 300;
    color: #ffff;
    transition: 1.5s;
    }
    /* &:active::before {
    transform: rotate(225deg);
    } */

`;



const FooterEachIconContiner = styled.div`
    position: relative;
    ${(props) => props.theme.FlexCenter}
    flex-direction: row;
    /* border: 1px solid red; */
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
`