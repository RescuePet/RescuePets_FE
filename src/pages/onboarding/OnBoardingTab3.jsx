import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../elements/Button";
import { useDispatch } from "react-redux";
import { onboarding } from "../../redux/modules/onboardingSlice";
import { Body_500_14 } from "../../style/theme";

import onboarding3 from "../../asset/onboarding/3.png";

const OnBoardingTab3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tabCount3, setTabCount3] = useState(0);

  const onClickTabBtn = () => {
    dispatch(onboarding(tabCount3));
  };

  return (
    <>
      <TabContainer>
        <TabHander onClick={onClickTabBtn}>FIRST PAGE</TabHander>
        <TabImageBox src={onboarding3} />
        <TabTextBox>
          <h3>유기동물의 가족이 되어주세요!</h3>
        </TabTextBox>
        <TabButtonBox>
          <TabNoneThisBox></TabNoneThisBox>
          <TabNoneThisBox></TabNoneThisBox>
          <TabThisBox></TabThisBox>
        </TabButtonBox>
        <TabNextButtonArea>
          <Button
            onClick={() => {
              navigate("/signin");
            }}
            fillButton
          >
            로그인
          </Button>
        </TabNextButtonArea>
      </TabContainer>
    </>
  );
};

export default OnBoardingTab3;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin-top: calc(50% - 90px);
  padding: 1.875rem 1rem;
`;

const TabHander = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: right;
  padding-right: 1.25rem;
  font-weight: 700;
  cursor: pointer;
  ${Body_500_14}
  color: ${(props) => props.theme.color.text_alternative};
`;

const TabImageBox = styled.img`
  margin: auto 0;
  width: 15rem;
  height: 12.0625rem;
  margin-top: calc(50% - 100px);
`;

const TabTextBox = styled.div`
  width: 80%;
  height: 10%;
  margin-top: 1.875rem;
  padding: 0 3.125rem;
  text-align: center;
  h3 {
    ${(props) => props.theme.Title_700_18}
  }
`;

const TabButtonBox = styled.div`
  width: 50%;
  height: 3%;
  /* border: .0625rem solid red; */
  ${(props) => props.theme.FlexCenter}
  gap: 0 .625rem;
  margin-top: 1.875rem;
  /* 23 */
`;

const TabThisBox = styled.div`
  width: 1.4375rem;
  height: 0.5rem;
  background: ${(props) => props.theme.color.primary_normal};
  border-radius: 0.625rem;
`;

const TabNoneThisBox = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background: #cccccc;
  border-radius: 0.625rem;
`;

const TabNextButtonArea = styled.div`
  margin-top: 6.25rem;
  ${(props) => props.theme.FlexCenter}
`;
