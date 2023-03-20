import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Layout from "../../layouts/Layout"
import Button from "../../elements/Button"
import cancel from "../../asset/delete.svg";
import imageCompression from 'browser-image-compression';
import imgdelete from "../../asset/imgDelete.svg";
import Marker from "../../asset/marker.png"
import { CustomSelect } from "../../elements/CustomSelect"
import {
  ReportSightingContainer, ReportHeader, ReportAnimalInfoArea, ReportAnimalInfoBox, ReportAnimalInfoCheckBox
  , ReportAnimalInfoCheckBoxTitle, ReportAnimalInfoCheckBoxSelete, ReportAnimalInfoBoxColumn, ReportAnimalInfoBoxColumnRow,
  ReportAnimalInfoBoxColumnColumn, ReportanimaltypesTitle, ReportanimaltypesSelect, ReportInput, ReportLgInput,
  ReportKakaoMapBox, ReportKakaoMapBoxTitle, ReportKakaoMapBoxMap, ReportAnimalDayBox,
  ReportAnimalSignificantBox, ReportAnimalSignificantBoxTitle, ReportAnimalSignificantBoxInputArea, ReportAnimalPictureArea,
  ReportAnimalPictureAreaTitle, ReportAnimalPictureAreaInputBox, ReportAnimalPictureInput, ReportAnimalPicturePreview, ReportAnimalUserInfo
} from './components/reportstyle';
import { NameValue, TimeValue, SeletegenderArr, seleteneuteredArr } from './components/data';

const Sighting = () => {
  let imageRef;
  const { kakao } = window;

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

  // React-hook-form
  const {
    register, handleSubmit, formState: { errors },
    reset, resetField, } = useForm({ mode: 'onChange' });

  // form submit 로직
  const onSubmitSightingHanlder = (data) => {
    console.log(data)
    console.log("종류 :", typeID)
    console.log("품종 :", data.animaltypes + '종')
    console.log("성별", currentGenderEnValue)
    console.log("중성화", currentNeuteredEnValue)
    console.log(data.animalAge + '살')
    console.log(data.animalkg + 'Kg')
    console.log(data.animalcolor)
    console.log(data.days)
    console.log(time)
    console.log(data.characteristic)
    console.log(data.memo)
    console.log("지도 좌표", resultlngDiv.innerHTML)
    console.log("지도 좌표", resultlatDiv.innerHTML)
  }
  // 버튼을 누르면 선택된 usehookForm 제거 
  const onClickDeleteValue = (data) => {
    resetField(data)
  }
  // 카카오 맵 로직 
  const resultlngDiv = document.getElementById('clicklng');
  const resultlatDiv = document.getElementById('clicklat');
  const [long, setLong] = useState("");
  const [lati, setLati] = useState("");
  navigator.geolocation.getCurrentPosition(onSucces, onFailure);

  function onSucces(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    setLong(lng);
    setLati(lat);
  }
  function onFailure() {
    alert("위치 정보를 찾을수 없습니다.");
  }
  useEffect(() => {
    const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = {
        center: new kakao.maps.LatLng(lati, long), // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨
      };
    const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    const imageSrc = `${Marker}` // 마커이미지의 주소입니다    
    const imageSize = new kakao.maps.Size(32, 34) // 마커이미지의 크기입니다
    const imageOption = { offset: new kakao.maps.Point(10, 20) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
      markerPosition = new kakao.maps.LatLng(lati, long); // 마커가 표시될 위치입니다
    const marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다 
      position: map.getCenter(),
      image: markerImage // 마커이미지 설정 
    });
    // 지도에 마커를 표시합니다
    marker.setMap(map);
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다 
      const latlng = mouseEvent.latLng;
      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);
      const messageLng = `${latlng.getLng()}`;
      const messageLat = `${latlng.getLat()} `;
      const resultlngDiv = document.getElementById('clicklng');
      const resultlatDiv = document.getElementById('clicklat');
      resultlngDiv.innerHTML = messageLat;
      resultlatDiv.innerHTML = messageLng;
    });
  }, [onSucces])

  // 이미지 로직 
  const [formImagin, setFormformImagin] = useState(new FormData());

  const [imageFile, setImageFile] = useState({
    imageFile: "",
    viewUrl: "",
  });

  const [loaded, setLoaded] = useState(false);

  const onChangeUploadHandler = async (e) => {
    e.preventDefault();

    const imageFile = e.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      const formImg = new FormData();
      formImg.append('image', compressedFile);
      setFormformImagin(formImg);

      const fileReader = new FileReader()
      fileReader.readAsDataURL(compressedFile);

      fileReader.onload = () => {
        setImageFile({
          viewUrl: String(fileReader.result),
        });
        setLoaded(true);
      };
    } catch (error) {
      console.log(error);
    }
  }

  const onClickDeleteHandler = () => {
    setImageFile({
      viewUrl: ""
    });
  };

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
                  <img src={cancel} onClick={(() => { onClickDeleteValue('animalAge') })} />
                  <span>{errors?.animalAge?.message}</span>
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
                      // required: false,
                      pattern: {
                        value: /^[가-힣\s]+$/,
                        message: "한글만 2 ~ 8글자 사이로 입력 ",
                      },
                      maxLength: {
                        value: 8,
                        message: "8글자 이하이어야 합니다.",
                      },
                    })} />
                  <img src={cancel} onClick={(() => { onClickDeleteValue('animalcolor') })} />
                  <span>{errors?.animalcolor?.message}</span>
                </ReportAnimalInfoBoxColumnColumn>
              </ReportAnimalInfoBoxColumn>
            </ReportAnimalInfoBox>
          </ReportAnimalInfoBox>
        </ReportAnimalInfoArea>

        <ReportKakaoMapBox>

          <ReportKakaoMapBoxTitle>
            <p>목격위치 *</p>
            <div>
              <div><label id='clicklng'>위도</label></div>
              <div><label id='clicklat'>경도</label></div>
            </div>
          </ReportKakaoMapBoxTitle>
          <ReportKakaoMapBoxMap id='map'></ReportKakaoMapBoxMap>
        </ReportKakaoMapBox>

        <ReportAnimalDayBox>
          <p>목격일시 *</p>
          {/* 날짜 */}
          <div>
            {/* 날짜 */}
            <div>
              <p>날짜</p>
              <ReportInput type="text" placeholder='2022-07-14'
                {...register("days", {
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
              <CustomSelect data={TimeValue} onChangeData={onChangeTimeData} />
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
                  pattern: {
                    value: /^[가-힣\s]+$/,
                    message: "한글만 20글자 안으로 입력 띄워쓰기 X ",
                  },
                  maxLength: {
                    value: 20,
                    message: "20글자 이하이어야 합니다.",
                  },
                })} />
              <img src={cancel} onClick={(() => { onClickDeleteValue('characteristic') })} />
              <span>{errors?.characteristic?.message}</span>
            </div>
            <div>
              <p>메모</p>
              <ReportLgInput type="text" placeholder='입력하기'
                {...register("memo", {
                  required: false,
                  pattern: {
                    value: /^[가-힣\s]+$/,
                    message: "한글만 20글자 안으로 입력 띄워쓰기 X ",
                  },
                  maxLength: {
                    value: 20,
                    message: "20글자 이하이어야 합니다.",
                  },
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
              type="file" accept="image/*" style={{ display: 'none' }}
              ref={(refer) => (imageRef = refer)} onChange={onChangeUploadHandler}
              required />
            <ReportAnimalPictureInput onClick={() => imageRef.click()}>
              <h3>+</h3>
            </ReportAnimalPictureInput>
            {
              imageFile?.viewUrl !== "" ? (
                <ReportAnimalPicturePreview>
                  <img src={imageFile.viewUrl} />
                  <div onClick={onClickDeleteHandler}>
                    <img src={imgdelete} /></div></ReportAnimalPicturePreview>
              ) : (
                <ReportAnimalPicturePreview>
                  <div> <img src={imgdelete} /></div>프리뷰</ReportAnimalPicturePreview>
              )
            }
          </ReportAnimalPictureAreaInputBox>
        </ReportAnimalPictureArea>

        <Button type="submit" TabBtn2>작성 완료</Button>
      </ReportSightingContainer>
    </Layout >
  )
}

export default Sighting