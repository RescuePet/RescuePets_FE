import React, { useEffect, useState } from "react";
import {
  ReportAnimalInfoCheckBox,
  ReportAnimalInfoCheckBoxTitle,
  ReportAnimalInfoCheckBoxSelete,
  ReportAnimalTabBox,
} from "./reportstyle";
import { SeletegenderArr, seleteneuteredArr, openNickname } from "./data";

const SeleteTab = ({
  tabValue,
  onChangeGender,
  onChangeNeutered,
  // onChangeNickname,
}) => {
  const [currentGenderTab, setCurrentGenderTab] = useState(2);
  const [currentNeuteredTab, setCurrentNeuteredTab] = useState(2);
  // const [currentNicknameTab, setCurrentNicknameTab] = useState(0);

  // Edit 일때 값이 캐싱 되는 현상
  useEffect(() => {
    if (tabValue?.GenderNum === "MALE") {
      setCurrentGenderTab(0);
    } else if (tabValue?.GenderNum === "FEMALE") {
      setCurrentGenderTab(1);
    } else if (tabValue?.GenderNum === "UNKNOWN") {
      setCurrentGenderTab(2);
    } else if (tabValue?.GenderNum == "") {
      setCurrentGenderTab(0);
    }
    if (tabValue?.neuterYn === "YES") {
      setCurrentNeuteredTab(0);
    } else if (tabValue?.neuterYn === "NO") {
      setCurrentNeuteredTab(1);
    } else if (tabValue?.neuterYn === "UNKNOWN") {
      setCurrentNeuteredTab(2);
    } else if (tabValue?.neuterYn == "") {
      setCurrentNeuteredTab(0);
    }
    // if (tabValue?.ninkCheck == true) {
    //   setCurrentNicknameTab(0);
    // } else if (tabValue?.ninkCheck == false) {
    //   setCurrentNicknameTab(1);
    // } else if (tabValue?.ninkCheck == "") {
    //   setCurrentNicknameTab(0);
    // } 
    else {
      console.log("에러");
    }
  }, []);

  const selectMGenderHandler = (index) => {
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
                onClick={() => selectMGenderHandler(index)}
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
            {seleteneuteredArr.map((el, index) => (
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
