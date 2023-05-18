import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SeletegenderArr, seleteneuteredArr, openNickname } from "./data";

const SeleteTab = ({
  tabValue,
  onChangeGender,
  onChangeNeutered,
  // onChangeNickname,
}) => {
  const [currentGenderTab, setCurrentGenderTab] = useState(2);
  const [currentNeuteredTab, setCurrentNeuteredTab] = useState(0);
  // const [currentNicknameTab, setCurrentNicknameTab] = useState(0);

  // Edit 일때 값이 캐싱 되는 현상
  useEffect(() => {
    if (tabValue?.neuterYn == "YES") {
      return setCurrentNeuteredTab(0);
    } else if (tabValue?.neuterYn == "NO") {
      return setCurrentNeuteredTab(1);
    } else if (tabValue?.neuterYn == "UNKNOWN") {
      return setCurrentNeuteredTab(2);
    }
  }, []);

  useEffect(() => {
    if (tabValue?.GenderNum === "MALE") {
      return setCurrentGenderTab(0);
    } else if (tabValue?.GenderNum === "FEMALE") {
      return setCurrentGenderTab(1);
    } else if (tabValue?.GenderNum === "UNKNOWN") {
      return setCurrentGenderTab(2);
    }
  }, []);


  
  const selectGenderHandler = (index) => {
    setCurrentGenderTab(index);
    onChangeGender(SeletegenderArr[index].value);
  };

  const selectNeuteredHandler = (index) => {
    setCurrentNeuteredTab(index);
    onChangeNeutered(seleteneuteredArr[index].value);
  };

  // const selectNicknameHandler = (index) => {
  //   setCurrentNicknameTab(index);
  //   onChangeNickname(openNickname[index].value);
  // };

  return (
    <>
      <ReportAnimalTabBox>
        <ReportAnimalInfoCheckBox>
          <ReportAnimalInfoCheckBoxTitle>
            <p>성별</p>
          </ReportAnimalInfoCheckBoxTitle>
          <ReportAnimalInfoCheckBoxSelete>
            {SeletegenderArr.map((el, index) => (
              <li
                key={index}
                className={
                  index === currentGenderTab ? "submenu focused" : "submenu"
                }
                onClick={() => selectGenderHandler(index)}
              >
                {el.gender}
              </li>
            ))}
          </ReportAnimalInfoCheckBoxSelete>
        </ReportAnimalInfoCheckBox>

        <ReportAnimalInfoCheckBox>
          <ReportAnimalInfoCheckBoxTitle>
            <p>중성화</p>
          </ReportAnimalInfoCheckBoxTitle>
          <ReportAnimalInfoCheckBoxSelete>
            {seleteneuteredArr?.map((el, index) => (
              <li
                key={index}
                className={
                  index === currentNeuteredTab ? "submenu focused" : "submenu"
                }
                onClick={() => selectNeuteredHandler(index)}
              >
                {el.neutered}
              </li>
            ))}
          </ReportAnimalInfoCheckBoxSelete>
        </ReportAnimalInfoCheckBox>

        {/* <ReportAnimalInfoCheckBox>
          <ReportAnimalInfoCheckBoxTitle>
            <p>닉네임 공개</p>
          </ReportAnimalInfoCheckBoxTitle>
          <ReportAnimalInfoCheckBoxSelete>
            {openNickname.map((el, index) => (
              <li
                key={index}
                className={
                  index === currentNicknameTab ? "submenu focused" : "submenu"
                }
                onClick={() => selectNicknameHandler(index)}
              >
                {el.boolean}
              </li>
            ))}
          </ReportAnimalInfoCheckBoxSelete>
        </ReportAnimalInfoCheckBox> */}
      </ReportAnimalTabBox>
    </>
  );
};

export default SeleteTab;

const ReportAnimalTabBox = styled.section`
  width: 100%;
  height: 12.5rem;
`;

const ReportAnimalInfoCheckBox = styled.div`
  width: 100%;
  height: 33.3%;
  ${(props) => props.theme.FlexColumn}
`;

const ReportAnimalInfoCheckBoxTitle = styled.div`
  width: 100%;
  height: 20%;
  > p {
    color: ${(props) => props.theme.color.gray};
    ${(props) => props.theme.Body_400_12}
  }
`;

const ReportAnimalInfoCheckBoxSelete = styled.ul`
  width: 100%;
  height: 80%;
  gap: 0 1rem;
  ${(props) => props.theme.FlexCenter}
  > li {
    width: 6.3125rem;
    height: 2rem;
    cursor: pointer;
  }
  .submenu {
    height: 2rem;
    border-radius: 1rem;
    border: 1px solid #cccccc;
    color: #cccccc;
    ${(props) => props.theme.FlexCenter}
    ${(props) => props.theme.Body_400_12}
  }
  .focused {
    border: 1px solid ${(props) => props.theme.color.primary_normal};
    color: ${(props) => props.theme.color.primary_normal};
  }
`;
