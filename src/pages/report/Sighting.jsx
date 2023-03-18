import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Layout from "../../layouts/Layout"
import Button from "../../elements/Button"
import cancel from "../../asset/delete.svg";
import imageCompression from 'browser-image-compression';
import imgdelete from "../../asset/imgDelete.svg";
import Marker from "../../asset/marker.png"
import { Select } from './components/Select';
import {
  ReportSightingContainer, ReportHeader, ReportAnimalInfoArea, ReportAnimalInfoBox, ReportAnimalInfoCheckBox
  , ReportAnimalInfoCheckBoxTitle, ReportAnimalInfoCheckBoxSelete, ReportAnimalInfoBoxColumn, ReportAnimalInfoBoxColumnRow,
  ReportAnimalInfoBoxColumnColumn, ReportanimaltypesBox, ReportanimaltypesTitle, ReportanimaltypesSelect, ReportInput, ReportLgInput,
  SelectBox, Label, SelectOptions, Option, ReportKakaoMapBox, ReportKakaoMapBoxTitle, ReportKakaoMapBoxMap, ReportAnimalDayBox,
  ReportAnimalSignificantBox, ReportAnimalSignificantBoxTitle, ReportAnimalSignificantBoxInputArea, ReportAnimalPictureArea,
  ReportAnimalPictureAreaTitle, ReportAnimalPictureAreaInputBox, ReportAnimalPictureInput, ReportAnimalPicturePreview, ReportAnimalUserInfo
} from './components/reportstyle';

const Sighting = () => {
  let imageRef;
  const { kakao } = window;

  // Selete로직 
  const NameValue = [
    { id: 0, name: "강아지" },
    { id: 1, name: "고양이" },
    { id: 2, name: "기타" },
  ]

  const TimeValue = [
    { id: 0, name: "12시" },
    { id: 1, name: "13시" },
    { id: 2, name: "14시" },
    { id: 3, name: "15시" },
    { id: 4, name: "16시" },
    { id: 5, name: "17시" },
    { id: 6, name: "18시" },
    { id: 7, name: "19시" },
    { id: 8, name: "20시" },
    { id: 9, name: "21시" },
    { id: 10, name: "22시" },
    { id: 11, name: "23시" },
    { id: 12, name: "24시" },
    { id: 13, name: "00시" },
    { id: 14, name: "01시" },
    { id: 15, name: "02시" },
    { id: 16, name: "03시" },
    { id: 17, name: "04시" },
    { id: 18, name: "05시" },
    { id: 19, name: "06시" },
    { id: 20, name: "07시" },
    { id: 21, name: "08시" },
    { id: 22, name: "09시" },
    { id: 23, name: "10시" },
    { id: 24, name: "11시" },
  ];
  // 종류데이터
  const [type, setType] = useState('')
  // console.log(type)
  const onChangeData = (newData) => {
    setType(newData);
  }
  const [time, setTime] = useState('')
  // console.log(time)
  const onChangeTimeData = (newData) => {
    setTime(newData);
  }


  const [currentSeleteValue, setCurrentSeleteValue] = useState(NameValue[0].name)
  const [isShowOptions, setShowOptions] = useState(false);
  const handleOnChangeSelectValue = (e) => {
    // const { innerText } = e.target;
    console.log(e.target.value)
    // setCurrentSeleteValue(e.target.getAttribute("value"));
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
    console.log(type)
    console.log(currentGenderValue)
    console.log(currentNeuteredValue)
    console.log(data.animalAge)
    console.log(data.animalkg)
    console.log(data.animalcolor)
    console.log(data.days)
    console.log(time)
    console.log(data.characteristic)
    console.log(data.memo)
    console.log("지도 좌표", resultlngDiv.innerHTML)
    console.log("지도 좌표", resultlatDiv.innerHTML)

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

  const onClickDeleteanimalColor = () => {
    resetField("animalcolor")
  }

  const onClickDeleteanimalDays = () => {
    resetField("days")
  }
  const onClickDeleteanimalcharacteristic = () => {
    resetField("characteristic")
  }

  const onClickDeleteanimalmemo = () => {
    resetField("memo")
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
  // 이미지로직
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
                <Select data={NameValue} onChangeData={onChangeData} />
                {/* <SelectBox onClick={() => setShowOptions((isShowOptions) => !isShowOptions)}>
                  <Label>{currentSeleteValue}</Label>
                  <SelectOptions show={isShowOptions}>
                    {
                      NameValue.map((item) => {
                        <Option
                          key={item.id}>{item.name}</Option>
                      })
                    } */}


                {/*   <Option onClick={handleOnChangeSelectValue}>강아지</Option>
                    <Option onClick={handleOnChangeSelectValue}>고양이</Option>
                    <Option onClick={handleOnChangeSelectValue}>기타</Option> */}
                {/* 
                  </SelectOptions>
                </SelectBox> */}
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
                  <img src={cancel} onClick={onClickDeleteanimalKg} />
                  <span>{errors?.animalkg?.message}</span>

                </ReportAnimalInfoBoxColumnRow>
              </ReportAnimalInfoBoxColumn>
              {/* 색상 */}
              <ReportAnimalInfoBoxColumn>
                <ReportAnimalInfoBoxColumnColumn>
                  <p>색상</p>
                  <ReportLgInput type="text" placeholder='입력하기'
                    {...register("animalcolor", {
                      required: false,
                      pattern: {
                        value: /^[가-힣\s]+$/,
                        message: "한글만 2 ~ 8글자 사이로 입력 ",
                      },
                      maxLength: {
                        value: 8,
                        message: "8글자 이하이어야 합니다.",
                      },
                    })} />
                  <img src={cancel} onClick={onClickDeleteanimalColor} />
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
              <img src={cancel} onClick={onClickDeleteanimalDays} />
              <span>{errors?.days?.message}</span>
            </div>
            {/* 시간대 */}
            <div>
              <p>시간대</p>
              <Select data={TimeValue} onChangeData={onChangeTimeData} />
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
              <img src={cancel} onClick={onClickDeleteanimalcharacteristic} />
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
              <img src={cancel} onClick={onClickDeleteanimalmemo} />
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