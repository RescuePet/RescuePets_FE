import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../elements/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onboarding } from "../../redux/modules/onboardingSlice";
import { Body_500_14 } from "../../style/theme";

import onboarding2 from "../../asset/onboarding/2.png";

const OnBoardingTab2 = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabCount2, setTabCount2] = useState(2);

  const onClickTabBtn = () => {
    dispatch(onboarding(tabCount2));
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
        <TabImageBox src={onboarding2}></TabImageBox>

        <TabTextBox>
          <h3>편하고 빠르게 잃어버린 반려동물을 등록해보세요!</h3>
        </TabTextBox>
        <TabButtonBox>
          <TabNoneThisBox></TabNoneThisBox>

          <TabThisBox></TabThisBox>

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

export default OnBoardingTab2;

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
  margin: auto 0;
  width: 182px;
  height: 242px;
`;

const TabTextBox = styled.div`
  width: 80%;
  height: 10%;
  margin-top: 1.5625rem;
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

  /* 23 */
`;

const TabThisBox = styled.div`
  width: 23px;
  height: 8px;
  background: ${(props) => props.theme.color.primary_nomal};
  border-radius: 10px;
`;

const TabNoneThisBox = styled.div`
  width: 8px;
  height: 8px;
  background: #cccccc;
  border-radius: 4px;
`;

const TabNextButtonArea = styled.div`
  margin-top: 100px;
  ${(props) => props.theme.FlexCenter}
`;
