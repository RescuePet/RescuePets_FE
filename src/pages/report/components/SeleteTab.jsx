import React, { useState } from "react";
import { ReportAnimalInfoBox, ReportAnimalInfoCheckBox ,ReportAnimalInfoCheckBoxTitle ,ReportAnimalInfoCheckBoxSelete } from './reportstyle'
import { SeletegenderArr, seleteneuteredArr} from "./data";

const SeleteTab = ({onChangeGender,onChangeNeutered}) => {

  // TAB 로직 
  const [currentGenderTab, setCurrentGenderTab] = useState(0);
  const [currentNeuteredTab, setCurrentNeuteredTab] = useState(0);

  const selectMGenderHandler = (index) => {
    setCurrentGenderTab(index);
    onChangeGender(SeletegenderArr[index].value)
    // setCurrentGenderValue(SeletegenderArr[index].gender);
    // setCurrentGenderEnValue(SeletegenderArr[index].value);
  };
  const selectNeuteredHandler = (index) => {
    setCurrentNeuteredTab(index);
    onChangeNeutered(seleteneuteredArr[index].value)
    // setCurrentNeuteredValue(seleteneuteredArr[index].neutered);
    // setCurrentNeuteredEnValue(seleteneuteredArr[index].value);
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
                        index === currentGenderTab
                          ? "submenu focused"
                          : "submenu"
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
                        index === currentNeuteredTab
                          ? "submenu focused"
                          : "submenu"
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
  )
}

export default SeleteTab