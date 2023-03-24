import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Layout from "../../layouts/Layout"
import Button from "../../elements/Button"
import cancel from "../../asset/delete.svg";
import Location from "./components/Location";
import imageCompression from 'browser-image-compression';
import imgdelete from "../../asset/imgDelete.svg";
import { CustomSelect } from "../../elements/CustomSelect"
import {
  ReportSightingContainer, ReportHeader, ReportAnimalInfoArea, ReportAnimalInfoBox, ReportAnimalInfoCheckBox
  , ReportAnimalInfoCheckBoxTitle, ReportAnimalInfoCheckBoxSelete, ReportAnimalInfoBoxColumn, ReportAnimalInfoBoxColumnRow,
  ReportAnimalInfoBoxColumnColumn, ReportanimaltypesTitle, ReportanimaltypesSelect, ReportInput, ReportLgInput,
  ReportAnimalDayBox, ReportAnimalSignificantBox, ReportAnimalSignificantBoxTitle, ReportAnimalSignificantBoxInputArea, ReportAnimalPictureArea,
  ReportAnimalPictureAreaTitle, ReportAnimalPictureAreaInputBox, ReportAnimalPictureInput, ReportAnimalPicturePreview, PreviewImage
} from './components/reportstyle';
import { NameValue, TimeValue, SeletegenderArr, seleteneuteredArr } from './components/data';
import { __PostCatchData } from '../../redux/modules/catchSlice';
import { useDispatch } from 'react-redux';

const Catch = () => {
  let imageRef;
  const dispatch = useDispatch();

  // 종류데이터
  const [type, setType] = useState(NameValue[0].name)
  const [typeID, setTypeID] = useState('DOG')

  const onChangeData = (newData) => {
    setType(newData);
  }

  const onChangeID = (newValue) => {
    setTypeID(newValue)
  }

  const [time, setTime] = useState(TimeValue[0].name)
  const onChangeTimeData = (newData) => {
    setTime(newData);
  }
  // 콘솔없애기 위한 로직 
  const onChangeTimeValeu = () => {
  }


  // Tab 로직 
  const [currentGenderTab, setCurrentGenderTab] = useState(0); //tab
  const [currentGenderValue, setCurrentGenderValue] = useState('수컷');
  const [currentGenderEnValue, setCurrentGenderEnValue] = useState('DOG')

  const [currentNeuteredTab, setCurrentNeuteredTab] = useState(0);
  const [currentNeuteredValue, setCurrentNeuteredValue] = useState('완료');
  const [currentNeuteredEnValue, setCurrentNeuteredEnValue] = useState('YES');

  const selectMGenderHandler = (index) => {
    setCurrentGenderTab(index);
    setCurrentGenderValue(SeletegenderArr[index].gender)
    setCurrentGenderEnValue(SeletegenderArr[index].value)
  };
  const selectNeuteredHandler = (index) => {
    setCurrentNeuteredTab(index);
    setCurrentNeuteredValue(seleteneuteredArr[index].neutered)
    setCurrentNeuteredEnValue(seleteneuteredArr[index].value)
  };

  // 올린 이미지 담을 관리하는 State
  const [showImages, setShowImages] = useState([]);
  // 폼데이터로 이미지 관리하는 State
  const [imageFormData, setImageFormData] = useState([]);
  // 폼데이터로 보관중인 스테이트
  const [formImagin, setFormformImagin] = useState(new FormData());
  const [image, setImage] = useState([]);

  const onChangeUploadHandler = async (e) => {
    e.preventDefault();

    const imageLists = e.target.files;
    setImage([...imageLists])
    // console.log("폼데이터 보내야 할것들:", imageLists)
    setImageFormData(imageLists)

    setFormformImagin([...formImagin], ...e.target.files)

    let imageUrlLists = [...showImages];
    // 미리보기를 띄워주는 로직
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
      image.push(imageLists[i])
    }
    // 갯수제한을 걸어주는 로직 
    if (imageUrlLists.length > 3) {
      setImageFormData(imageFormData.slice(0, 3));
      imageUrlLists = imageUrlLists.slice(0, 3);
    }
    setShowImages(imageUrlLists);

    const formImg = new FormData();
    // console.log("Real", image.length)
    for (let i = 0; i < image.length; i++) {
      formImg.append("postImages", image[i]);
    }
    // 폼데이터를 폼데이터에 담고 진행 
    setFormformImagin(formImg);

    for (let value of formImagin.values()) {
      console.log("이미지폼데이터", value);
    }
  };

  const onClickDeleteHandler = (id) => {
    setShowImages('');
    setImageFormData('')
    window.location.reload()
  };

  // React-hook-form
  const {
    register, handleSubmit, formState: { errors },
    reset, resetField, watch } = useForm({ mode: 'onChange' });
  // 버튼을 누르면 선택된 usehookForm 제거 
  const onClickDeleteValue = (data) => {
    resetField(data)
  }

  // 주소 좌표값을 보내기 위한 것들 
  const addressDiv = document.getElementById('address');
  const addressLatDiv = document.getElementById('addressLat')
  const addressLngDiv = document.getElementById('addressLng')

  // 입력값에 따라 버튼 활성화
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (
      watch("animaltypes") !== "" &&
      // watch("animaltypes") !== "" &&
      watch("animalAge") !== "" &&
      watch("animalkg") !== "" &&
      watch("address") !== "" &&
      watch("animalcolor") !== "" &&
      addressDiv?.innerHTML !== "" &&
      watch("days") !== ""
    ) {
      // console.log('성공')
      setIsActive(false);
    } else {
      // console.log('실패')
      setIsActive(true);
    }
  }, [watch()]);



  // form submit 로직
  const onSubmitSightingHanlder = (data) => {
    if (addressDiv?.innerHTML === '') {
      alert('지도에 위치를 표기해주세요')
    } else {
      const formData = new FormData();
      formData.append("upkind", typeID)
      formData.append("sexCd", currentGenderEnValue)
      formData.append("neuterYn", currentNeuteredEnValue)
      formData.append("kindCd", data.animaltypes)
      formData.append("age", data.animalAge)
      formData.append("weight", data.animalkg)
      formData.append("colorCd", data.animalcolor)
      formData.append("happenPlace", addressDiv.innerHTML)
      formData.append("happenLatitude", addressLatDiv.innerHTML)
      formData.append("happenLongitude", addressLngDiv.innerHTML)
      formData.append("happenDt", data.days)
      formData.append("happenHour", time)
      formData.append("specialMark", data.characteristic)
      formData.append("content", data.memo)
      formData.append("gratuity", data.money)
      formData.append("contact", data.number)

      for (const keyValue of formImagin) {
        formData.append(keyValue[0], keyValue[1]);
      }

      for (let value of formData.values()) {
        console.log("FormData", value);
      }

      dispatch(__PostCatchData(formData))
      // reset()
    }
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
                <CustomSelect data={NameValue} onChangeData={onChangeData} onChangeID={onChangeID} />

              </div>

              <div>
                <p>품종</p>
                <ReportInput type="text" placeholder="입력하기"
                  {...register("animaltypes", {
                    required: true,
                    pattern: { value: /^[ㄱ-ㅎ|가-힣]+$/, message: "한글만 2 ~ 8글자 사이로 입력", },
                  })} />
                <img src={cancel} onClick={(() => { onClickDeleteValue('animaltypes') })} />
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

            <ReportAnimalInfoBox>
              <ReportAnimalInfoBoxColumn>
                <ReportAnimalInfoBoxColumnRow>
                  <p>추정나이</p>
                  <ReportInput type="text" placeholder='입력하기'
                    {...register("animalAge", {
                      required: true,
                      pattern: { value: /^[0-9]+$/, message: "숫자만입력가능", },
                      maxLength: { value: 3, message: "숫자만 입력! 3자리수 이하로 작성", }
                    })} />
                  <img src={cancel} onClick={(() => { onClickDeleteValue('animalAge') })} />
                  <span>{errors?.animalAge?.message}</span>
                </ReportAnimalInfoBoxColumnRow>

                <ReportAnimalInfoBoxColumnRow>
                  <p>추정체중(Kg)</p>
                  <ReportInput type="text" placeholder='입력하기'
                    {...register("animalkg", {
                      required: false,
                      pattern: { value: /^[0-9]+$/, message: "숫자만입력가능", },
                      maxLength: { value: 3, message: "숫자만 입력! 3자리수 이하로 작성", }
                    })} />
                  <img src={cancel} onClick={(() => { onClickDeleteValue('animalkg') })} />
                  <span>{errors?.animalkg?.message}</span>

                </ReportAnimalInfoBoxColumnRow>
              </ReportAnimalInfoBoxColumn>
              {/* 색상 */}
              <ReportAnimalInfoBoxColumn>
                <ReportAnimalInfoBoxColumnColumn>
                  <p>색상</p>
                  <ReportLgInput type="text" placeholder='입력하기'
                    {...register("animalcolor", {
                      required: true,
                      pattern: { value: /^[가-힣\s]+$/, message: "한글만 2 ~ 8글자 사이로 입력 ", },
                      maxLength: { value: 8, message: "8글자 이하이어야 합니다.", },
                    })} />
                  <img src={cancel} onClick={(() => { onClickDeleteValue('animalcolor') })} />
                  <span>{errors?.animalcolor?.message}</span>
                </ReportAnimalInfoBoxColumnColumn>
              </ReportAnimalInfoBoxColumn>
            </ReportAnimalInfoBox>
          </ReportAnimalInfoBox>
        </ReportAnimalInfoArea>

        {/* 카카오맵 */}
        <Location />
        {/* 카카오맵  */}

        <ReportAnimalDayBox>
          <p>목격일시 *</p>
          <div>
            <div>
              <p>날짜</p>
              <ReportInput type="text" placeholder='2022-07-14'
                {...register("days", {
                  required: true,
                  pattern: {
                    value: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                    message: "20xx-xx-xx 형식으로 입력",
                  },
                })} />
              <img src={cancel} onClick={(() => { onClickDeleteValue('days') })} />
              <span>{errors?.days?.message}</span>
            </div>
            {/* 시간대 */}
            <div>
              <p>시간대</p>
              <CustomSelect data={TimeValue} onChangeData={onChangeTimeData} onChangeID={onChangeTimeValeu} />
            </div>
          </div>
        </ReportAnimalDayBox>

        <ReportAnimalSignificantBox>
          <ReportAnimalSignificantBoxTitle>
            <p> 특이사항 </p>
          </ReportAnimalSignificantBoxTitle>
          <ReportAnimalSignificantBoxInputArea>
            <div>
              <p>특징</p>
              <ReportLgInput type="text" placeholder='입력하기'
                {...register("characteristic", {
                  required: false,
                  pattern: { value: /^[가-힣\s]+$/, message: "한글만 20글자 안으로 입력 띄워쓰기 X ", },
                  maxLength: { value: 20, message: "20글자 이하이어야 합니다.", },
                })} />
              <img src={cancel} onClick={(() => { onClickDeleteValue('characteristic') })} />
              <span>{errors?.characteristic?.message}</span>
            </div>
            <div>
              <p>메모</p>
              <ReportLgInput type="text" placeholder='입력하기'
                {...register("memo", {
                  required: false,
                  pattern: { value: /^[가-힣\s]+$/, message: "한글만 20글자 안으로 입력 띄워쓰기 X ", },
                  maxLength: { value: 20, message: "20글자 이하이어야 합니다.", },
                })} />
              <img src={cancel} onClick={(() => { onClickDeleteValue('memo') })} />
              <span>{errors?.memo?.message}</span>
            </div>
          </ReportAnimalSignificantBoxInputArea>
        </ReportAnimalSignificantBox>

        <ReportAnimalPictureArea>
          <ReportAnimalPictureAreaTitle><p>사진첨부</p></ReportAnimalPictureAreaTitle>

          <ReportAnimalPictureAreaInputBox>
            <input
              type="file" accept="image/*" style={{ display: 'none' }} multiple
              ref={(refer) => (imageRef = refer)} onChange={onChangeUploadHandler}
              required />
            <ReportAnimalPictureInput onClick={() => imageRef.click()}>
              <h3>+</h3>
            </ReportAnimalPictureInput>
            {
              showImages.length === 0 ? (
                <ReportAnimalPicturePreview>
                  <div><img src={imgdelete} /></div>프리뷰</ReportAnimalPicturePreview>
              ) : (
                <>
                  {showImages.map((image, index) => (
                    <ReportAnimalPicturePreview key={index}>
                      <PreviewImage src={image} alt={`${image}-${index}`} />
                      <div onClick={(() => { onClickDeleteHandler(index) })}>
                        <img src={imgdelete} /></div>
                    </ReportAnimalPicturePreview>
                  ))}
                </>
              )
            }
          </ReportAnimalPictureAreaInputBox>
        </ReportAnimalPictureArea>

        {
          isActive === true ? <Button type="submit" disable assistiveFillButton>작성 완료</Button>
            : (<Button type="submit" fillButton>작성 완료</Button>)
        }
      </ReportSightingContainer>
    </Layout >
  )
}

export default Catch