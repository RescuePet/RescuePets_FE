import React, { useEffect, useState } from "react";
import {
  ReportAnimalInfoBox,
  ReportAnimalInfoCheckBox,
  ReportAnimalInfoCheckBoxTitle,
  ReportAnimalInfoCheckBoxSelete,
} from "./reportstyle";
import { SeletegenderArr, seleteneuteredArr } from "./data";

const SeleteTab = ({ onChangeGender, onChangeNeutered, tabValue }) => {
  console.log(tabValue);

  const [currentGenderTab, setCurrentGenderTab] = useState(2);
  const [currentNeuteredTab, setCurrentNeuteredTab] = useState(2);

  useEffect(() => {
    if (tabValue?.GenderNum == "MALE") {
      setCurrentGenderTab(0);
    } else if (tabValue?.GenderNum == "FEMALE") {
      setCurrentGenderTab(1);
    } else if (tabValue?.GenderNum == "UNKNOWN") {
      setCurrentGenderTab(2);
    } else if (tabValue?.GenderNum == "") {
      setCurrentGenderTab(0);
    }
    if (tabValue?.neuterYn == "YES") {
      setCurrentNeuteredTab(0);
    } else if (tabValue?.neuterYn == "NO") {
      setCurrentNeuteredTab(1);
    } else if (tabValue?.neuterYn == "UNKNOWN") {
      setCurrentNeuteredTab(2);
    } else if (tabValue?.neuterYn == "") {
      setCurrentNeuteredTab(0);
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
  return (
    <>
      <ReportAnimalInfoBox>
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
      </ReportAnimalInfoBox>
    </>
  );
};

export default SeleteTab;
