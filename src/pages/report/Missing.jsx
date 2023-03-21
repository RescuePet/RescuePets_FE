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
    ReportMissingContainer, ReportHeader, ReportAnimalInfoArea, ReportAnimalInfoBox, ReportAnimalInfoCheckBox
    , ReportAnimalInfoCheckBoxTitle, ReportAnimalInfoCheckBoxSelete, ReportAnimalInfoBoxColumn, ReportAnimalInfoBoxColumnRow,
    ReportAnimalInfoBoxColumnColumn, ReportanimaltypesBox, ReportanimaltypesTitle, ReportanimaltypesSelect, ReportInput, ReportLgInput,
    ReportKakaoMapBox, ReportKakaoMapBoxTitle, ReportKakaoMapBoxMap, ReportAnimalDayBox, ReportAnimalSignificantBox, ReportAnimalSignificantBoxTitle,
    ReportAnimalSignificantBoxInputArea, ReportAnimalPictureArea, ReportAnimalPictureAreaTitle, ReportAnimalPictureAreaInputBox, ReportAnimalPictureInput,
    ReportAnimalPicturePreview, ReportAnimalUserInfo, PreviewImage,
} from './components/reportstyle';
import { NameValue, TimeValue, SeletegenderArr, seleteneuteredArr } from './components/data';
import { __PostMissingData } from '../../redux/modules/missingSlice';
import { useDispatch } from 'react-redux';

const Missing = () => {
    let imageRef;
    const dispatch = useDispatch();
    const { kakao } = window;
    // Selete로직 

    // 종류데이터
    const [type, setType] = useState(NameValue[0].name)
    const [typeID, setTypeID] = useState('DOG')

    // console.log("EN :", typeID)

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

    const [currentGenderTab, setCurrentGenderTab] = useState(0);
    const [currentNeuteredTab, setCurrentNeuteredTab] = useState(0);

    const [currentGenderValue, setCurrentGenderValue] = useState('수컷');
    const [currentGenderEnValue, setCurrentGenderEnValue] = useState('DOG')
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

    // 이미지로직

    // 올린 이미지 담을 관리하는 State
    const [showImages, setShowImages] = useState([]);

    // 폼데이터로 이미지 관리하는 State
    const [imageFormData, setImageFormData] = useState([]);
    // 폼데이터로 보관중인 스테이트
    const [formImagin, setFormformImagin] = useState(new FormData());

    // 이미지 등록 로직 
    const onChangeUploadHandler = async (e) => {
        e.preventDefault();

        const imageLists = e.target.files;
        // 이미지 용량 줄여주는 로직 

        console.log("폼데이터 보내야 할것들:", imageLists)
        setImageFormData(imageLists)

        let imageUrlLists = [...showImages];
        for (let i = 0; i < imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            imageUrlLists.push(currentImageUrl);
        }
        if (imageUrlLists.length > 3) {
            setImageFormData(imageFormData.slice(0, 3));
            imageUrlLists = imageUrlLists.slice(0, 3);
        }
        setShowImages(imageUrlLists);
        // console.log(imageUrlLists)

        const formImg = new FormData();


        for (let i = 0; i < imageLists.length; i++) {
            formImg.append("postImages", imageLists[i]);
        }
        // Array.from(imageLists).forEach((image) =>
        //     formImg.append("postImages", image));
        // for (let j = 0; j < imageLists.length; j++) {
        //     formImg.append("postImages", imageLists[j])
        // }
        setFormformImagin(formImg);

        for (let value of formImagin.values()) {
            console.log("이미지폼데이터", value);
        }
    };

    // for (let value of formData.values()) {
    //     console.log(value);
    // }
    // 이미지 삭제로직 
    const onClickDeleteHandler = (id) => {
        setShowImages('');
        setImageFormData('')
    };

    // console.log('폼데이터 최신 :', imageFormData.length)

    const {
        register, handleSubmit, formState: { errors }, reset,
        resetField, } = useForm({ mode: 'onChange' });

    const onClickDeleteValue = (data) => {
        resetField(data)
    }
    // POST 
    const onSubmitMissingHanlder = (data) => {

        const formData = new FormData();

        // imageFormData.forEach(image => {
        //     formData.append('postImages', image);
        // });

        formData.append("upkind", typeID)
        formData.append("sexCd", currentGenderEnValue)
        formData.append("neuterYn", currentNeuteredEnValue)
        formData.append("kindCd", data.animaltypes)
        formData.append("age", data.animalAge)
        formData.append("weight", data.animalkg)
        formData.append("colorCd", data.animalcolor)
        formData.append("happenPlace", addressDiv.innerHTML)
        formData.append("happenDt", data.days)
        formData.append("happenHour", time)
        formData.append("specialMark", data.characteristic)
        formData.append("content", data.memo)
        formData.append("gratuity", data.money)
        formData.append("contact", data.number)

        // 이미지 폼데이터 믹스
        for (const keyValue of formImagin) {
            formData.append(keyValue[0], keyValue[1]);
        }
        // for (let key of formData.keys()) {
        //     console.log(key);
        // }

        // 전체 폼데이터 콘솔 
        for (let value of formData.values()) {
            console.log("FormData", typeof (value));
        }

        // 사진이 해당하는것을 배열로 저장해야만 한다 
        dispatch(__PostMissingData(formData))

    }

    const addressDiv = document.getElementById('address');
    // 현재위치를 받아오는 로직
    const [long, setLong] = useState("");
    const [lati, setLati] = useState("");
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

        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
        // 지도를 클릭한 위치에 표출할 마커입니다
        const marker = new kakao.maps.Marker({
            // 지도 중심좌표에 마커를 생성합니다 
            position: map.getCenter(),
            image: markerImage // 마커이미지 설정 
        });
        // 지도에 마커를 표시합니다
        marker.setMap(map);

        let geocoder = new kakao.maps.services.Geocoder();
        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    marker.setPosition(mouseEvent.latLng);
                    marker.setMap(map);
                    const currentAddress = result[0]?.address?.address_name
                    const addressDiv = document.getElementById('address');
                    addressDiv.innerHTML = currentAddress;
                }
            });
        });

        const searchDetailAddrFromCoords = (coords, callback) => {
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

    }, [onSucces])

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
                                <CustomSelect data={NameValue} onChangeData={onChangeData} onChangeID={onChangeID} />
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
                                            value={el.value}
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
                                        pattern: { value: /^[0-9]+$/, message: "숫자만입력가능", },
                                        maxLength: { value: 3, message: "숫자만 입력! 3자리수 이하로 작성", }
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
                            <div><label id='address'></label></div>
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
                            type="file" accept="image/*" style={{ display: 'none' }} multiple
                            ref={(refer) => (imageRef = refer)} onChange={onChangeUploadHandler}
                        />
                        <ReportAnimalPictureInput onClick={() => imageRef.click()}>
                            <h3>+</h3>
                        </ReportAnimalPictureInput>
                        {
                            showImages.length === 0 ? (

                                <ReportAnimalPicturePreview>
                                    <div> <img src={imgdelete} /></div>프리뷰</ReportAnimalPicturePreview>
                            ) : (
                                <>
                                    {
                                        showImages.map((image, index) => (
                                            <ReportAnimalPicturePreview key={index}>
                                                <PreviewImage src={image} alt={`${image}-${index}`} />
                                                <div onClick={(() => { onClickDeleteHandler(index) })}>
                                                    <img src={imgdelete} /></div>
                                            </ReportAnimalPicturePreview>
                                        ))
                                    }

                                </>

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