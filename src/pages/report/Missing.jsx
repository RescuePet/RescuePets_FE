import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Layout from "../../layouts/Layout"
import Button from "../../elements/Button"
import cancel from "../../asset/delete.svg";
import imageCompression from 'browser-image-compression';
import imgdelete from "../../asset/imgDelete.svg";
import Marker from "../../asset/marker.png"
import {
    ReportMissingContainer, ReportHeader, ReportAnimalInfoArea, ReportAnimalInfoBox, ReportAnimalInfoCheckBox
    , ReportAnimalInfoCheckBoxTitle, ReportAnimalInfoCheckBoxSelete, ReportAnimalInfoBoxColumn, ReportAnimalInfoBoxColumnRow,
    ReportAnimalInfoBoxColumnColumn, ReportanimaltypesBox, ReportanimaltypesTitle, ReportanimaltypesSelect, ReportInput, ReportLgInput,
    SelectBox, Label, SelectOptions, Option, ReportKakaoMapBox, ReportKakaoMapBoxTitle, ReportKakaoMapBoxMap, ReportAnimalDayBox,
    ReportAnimalSignificantBox, ReportAnimalSignificantBoxTitle, ReportAnimalSignificantBoxInputArea, ReportAnimalPictureArea,
    ReportAnimalPictureAreaTitle, ReportAnimalPictureAreaInputBox, ReportAnimalPictureInput, ReportAnimalPicturePreview, ReportAnimalUserInfo
} from './components/reportstyle';

const Missing = () => {
    let imageRef;
    const { kakao } = window;

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

    // selete 종류
    const [currentSeleteValue, setCurrentSeleteValue] = useState('강아지')
    const [isShowOptions, setShowOptions] = useState(false);
    const handleOnChangeSelectValue = (e) => {
        const { innerText } = e.target;
        setCurrentSeleteValue(innerText);
    };
    // selete 나이 
    const [currentSeleteAgeValue, setCurrentSeleteAgeValue] = useState('0살')
    const [isShowAgeOptions, setShowAgeOptions] = useState(false);
    // selete 시간대 
    const [currentSeleteTimeValue, setCurrentSeleteTimeValue] = useState('0시~08시')
    const [isShowTimeOptions, setShowTimeOptions] = useState(false);

    const {
        register, handleSubmit, formState: { errors }, reset, resetField, getValues } = useForm();

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

    const resultlngDiv = document.getElementById('clicklng');
    const resultlatDiv = document.getElementById('clicklat');
    // form submit버튼
    const onSubmitMissingHanlder = (data) => {

        console.log("종류 :", currentSeleteValue)
        console.log("품종 :", data.animaltypes + '종')
        console.log("성별 :", currentGenderValue)
        console.log("중성회 :", currentNeuteredValue)
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
    // 현재위치를 받아오는 로직
    navigator.geolocation.getCurrentPosition(onSucces, onFailure);
    // 성공
    function onSucces(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLong(lng);
        setLati(lat);
    }
    // 실패
    function onFailure() {
        alert("위치 정보를 찾을수 없습니다.");
    }
    const [long, setLong] = useState("");
    const [lati, setLati] = useState("");
    // 지도를 그려쥬는 로직
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
        // 지도를 클릭한 위치에 표출할 마커입니다
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

    return (
        <Layout>
            <ReportMissingContainer onSubmit={handleSubmit(onSubmitMissingHanlder,
                onClickDeleteanimaltypes, onClickDeleteanimalDays, onClickDeleteanimalKg,
                onClickDeleteanimalcharacteristic, onClickDeleteanimalmemo, onClickDeleteanimalColor
                , onClickDeleteanimalMoney, onClickDeleteanimalNumber)}>

                <ReportHeader>
                    <div></div>
                    <div>실종 글 작성하기</div>
                    <div>x</div>
                </ReportHeader>

                <ReportAnimalInfoArea>

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
                                {/* Input */}
                                <ReportInput type="text" placeholder="입력하기"
                                    {...register("animaltypes", {
                                        pattern: { value: /^[ㄱ-ㅎ|가-힣]+$/, message: "한글만 2 ~ 8글자 사이로 입력", },
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

                    {/* 나이 체중 색상   */}
                    <ReportAnimalInfoBox>

                        <ReportAnimalInfoBoxColumn>


                            <ReportAnimalInfoBoxColumnRow>
                                <p>나이</p>
                                {/* <ReportSelect props={Animationtype}/> */}
                                <SelectBox onClick={() => setShowAgeOptions((isShowAgeOptions) => !isShowAgeOptions)}>
                                    <Label>{currentSeleteAgeValue}</Label>
                                    <SelectOptions show={isShowAgeOptions}>

                                        <Option onClick={handleOnChangeSelectAgeValue}>0살 </Option>
                                        <Option onClick={handleOnChangeSelectAgeValue}>1살 </Option>
                                        <Option onClick={handleOnChangeSelectAgeValue}>2살 </Option>
                                        <Option onClick={handleOnChangeSelectAgeValue}>3살 </Option>
                                        <Option onClick={handleOnChangeSelectAgeValue}>4살 </Option>
                                        <Option onClick={handleOnChangeSelectAgeValue}>5살 </Option>
                                        <Option onClick={handleOnChangeSelectAgeValue}>6살 </Option>
                                        <Option onClick={handleOnChangeSelectAgeValue}>7살 </Option>
                                        <Option onClick={handleOnChangeSelectAgeValue}>8살 </Option>
                                        <Option onClick={handleOnChangeSelectAgeValue}>9살 </Option>
                                        <Option onClick={handleOnChangeSelectAgeValue}>10살 </Option>
                                        <Option onClick={handleOnChangeSelectAgeValue}>10살이상 </Option>

                                    </SelectOptions>
                                </SelectBox>
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
                                            value: 4,
                                            message: "4글자 이하이어야 합니다.",
                                        }
                                    })} />
                                <span>{errors?.animalkg?.message}</span>
                                <img src={cancel} onClick={onClickDeleteanimalKg} />

                            </ReportAnimalInfoBoxColumnRow>

                        </ReportAnimalInfoBoxColumn>

                        <ReportAnimalInfoBoxColumn>
                            <ReportAnimalInfoBoxColumnColumn>
                                <p>색상</p>
                                <ReportLgInput
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

                            </ReportAnimalInfoBoxColumnColumn>
                        </ReportAnimalInfoBoxColumn>

                    </ReportAnimalInfoBox>
                </ReportAnimalInfoArea>

                <ReportKakaoMapBox>
                    <ReportKakaoMapBoxTitle>
                        <p>실종위치 *</p>
                        <div>
                            <div><label id='clicklng'></label></div>
                            <div><label id='clicklat'></label></div>
                        </div>
                    </ReportKakaoMapBoxTitle>
                    {/* 맵에서 뿌려줄때 4~6초 걸린다 로딩일때 보여줄것을 만들어야한다  */}
                    <ReportKakaoMapBoxMap id='map'></ReportKakaoMapBoxMap>
                </ReportKakaoMapBox>

                <ReportAnimalDayBox>
                    <p>실종일시 *</p>
                    <div>
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
                        {/* 메모 */}
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

                <ReportAnimalUserInfo>
                    <div>
                        <p>사례금</p>
                        <ReportInput type="text" placeholder='입력하기'
                            {...register("money", {
                                required: false, // 필수 X 
                                maxLength: { value: 15, message: "15글자 이하이어야 합니다.", }
                            })}
                            inputMode="numeric"
                            onChange={(event) => {
                                const value = event.target.value;
                                event.target.value = Number(value.replace(/[^0-9]/g, '')).toLocaleString();
                            }} />
                        < img src={cancel} onClick={onClickDeleteanimalMoney} />
                        <span>{errors?.money?.message}</span>
                    </div>

                    <div>
                        <p>연락처</p>
                        <ReportInput type="tel" placeholder='010-xxxx-xxxx'
                            inputMode="numeric"
                            onChange={(event) => {
                                const value = event.target.value;
                                event.target.value = Number(value.replace(/[^0-9]/g, '')).toLocaleString();
                            }}
                            {...register("number", {
                                required: false, // 필수 X 
                                pattern: { value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/, message: "하이픈(-)을 넣어주세요 ", },
                                maxLength: { value: 16, message: "12글자 이하이어야 합니다.", },
                            })} />
                        <img src={cancel} onClick={onClickDeleteanimalNumber} />
                        <span>{errors?.number?.message}</span>
                    </div>

                </ReportAnimalUserInfo>
                <Button type="submit" TabBtn2>작성 완료</Button>
            </ReportMissingContainer >
        </Layout >
    )
}

export default Missing