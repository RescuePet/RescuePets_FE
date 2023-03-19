import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Layout from "../../layouts/Layout"
import Button from "../../elements/Button"
import cancel from "../../asset/delete.svg";
import imageCompression from 'browser-image-compression';
import imgdelete from "../../asset/imgDelete.svg";
import Marker from "../../asset/marker.png"
import { CustomSelect } from './components/CustomSelect';
import {
    ReportMissingContainer, ReportHeader, ReportAnimalInfoArea, ReportAnimalInfoBox, ReportAnimalInfoCheckBox
    , ReportAnimalInfoCheckBoxTitle, ReportAnimalInfoCheckBoxSelete, ReportAnimalInfoBoxColumn, ReportAnimalInfoBoxColumnRow,
    ReportAnimalInfoBoxColumnColumn, ReportanimaltypesBox, ReportanimaltypesTitle, ReportanimaltypesSelect, ReportInput, ReportLgInput,
    ReportKakaoMapBox, ReportKakaoMapBoxTitle, ReportKakaoMapBoxMap, ReportAnimalDayBox,
    ReportAnimalSignificantBox, ReportAnimalSignificantBoxTitle, ReportAnimalSignificantBoxInputArea, ReportAnimalPictureArea,
    ReportAnimalPictureAreaTitle, ReportAnimalPictureAreaInputBox, ReportAnimalPictureInput, ReportAnimalPicturePreview, ReportAnimalUserInfo
} from './components/reportstyle';
import { NameValue, TimeValue } from './components/data';

const Missing = () => {
    let imageRef;
    const { kakao } = window;
    // Selete로직 

    // 종류데이터
    const [type, setType] = useState(NameValue[0].name)
    // console.log(type)
    const onChangeData = (newData) => {
        setType(newData);
    }
    const [time, setTime] = useState(TimeValue[0].name)
    // console.log(time)
    const onChangeTimeData = (newData) => {
        setTime(newData);
    }

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



    const {
        register, handleSubmit, formState: { errors }, reset,
        resetField, } = useForm({ mode: 'onChange' });

    const onClickDeleteValue = (data) => {
        resetField(data)
    }

    const resultlngDiv = document.getElementById('clicklng');
    const resultlatDiv = document.getElementById('clicklat');
    // form submit버튼

    const onSubmitMissingHanlder = (data) => {

        console.log("종류 :", type)
        console.log("품종 :", data.animaltypes + '종')
        console.log("성별 :", currentGenderValue)
        console.log("중성회 :", currentNeuteredValue)
        // console.log("나이 :", currentSeleteAgeValue)
        console.log("kg :", data.animalkg)
        console.log("색깔 :", data.animalcolor)
        console.log("날짜 :", data.days)
        console.log("특징 :", data.characteristic)
        console.log("메모 :", data.memo)
        console.log("사진 :", imageFile)
        console.log("시간대:", time)
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
            <ReportMissingContainer onSubmit={handleSubmit(onSubmitMissingHanlder)}>

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
                                <CustomSelect data={NameValue} onChangeData={onChangeData} />
                            </div>

                            <div>
                                <p>품종</p>
                                {/* Input */}
                                <ReportInput type="text" placeholder="입력하기"
                                    {...register("animaltypes", {
                                        pattern: { value: /^[ㄱ-ㅎ|가-힣]+$/, message: "한글만 2 ~ 8글자 사이로 입력", },
                                    })} />
                                <img src={cancel} onClick={(() => { onClickDeleteValue('animaltypes') })} />
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
                                            value: 4,
                                            message: "4글자 이하이어야 합니다.",
                                        }
                                    })} />
                                <img src={cancel} onClick={(() => { onClickDeleteValue('animalkg') })} />
                                <span>{errors?.animalkg?.message}</span>


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
                                <img src={cancel} onClick={(() => { onClickDeleteValue('animalcolor') })} />
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
                            <img src={cancel} onClick={(() => { onClickDeleteValue('days') })} />
                            <span>{errors?.days?.message}</span>
                        </div>
                        <div>
                            <p>시간대</p>
                            <CustomSelect data={TimeValue} onChangeData={onChangeTimeData} />
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
                            <img src={cancel} onClick={(() => { onClickDeleteValue('characteristic') })} />
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
                        < img src={cancel} onClick={(() => { onClickDeleteValue('money') })} />
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
                        <img src={cancel} onClick={(() => { onClickDeleteValue('number') })} />
                        <span>{errors?.number?.message}</span>
                    </div>

                </ReportAnimalUserInfo>
                <Button type="submit" TabBtn2>작성 완료</Button>
            </ReportMissingContainer >
        </Layout >
    )
}

export default Missing