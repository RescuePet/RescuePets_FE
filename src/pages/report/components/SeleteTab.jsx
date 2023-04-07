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
  onChangeNickname,
}) => {
  console.log(tabValue);
  // console.log(openNickname);

  const [currentGenderTab, setCurrentGenderTab] = useState(2);
  const [currentNeuteredTab, setCurrentNeuteredTab] = useState(2);
  const [currentNicknameTab, setCurrentNicknameTab] = useState(0);

  // Edit 일때 값이 캐싱 되는 현상
  useEffect(() => {
    if (tabValue?.GenderNum === 'MALE') {
      setCurrentGenderTab(0);
      console.log("MALE");
    } else if (tabValue?.GenderNum === 'FEMALE') {
      setCurrentGenderTab(1);
      console.log("FEMALE");
    } else if (tabValue?.GenderNum === 'UNKNOWN') {
      setCurrentGenderTab(2);
      console.log("UNKNOWN");
    } else if (tabValue?.GenderNum == "") {
      setCurrentGenderTab(0);
      console.log("NOTHING");
    }
    if (tabValue?.neuterYn === 'YES') {
      setCurrentNeuteredTab(0);
      console.log("YES");
    } else if (tabValue?.neuterYn === 'NO') {
      setCurrentNeuteredTab(1);
      console.log("NO");
    } else if (tabValue?.neuterYn === 'UNKNOWN') {
      setCurrentNeuteredTab(2);
      console.log("UNKNOWN");
    } else if (tabValue?.neuterYn == "") {
      setCurrentNeuteredTab(0);
      console.log("NOTHING");
    }
    if (tabValue?.ninkCheck === true) {
      setCurrentNicknameTab(0);
      console.log("true");
    } else if (tabValue?.ninkCheck === false) {
      setCurrentNicknameTab(1);
      console.log("false");
    } else if (tabValue?.ninkCheck == "") {
      setCurrentNicknameTab(0);
      console.log("NOTHING");
    } else {
      console.log("에러");
      // setCurrentGenderTab(2);
      // setCurrentNeuteredTab(1);
      // setCurrentNicknameTab(0);
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

  const selectNicknameHandler = (index) => {
    setCurrentNicknameTab(index);
    onChangeNickname(openNickname[index].value);
  };

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

        <ReportAnimalInfoCheckBox>
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
        </ReportAnimalInfoCheckBox>
      </ReportAnimalTabBox>
    </>
  );
};

export default SeleteTab;
