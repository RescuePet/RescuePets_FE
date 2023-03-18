import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import styled from 'styled-components'
import Layout from "../../layouts/Layout"
import Button from "../../elements/Button"
import cancel from "../../asset/delete.svg";
import imageCompression from 'browser-image-compression';
import imgdelete from "../../asset/imgDelete.svg";
import Marker from "../../asset/marker.png"
import {
  ReportSightingContainer, ReportHeader, ReportAnimalInfoArea, ReportAnimalInfoBox, ReportAnimalInfoCheckBox
  , ReportAnimalInfoCheckBoxTitle, ReportAnimalInfoCheckBoxSelete, ReportAnimalInfoBoxColumn, ReportAnimalInfoBoxColumnRow,
  ReportAnimalInfoBoxColumnColunb, ReportanimaltypesBox, ReportanimaltypesTitle, ReportanimaltypesSelect, ReportInput, ReportLgInput,
  SelectBox, Label, SelectOptions, Option, ReportKakaoMapBox, ReportKakaoMapBoxTitle, ReportKakaoMapBoxMap, ReportAnimalDayBox,
  ReportAnimalsignificantBox, ReportAnimalsignificantBoxTitle, ReportAnimalsignificantBoxInput, ReportAnimalPictureArea,
  ReportAnimalPictureAreaTitle, ReportAnimalPictureAreaInputBox, ReportAnimalPictureInput, ReportAnimalPicturePreview, ReportAnimalUserInfo
} from './components/reportstyle';

const Sighting = () => {
  let imageRef;
  const { kakao } = window;

  // Selete로직 
  const [currentSeleteValue, setCurrentSeleteValue] = useState('강아지')
  const [isShowOptions, setShowOptions] = useState(false);
  const handleOnChangeSelectValue = (e) => {
    const { innerText } = e.target;
    setCurrentSeleteValue(innerText);
  };
  // Tab 로직 성별 중성화 
  const [currentGenderTab, setCurrentGenderTab] = useState(0);
  const [currentNeuteredTab, setCurrentNeuteredTab] = useState(0);
  const SeletegenderArr = [
    { gender: '수컷' },
    { gender: '암컷' },
    { gender: '모름' },
  ];

  const seleteneuteredArr = [
    { neutered: "완료" },
    { neutered: "미완료" },
    { neutered: "모름" }
  ];
  const [currentGenderValue, setCurrentGenderValue] = useState('수컷');
  const [currentNeuteredValue, setCurrentNeuteredValue] = useState('완료');

  const selectMGenderHandler = (index) => {
    setCurrentGenderTab(index);
    setCurrentGenderValue(SeletegenderArr[index].gender)
  };
  const selectNeuteredHandler = (index) => {
    setCurrentNeuteredTab(index);
    setCurrentNeuteredValue(seleteneuteredArr[index].neutered)
  };

  // React-hook-form
  const {
    register, handleSubmit, formState: { errors },
    reset, resetField, getValues } = useForm();

  // form submit 로직
  const onSubmitSightingHanlder = (data) => {
    console.log(data.animaltypes)
    console.log(currentSeleteValue)
    console.log(currentGenderValue)
    console.log(currentNeuteredValue)
    console.log(data.animalAge)
    console.log(data.animalkg)

  }
  // 버튼을 누르면 선택된 usehookForm 제거 
  const onClickDeleteanimaltypes = () => {
    resetField("animaltypes")
  }
  const onClickDeleteanimalKg = () => {
    resetField("animalkg")
  }
  const onClickDeleteanimalAge = () => {
    resetField("animalAge")
  }

  return (
    <Layout>
      <ReportSightingContainer onSubmit={handleSubmit(onSubmitSightingHanlder)}>

        <ReportHeader>
          <div></div>
          <div>목격 글 작성하기</div>
          <div>x</div>
        </ReportHeader>

        <ReportAnimalInfoArea>
          <ReportAnimalInfoBox>


            <ReportanimaltypesTitle>동물정보</ReportanimaltypesTitle>
            {/* 동물정보 종류, 품종 */}
            <ReportanimaltypesSelect>
              <div>
                <p>종류</p>
                <SelectBox onClick={() => setShowOptions((isShowOptions) => !isShowOptions)}>
                  <Label>{currentSeleteValue}</Label>
                  <SelectOptions show={isShowOptions}>

                    <Option onClick={handleOnChangeSelectValue}>강아지</Option>
                    <Option onClick={handleOnChangeSelectValue}>고양이</Option>
                    <Option onClick={handleOnChangeSelectValue}>기타</Option>

                  </SelectOptions>
                </SelectBox>
              </div>

              <div>
                <p>품종</p>
                <ReportInput type="text" placeholder="입력하기"
                  {...register("animaltypes", {
                    pattern: { value: /^[ㄱ-ㅎ|가-힣]+$/, message: "한글만 2 ~ 8글자 사이로 입력", },
                  })} />
                <img src={cancel} onClick={onClickDeleteanimaltypes} />
                <span>{errors?.animaltypes?.message}</span>
              </div>
            </ReportanimaltypesSelect>

            <ReportAnimalInfoBox>
              {/* 성별 */}
              <ReportAnimalInfoCheckBox>
                <ReportAnimalInfoCheckBoxTitle> <p>성별</p></ReportAnimalInfoCheckBoxTitle>
                <ReportAnimalInfoCheckBoxSelete>
                  {
                    SeletegenderArr.map((el, index) => (
                      <li
                        key={index}
                        className={index === currentGenderTab ? "submenu focused" : "submenu"}
                        onClick={() => selectMGenderHandler(index)}
                      >
                        {el.gender}
                      </li>
                    ))}
                </ReportAnimalInfoCheckBoxSelete>
              </ReportAnimalInfoCheckBox>
              {/* 중성화 */}
              <ReportAnimalInfoCheckBox>
                <ReportAnimalInfoCheckBoxTitle> <p>중성화</p> </ReportAnimalInfoCheckBoxTitle>
                <ReportAnimalInfoCheckBoxSelete>
                  {
                    seleteneuteredArr.map((el, index) => (
                      <li
                        key={index}
                        className={index === currentNeuteredTab ? "submenu focused" : "submenu"}
                        onClick={() => selectNeuteredHandler(index)}
                      >
                        {el.neutered}
                      </li>
                    ))}
                </ReportAnimalInfoCheckBoxSelete>
              </ReportAnimalInfoCheckBox>
            </ReportAnimalInfoBox>

            {/* 나이 체중 색상*/}
            <ReportAnimalInfoBox>
              {/* 나이 체중  */}
              <ReportAnimalInfoBoxColumn>

                <ReportAnimalInfoBoxColumnRow>
                  <p>나이</p>
                  <ReportInput type="text" placeholder='입력하기'
                    {...register("animalAge", {
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "숫자만입력가능",
                      },
                      maxLength: {
                        value: 3,
                        message: "숫자만 입력! 3자리수 이하로 작성",
                      }
                    })} />
                  <img src={cancel} onClick={onClickDeleteanimalAge} />
                  <span>{errors?.animalkg?.message}</span>
                </ReportAnimalInfoBoxColumnRow>

                <ReportAnimalInfoBoxColumnRow>
                  <p>체중(Kg)</p>

                  <ReportInput type="text" placeholder='입력하기'
                    {...register("animalkg", {
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "숫자만입력가능",
                      },
                      maxLength: {
                        value: 3,
                        message: "숫자만 입력! 3자리수 이하로 작성",
                      }
                    })} />
                  <img src={cancel} onClick={onClickDeleteanimalKg} />
                  <span>{errors?.animalkg?.message}</span>

                </ReportAnimalInfoBoxColumnRow>
              </ReportAnimalInfoBoxColumn>
              {/* 색상 */}
              <ReportAnimalInfoBoxColumn>

              </ReportAnimalInfoBoxColumn>

            </ReportAnimalInfoBox>


          </ReportAnimalInfoBox>
        </ReportAnimalInfoArea>
        <Button type="submit" TabBtn2>작성 완료</Button>
      </ReportSightingContainer>
    </Layout>
  )
}

export default Sighting