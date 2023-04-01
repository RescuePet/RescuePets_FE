import React from 'react'
import styled, { keyframes } from 'styled-components'


export const Loading = () => {
  return (
    <LoadingBackBg>
        <LoadingInRound >
            <LoadingInRound2>
                <LoadingInRound3>
                  {/* <img src={]/> */}
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
  /* .LoadingInRound{
    position: absolute;
    top: 35%;
    width: 4rem;
    height: 4rem;
    background: #FFE4BC;
    border-radius: 50%;
  } */
`;
const LoadingInRound= styled.div`
    ${props => props.theme.FlexCenter}
    width: 6rem;
    height: 6rem;
    background: ${props => props.theme.color.primary_assistive};
    border-radius: 50%;
   /* kill -9 12345 */
`
const LoadingInRound2= styled.div`
    ${props => props.theme.FlexCenter}
    width: 3.5rem;
    height: 3.5rem;
    background: ${props => props.theme.color.primary_altemative};
    border-radius: 50%;
`
const LoadingInRound3= styled.div`
    width: 2rem;
    height: 2rem;
    background: ${props => props.theme.color.primary_normal};
    border-radius: 50%;
`
