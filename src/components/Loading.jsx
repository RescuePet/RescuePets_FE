import React from "react";
import styled, { keyframes } from "styled-components";
import spinnerImg from "../asset/Spinner/spinner.png";

export const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingInRound>
        <LoadingInRound2>
          <LoadingInRound3>
            <LoadingInRound4 src={spinnerImg} />
          </LoadingInRound3>
        </LoadingInRound2>
      </LoadingInRound>
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  margin: auto;
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
  ${(props) => props.theme.FlexCenter}
  width: 6rem;
  height: 6rem;
  background: ${(props) => props.theme.color.primary_assistive};
  border-radius: 50%;
  animation: ${imgAni} 1s both infinite;
`;

const LoadingInRound2 = styled.div`
  ${(props) => props.theme.FlexCenter}
  width: 4rem;
  height: 4rem;
  background: ${(props) => props.theme.color.primary_altemative};
  border-radius: 50%;
  animation: ${imgAni2} 1s both infinite;
`;

const LoadingInRound3 = styled.div`
  width: 2rem;
  height: 2rem;
  background: ${(props) => props.theme.color.primary_normal};
  border-radius: 50%;
  animation: ${imgAni3} 1s both infinite;
`;

const LoadingInRound4 = styled.img`
  position: absolute;
  right: 1%;
  bottom: 0.5%;
  animation: ${imgAni4} 1s both infinite;
`;
