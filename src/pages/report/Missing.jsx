import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import styled from 'styled-components'
import Layout from "../../layouts/Layout"
// import { ReportSelect } from './ReportSelect'
// import Input from '../../elements/Input';
import Button from "../../elements/Button"
import cancel from "../../asset/delete.svg";
import imageCompression from 'browser-image-compression';
import imgdelete from "../../asset/imgDelete.svg";
import Marker from "../../asset/marker.png"



const Missing = () => {
    let imageRef;
    const { kakao } = window;

    // selete 종류
    const [currentSeleteValue, setCurrentSeleteValue] = useState('강아지')
    const [isShowOptions, setShowOptions] = useState(false);
    // selete 나이 
    const [currentSeleteAgeValue, setCurrentSeleteAgeValue] = useState('0살~3살')
    const [isShowAgeOptions, setShowAgeOptions] = useState(false);
    // selete 시간대 
    const [currentSeleteTimeValue, setCurrentSeleteTimeValue] = useState('0시~08시')
    const [isShowTimeOptions, setShowTimeOptions] = useState(false);

    const {
        register, handleSubmit, formState: { errors }, reset, resetField, } = useForm();

    const handleOnChangeSelectValue = (e) => {
        const { innerText } = e.target;
        setCurrentSeleteValue(innerText);
    };

    const handleOnChangeSelectAgeValue = (e) => {
        const { innerText } = e.target;
        setCurrentSeleteAgeValue(innerText);
    };

    const handleOnChangeSelectTimeValue = (e) => {
        const { innerText } = e.target;
        setCurrentSeleteTimeValue(innerText);
    };


    // 버튼을 누르면 선택된 usehookForm 제거 
    const onClickDeleteanimaltypes = () => {
        resetField("animaltypes")
    }
    const onClickDeleteanimalKg = () => {
        resetField("animalkg")
    }
    const onClickDeleteanimalDays = () => {
        resetField("days")
    }
    const onClickDeleteanimalColor = () => {
        resetField("animalcolor")
    }
    const onClickDeleteanimalcharacteristic = () => {
        resetField("characteristic")
    }
    const onClickDeleteanimalmemo = () => {
        resetField("memo")
    }
    const onClickDeleteanimalMoney = () => {
        resetField("money")
    }
    const onClickDeleteanimalNumber = () => {
        resetField("number")
    }

    // 이미지 로직 
    const [formImagin, setFormformImagin] = useState(new FormData());
    // 이미지 state 
    const [imageFile, setImageFile] = useState({
        imageFile: "",
        viewUrl: "",
    });
    // console.log(imageFile)
    const [loaded, setLoaded] = useState(false);

    // 이미지를 등록을 하면 
    const onChangeUploadHandler = async (e) => {
        e.preventDefault();

        const imageFile = e.target.files[0];
        // console.log('Before Compression: ', imageFile.size);

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(imageFile, options);
            console.log(compressedFile)
            const formImg = new FormData();
            formImg.append('image', compressedFile);
            setFormformImagin(formImg);

            // for (let value of formImg.values()) {
            //   console.log(value);
            // }

            const fileReader = new FileReader()
            // console.log(compressedFile);
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
        // console.log("사진 삭제 버튼 클릭");
        setImageFile({
            viewUrl: ""
        });
    };

    const resultlngDiv = document.getElementById('clicklng');
    const resultlatDiv = document.getElementById('clicklat');
    const onSubmitMissingHanlder = (data) => {
        console.log(data)
        console.log("종류 :", currentSeleteValue)
        console.log("품종 :", data.animaltypes)
        console.log("나이 :", currentSeleteAgeValue)
        console.log("kg :", data.animalkg)
        console.log("색깔 :", data.animalcolor)
        console.log("날짜 :", data.days)
        console.log("특징 :", data.characteristic)
        console.log("메모 :", data.memo)
        console.log("사진 :", imageFile)
        console.log("시간대:", currentSeleteTimeValue)
        console.log("사례금 :", data.money)
        console.log("전화번호 :", data.number)
        console.log("지도 좌표", resultlngDiv.innerHTML)
        console.log("지도 좌표", resultlatDiv.innerHTML)
    }
    // 현재위치 위도 경도로 불러오기 
    navigator.geolocation.getCurrentPosition(onSucces, onFailure);

    // 성공일시 좌표저장
    function onSucces(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLong(lng);
        setLati(lat);
    }
    // 실패일시 알림
    function onFailure() {
        alert("위치 정보를 찾을수 없습니다.");
    }
    // 지도 죄표값들 
    const [long, setLong] = useState("");
    const [lati, setLati] = useState("");



    useEffect(() => {
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new kakao.maps.LatLng(lati, long), // 지도의 중심좌표
                level: 12 // 지도의 확대 레벨
            };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        const imageSrc = `${Marker}` // 마커이미지의 주소입니다    
        const imageSize = new kakao.maps.Size(32, 34) // 마커이미지의 크기입니다
        const imageOption = { offset: new kakao.maps.Point(10, 20) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
            markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다
        // 지도를 클릭한 위치에 표출할 마커입니다
        var marker = new kakao.maps.Marker({
            // 지도 중심좌표에 마커를 생성합니다 
            position: map.getCenter(),
            image: markerImage // 마커이미지 설정 
        });
        // 지도에 마커를 표시합니다
        marker.setMap(map);

        // 지도에 클릭 이벤트를 등록합니다
        // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {

            // 클릭한 위도, 경도 정보를 가져옵니다 
            var latlng = mouseEvent.latLng;

            // 마커 위치를 클릭한 위치로 옮깁니다
            marker.setPosition(latlng);

            const messageLng = `${latlng.getLng()}`;
            const messageLat = `${latlng.getLat()} `;

            var resultlngDiv = document.getElementById('clicklng');
            var resultlatDiv = document.getElementById('clicklat');
            resultlngDiv.innerHTML = messageLat;
            resultlatDiv.innerHTML = messageLng;
        });
    }, [onSucces])

    return (
        <Layout>
            <ReportContinaer onSubmit={handleSubmit(onSubmitMissingHanlder,
                onClickDeleteanimaltypes, onClickDeleteanimalDays, onClickDeleteanimalKg,
                onClickDeleteanimalcharacteristic, onClickDeleteanimalmemo, onClickDeleteanimalColor
                , onClickDeleteanimalMoney, onClickDeleteanimalNumber)}>

                <ReportHeader>
                    <div></div>
                    <div>실종 글 작성하기</div>

                    <div>x</div>
                </ReportHeader>

                <ReportAnimalInfoBox2>

                    <ReportanimaltypesBox>

                        <ReportanimaltypesTitle>동물 정보 *</ReportanimaltypesTitle>

                        <ReportanimaltypesSelect>

                            <div>
                                <p>종류</p>
                                {/* <ReportSelect props={Animationtype} /> */}
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
                                <ReportanimaltypesSelectInput type="text" placeholder="입력하기"
                                    {...register("animaltypes", {
                                        pattern: {
                                            value: /^[ㄱ-ㅎ|가-힣]+$/,
                                            message: "한글만 2 ~ 8글자 사이로 입력",
                                        },
                                    })} />
                                <img src={cancel} onClick={onClickDeleteanimaltypes} />
                                <span>{errors?.animaltypes?.message}</span>
                            </div>

                        </ReportanimaltypesSelect>
                    </ReportanimaltypesBox>


                    {/* 성별 중성화 여부 체크 */}
                    <ReportAnimalInfoBox>

                        <ReportAnimalInfoCheckBox>
                            <ReportAnimalInfoCheckBoxTitle> <p>성별</p></ReportAnimalInfoCheckBoxTitle>
                            <ReportAnimalInfoCheckBoxSelete> <div>수컷</div>
                                <div>암컷</div>
                                <div>모름</div></ReportAnimalInfoCheckBoxSelete>

                        </ReportAnimalInfoCheckBox>

                        <ReportAnimalInfoCheckBox>
                            <ReportAnimalInfoCheckBoxTitle> <p>중성화</p></ReportAnimalInfoCheckBoxTitle>
                            <ReportAnimalInfoCheckBoxSelete>
                                <div>완료</div>
                                <div>암컷</div>
                                <div>모름</div></ReportAnimalInfoCheckBoxSelete>

                        </ReportAnimalInfoCheckBox>

                    </ReportAnimalInfoBox>

                    {/* 나이 체중 색상   */}
                    <ReportAnimalInfoBox>

                        <ReportAnimalInfoBoxColumn>


                            <ReportAnimalInfoBoxColumnRow>
                                <p>나이</p>
                                {/* <ReportSelect props={Animationtype}/> */}
                                <SelectBox onClick={() => setShowAgeOptions((isShowAgeOptions) => !isShowAgeOptions)}>
                                    <Label>{currentSeleteAgeValue}</Label>
                                    <SelectOptions show={isShowAgeOptions}>

                                        <Option onClick={handleOnChangeSelectAgeValue}>0~3살 </Option>
                                        <Option onClick={handleOnChangeSelectAgeValue}>4~6살</Option>
                                        <Option onClick={handleOnChangeSelectAgeValue}>7~10살</Option>
                                        <Option onClick={handleOnChangeSelectAgeValue}>11살이상</Option>

                                    </SelectOptions>
                                </SelectBox>
                            </ReportAnimalInfoBoxColumnRow>

                            <ReportAnimalInfoBoxColumnRow>
                                <p>체중(Kg)</p>

                                <ReportanimaltypesSelectInput type="text" placeholder='입력하기'
                                    {...register("animalkg", {
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "숫자만입력가능",
                                        },
                                        maxLength: {
                                            value: 4,
                                            message: "4글자 이하이어야 합니다.",
                                        }
                                    })} />
                                <span>{errors?.animalkg?.message}</span>
                                <img src={cancel} onClick={onClickDeleteanimalKg} />

                            </ReportAnimalInfoBoxColumnRow>

                        </ReportAnimalInfoBoxColumn>

                        <ReportAnimalInfoBoxColumn>
                            <ReportAnimalInfoBoxColumnColunb>
                                <p>색상</p>
                                <ReportanimaltypesSelectInput style={{ width: "335px" }}
                                    type="text" placeholder='입력하기'
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

                            </ReportAnimalInfoBoxColumnColunb>
                        </ReportAnimalInfoBoxColumn>

                    </ReportAnimalInfoBox>
                </ReportAnimalInfoBox2>


                <ReportKakaoMapBox>

                    <ReportKakaoMapBoxTitle>
                        <p>실종위치 *</p>
                        <div>
                            <div>  <label id='clicklng'></label> </div>
                            <div> <label id='clicklat'></label> </div>
                        </div>
                    </ReportKakaoMapBoxTitle>

                    <ReportKakaoMapBoxMap id='map'> </ReportKakaoMapBoxMap>

                </ReportKakaoMapBox>

                <ReportAnimalDayBox>

                    <p>실종일시 *</p>

                    <div>
                        <div>
                            <p>날짜</p>
                            <ReportanimaltypesSelectInput type="text" placeholder='2022-07-14'
                                {...register("days", {
                                    pattern: {
                                        value: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                                        message: "20xx-xx-xx 형식으로 입력",
                                    },
                                })} />
                            <img src={cancel} onClick={onClickDeleteanimalDays} />
                            <span>{errors?.days?.message}</span>
                        </div>
                        <div>
                            <p>시간대</p>
                            <SelectBox onClick={() => setShowTimeOptions((isShowTimeOptions) => !isShowTimeOptions)}>
                                <Label>{currentSeleteTimeValue}</Label>
                                <SelectOptions show={isShowTimeOptions}>

                                    <Option onClick={handleOnChangeSelectTimeValue}>0시~08시 </Option>
                                    <Option onClick={handleOnChangeSelectTimeValue}>08시~16시 </Option>
                                    <Option onClick={handleOnChangeSelectTimeValue}>16시~0시</Option>

                                </SelectOptions>
                            </SelectBox>
                        </div>
                    </div>

                </ReportAnimalDayBox>

                {/* 특이사항  */}
                <ReportAnimalsignificantBox>
                    {/* 특이사항 Title */}
                    <ReportAnimalsignificantBoxTitle>
                        <p> 특이사항 </p>
                    </ReportAnimalsignificantBoxTitle>

                    {/* 특이사항 인풋! */}
                    <ReportAnimalsignificantBoxInput>
                        <div>
                            <p>특징</p>
                            <ReportanimaltypesSelectInput type="text" placeholder='입력하기' style={{ width: "335px" }}
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
                            <ReportanimaltypesSelectInput type="text" placeholder='입력하기' style={{ width: "335px" }}
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
                    </ReportAnimalsignificantBoxInput>

                </ReportAnimalsignificantBox>

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
                                    {/* <img src={imageFile.viewUrl} /> */}
                                    <div>  <img src={imgdelete} /></div>프리뷰</ReportAnimalPicturePreview>
                            )
                        }

                    </ReportAnimalPictureAreaInputBox>

                </ReportAnimalPictureArea>

                <ReportAnimalUserInfo>
                    <div>

                        <p>사례금</p>
                        <ReportanimaltypesSelectInput type="text" placeholder='입력하기'
                            {...register("money", {
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
                        <img src={cancel} onClick={onClickDeleteanimalMoney} />
                        <span>{errors?.money?.message}</span>
                    </div>

                    <div>
                        <p>연락처</p>
                        <ReportanimaltypesSelectInput type="text" placeholder='입력하기'
                            {...register("number", {
                                required: false,
                                pattern: {
                                    value: /^[가-힣\s]+$/,
                                    message: "한글만 20글자 안으로 입력 띄워쓰기 X ",
                                },
                                maxLength: {
                                    value: 12,
                                    message: "12글자 이하이어야 합니다.",
                                },
                            })} />
                        <img src={cancel} onClick={onClickDeleteanimalNumber} />
                        <span>{errors?.number?.message}</span>
                    </div>
                </ReportAnimalUserInfo>

                <Button type="submit" TabBtn2>작성 완료</Button>
            </ReportContinaer >

        </Layout >
    )
}

export default Missing

const ReportContinaer = styled.form`
  width: 100%;
  height: 75.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px 0;
  /* border: 1px solid #000; */
`;

const ReportHeader = styled.div`
  width: 100%;
  height: 5rem;
  padding-top: 2.5rem;
  border-bottom: 0.25rem solid #eeeeee;
  font-size: 1.125rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #222222;
  > div {
    height: 100%;
    width: 33.3%;
    ${props => props.theme.FlexCenter}
    /* border: 1px solid red; */
    font-size: 18px;
  }
`;
const ReportAnimalInfoBox2 = styled.div`
  width: 20.9375rem;
  height: 23rem;
  margin: 0 auto;
  /* border: 1px solid red; */
`;

const ReportAnimalInfoBox = styled.div`
  width: 100%;
  height: 130px;
  /* border: 1px solid #0f0f0f; */
  margin: 0 auto;
  /* ${props => props.theme.FlexColumn} */
`;

const ReportAnimalInfoCheckBox = styled.div`
    width: 100%;
    height: 50%;
    /* border: 1px solid red; */
    ${props => props.theme.FlexColumn}
`;
const ReportAnimalInfoCheckBoxTitle = styled.div`
    width: 100%;
    height: 20%;
    > p {
        color: #666666;
        font-size: 12px;
    }
`;
const ReportAnimalInfoCheckBoxSelete = styled.div`
    width: 100%;
    height: 80%;
    
    gap: 0 16px;
      ${props => props.theme.FlexCenter}
     > div {
        width: 6.3125rem;
        height: 2rem;
        border-radius: 1rem;
        border: 1px solid #666666;
        ${props => props.theme.FlexCenter}
    }
`


const ReportAnimalInfoBoxColumn = styled.div`
  width: 100%;
  height: 50%;
  /* border: 1px solid blue; */
  font-size: 12px;
  ${props => props.theme.FlexRow}
 
`;

// 나이/체중
const ReportAnimalInfoBoxColumnRow = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  /* border: 1px solid red; */
  > img {
    position: absolute;
    width: 1rem;
    height: 1rem;
    bottom: 25px;
    right: 5px;
  }
`;

// 색상 
const ReportAnimalInfoBoxColumnColunb = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  > img {
    position: absolute;
    bottom: 25px;
    width: 1rem;
    height: 1rem;
    right: 5px;
  }
  /* border: 1px solid red; */
`;




const ReportanimaltypesBox = styled.div`
  width: 100%;
  height: 7.5rem;
  margin: 0 auto;
  ${props => props.theme.FlexColumn}
`;

const ReportanimaltypesTitle = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  ${props => props.theme.Body_400_14}
`;

const ReportanimaltypesSelect = styled.div`
  width: 20.9375rem;
  height: 3.75rem;
  display: flex;
  align-items: center;
  /* border: 1px solid red; */
  > div {
    position: relative;
    width: 50%;
    height: 100%;
    /* border: 1px solid blue; */
    padding: 10px 0 20px 0;
    > p {
    color: #666666;
    font-size: 12px;
    }
    > img {
    position: absolute;
    width: 1rem;
    height: 1rem;
    right: 5px;
    top: 25px;
    }
  }
`;

const ReportanimaltypesSelectInput = styled.input`
  width: 9.75rem;
  height: 1.5625rem;
  margin-top: 5px;
  /* border: 1px solid red; */
  border-bottom: 2px solid #EEEEEE;
  background: transparent;
  font-size: 12px;
`;

const SelectBox = styled.div`
  position: relative;
  width: 9.75rem;
  height: 1.5625rem;
  border-bottom: 2px solid #EEEEEE;
  padding: 8px 0 20px 0;
  /* align-self: center; */
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  cursor: pointer;
  &::before {
    content: "⌵";
    position: absolute;
    top: 1px;
    right: 8px;
    color: #999999;
    font-size: 20px;
  }
`;
const Label = styled.label`
  font-size: 14px;
  margin-left: 4px;
  text-align: center;
`;

const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  top: 35px;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 90px;
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  border-radius: 8px;
  background-color: #eeeeee;
  color: #222222;
  z-index: 10;
`;

const Option = styled.li`
  font-size: 14px;
  padding: 6px 8px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #595959;
  }
`;

/* 문제없음 */
const ReportKakaoMapBox = styled.div`
 position: relative;
  width: 20.9375rem;
  height: 14.875rem;
  margin: 0 auto;
  /* border: 1px solid blue; */
  ${props => props.theme.FlexColumn}
  gap: 10px 0;
`;
const ReportKakaoMapBoxTitle = styled.div`
    width: 100%;
    height: 20%;
    /* border: 1px solid red; */
    > p {
        width: 100%;
        height: 20%;
        color: #222222;
        font-size: 20px;
    }
    > div {
        width: 100%;
        height: 80%;
        padding-top: 20px;
        font-size: 12px;
        ${props => props.theme.FlexRow}
        > div {
            width: 100%;
            height: 100%;
            > label {
                width: 9.75rem;
                border-bottom: 2px solid #EEEEEE;
            }
        }
    }
    
`;
const ReportKakaoMapBoxMap = styled.div`
    z-index: 15;
    width: 100%;
    height: 80%;
    ${props => props.theme.FlexCenter}
`


const ReportAnimalDayBox = styled.div`
  width: 20.9375rem;
  height: 5.5rem;
  margin: 0 auto;
  > p {
    width: 100%;
    height: 20px;
  }
  > div {
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    flex-direction: row;
    > div {
      position: relative;
      width: 50%;
      height: 100%;
       p {
        padding-top: 10px;
        color: #666666;
        font-size: 12px;
      }
      img {
        position: absolute;
        width: 1rem; 
        height: 1rem;
        bottom: 25px;
        right: 5px;
      }
     span {
        padding-top: 5px;
        font-size: 12px;
        color: #EA5455;
        ${props => props.theme.FlexCenter}
      }
  }
  }
`;

const ReportAnimalsignificantBox = styled.div`
  width: 20.9375rem;
  height: 9.75rem;
  margin: 0 auto;
`;

const ReportAnimalsignificantBoxTitle = styled.div`
  width: 100%;
  height: 15%;
  > p{
    ${props => props.theme.Body_400_14};
  }
`;


const ReportAnimalsignificantBoxInput = styled.div`
  width: 100%;
  height: 85%;
  /* border: 1px solid blue; */
  color: #222222;
  font-size: 20px;
  ${props => props.theme.FlexColumn}
  > div {
    position: relative;
    width: 100%;
    height: 50%;
    /* border: 1px solid red; */
    > p {
      color: #666666;
      font-size: 12px;
      padding-top: 10px;
    }
    > img {
        position: absolute;
        width: 1rem; 
        height: 1rem;
        bottom: 25px;
        right: 5px;
      }
    > span {
      padding-top: 5px;
      font-size: 12px;
      color: #EA5455;
      ${props => props.theme.FlexCenter}
    }
  }
`;

const ReportAnimalPictureArea = styled.div`
  position: relative;
  width: 8.25rem;
  height: 5.75rem;
  /* border: 1px solid red; */
  margin-right: 12.5rem;
`
const ReportAnimalPictureAreaTitle = styled.div`
  width: 100%;
  height: 20%;
  color: #222222;
  font-size: 20px;
  /* border: 1px solid red; */
`;

const ReportAnimalPictureAreaInputBox = styled.div`
  width: 100%;
  height: 80%;
  /* border: 1px solid gray; */
${props => props.theme.FlexCenter}
  gap: 0px 20px;
`;

const ReportAnimalPictureInput = styled.div`
 width: 56px;
 height: 56px;
 background: #666666;
 border-radius: 4px;
 /* border: 1px solid red; */
 ${props => props.theme.FlexCenter}
 > h3 {
  color: #FFFFFF;
  font-size: 2rem;
  font-weight: 200;
 }
`;
const ReportAnimalPicturePreview = styled.div`
 position: relative;
 width: 56px;
 height: 56px;
 background: #EEEEEE;
 border-radius: 4px;
 /* border: 1px solid red; */
 ${props => props.theme.FlexCenter}
 > div {
  position: absolute;
  ${props => props.theme.FlexCenter}
  width: 16px;
  height: 16px;
  background: #FFFFFF;
  top: -5px;
  right: -5px;
  border-radius: 50%;
  font-size: 6px;
  color: #CCCCCC;
 }
 > img {
  width: 100%;
  height: 100%;
 }
`;

const ReportAnimalUserInfo = styled.div`
  width: 20.9375rem;
  height: 5.5rem;
  margin-top: 10px;
  /* border: 1px solid red; */
  ${props => props.theme.FlexRow}
  > div {
    position: relative;
    width: 50%;
    height: 100%;
    /* border: 1px solid blue; */
    > p {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
    > img {
        position: absolute;
        width: 1rem; 
        height: 1rem;
        bottom: 45px;
        right: 15px;
      }
    > span {
      padding-top: 5px;
      font-size: 12px;
      color: #EA5455;
      ${props => props.theme.FlexCenter}
    }
  }
`;