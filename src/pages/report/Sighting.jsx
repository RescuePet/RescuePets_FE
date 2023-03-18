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
  // React-hook-form
  const {
    register, handleSubmit, formState: { errors },
    reset, resetField, getValues } = useForm();

  // form submit 로직
  const onSubmitSightingHanlder = (data) => {
    console.log(data)
    console.log(currentSeleteValue)
  }
  // 버튼을 누르면 선택된 usehookForm 제거 
  const onClickDeleteanimaltypes = () => {
    resetField("animaltypes")
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

          </ReportAnimalInfoBox>
        </ReportAnimalInfoArea>
        <Button type="submit" TabBtn2>작성 완료</Button>
      </ReportSightingContainer>
    </Layout>
  )
}

export default Sighting