import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../../elements/Button";
import { useDispatch } from "react-redux";
import { onboarding } from "../../redux/modules/onboardingSlice";
import { Body_500_14 } from "../../style/theme";

import onboarding1 from "../../asset/onboarding/1.png";

const OnBoardingTab1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tabCount1, setTabCount1] = useState(1);

  const onClickTabBtn = () => {
    dispatch(onboarding(tabCount1));
  };

  return (
    <>
      <TabContainer>
        <TabHander
          onClick={() => {
            navigate("/signin");
          }}
        >
          SKIP
        </TabHander>
        <TabImageBox src={onboarding1}></TabImageBox>

        <TabTextBox>
          <h3>API기반으로 실시간 유기동물을 구할 수 있어요!</h3>
        </TabTextBox>

        <TabButtonBox>
          <TabThisBox></TabThisBox>
          <TabNoneThisBox></TabNoneThisBox>
          <TabNoneThisBox></TabNoneThisBox>
        </TabButtonBox>

        <TabNextButtonArea>
          <Button emptyButton onClick={onClickTabBtn}>
            다음
          </Button>
        </TabNextButtonArea>
      </TabContainer>
    </>
  );
};

export default OnBoardingTab1;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px 16px;
  width: 100%;
  height: 100vh;
`;
const TabHander = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: right;
  padding-right: 20px;
  font-weight: 700;
  cursor: pointer;
  ${Body_500_14}
  color: ${(props) => props.theme.color.text_alternative};
`;

const TabImageBox = styled.img`
  width: 240px;
  height: 149px;
  margin: auto 0;
`;

const TabTextBox = styled.div`
  width: 80%;
  height: 10%;
  padding: 0 50px;
  text-align: center;
  h3 {
    ${(props) => props.theme.Title_700_18}
  }
`;

const TabButtonBox = styled.div`
  width: 50%;
  height: 3%;
  ${(props) => props.theme.FlexCenter}
  gap: 0 10px;
`;

const TabThisBox = styled.div`
  width: 23px;
  height: 8px;
  background: ${(props) => props.theme.color.primary_normal};
  border-radius: 10px;
`;

const TabNoneThisBox = styled.div`
  width: 8px;
  height: 8px;
  background: #cccccc;
  border-radius: 10px;
`;

const TabNextButtonArea = styled.div`
  margin-top: 100px;
  ${(props) => props.theme.FlexCenter}
`;
