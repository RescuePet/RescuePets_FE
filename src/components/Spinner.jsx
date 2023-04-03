import React from 'react'
import styled, { keyframes } from 'styled-components'
import spinnerImg from "../asset/Spinner/spinner.png"



export const Spinner = () => {
  return (
    <LoadingBackBg>

        <LoadingInRound >
            <LoadingInRound2>
                <LoadingInRound3>
                  <LoadingInRound4 src={spinnerImg}/>
                </LoadingInRound3>
            </LoadingInRound2>
        </LoadingInRound> 

    </LoadingBackBg>
  )
}

const LoadingBackBg = styled.div`
  ${(props) => props.theme.FlexCenter};
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1px);
`;


const imgAni = keyframes`
0% {opacity: 0}
`;

const imgAni2 = keyframes`
0% {
  opacity: 0;
}
25% {
  opacity: 0;
}`;
const imgAni3 = keyframes`
0% {
  opacity: 0;
}
25% {
  opacity: 0;
}
50% {
  opacity: 0;
}`;
const imgAni4 = keyframes`
0% {
  opacity: 0;
}
25% {
  opacity: 0;
}
50% {
  opacity: 0;
}
75% {
  opacity: 0;
}
`;


const LoadingInRound = styled.div`
    position: relative;
    ${props => props.theme.FlexCenter}
    width: 6rem;
    height: 6rem;
    background: ${props => props.theme.color.primary_assistive};
    border-radius: 50%;
    animation: ${imgAni} 1.5s both infinite;
`;


const LoadingInRound2 = styled.div`
    ${props => props.theme.FlexCenter}
    width: 4rem;
    height: 4rem;
    background: ${props => props.theme.color.primary_altemative};
    border-radius: 50%;
    animation: ${imgAni2} 1.5s both infinite;
`;


const LoadingInRound3= styled.div`
    width: 2rem;
    height: 2rem;
    background: ${props => props.theme.color.primary_normal};
    border-radius: 50%;
    animation: ${imgAni3} 1.5s both infinite;
`;

const LoadingInRound4 = styled.img`
  position: absolute;
  right: 1%;
  bottom: 0.5%;
  animation: ${imgAni4} 1.5s both infinite;
`