import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import imageCompression from "browser-image-compression";
import Layout from "../../layouts/Layout";
import Button from "../../elements/Button";
import cancel from "../../asset/delete.svg";
import Location from "./components/Location";
import imgdelete from "../../asset/imgDelete.svg";
import close from "../../asset/Close.svg";
import { CustomSelect } from "../../elements/CustomSelect";
import {
  ReportMissingContainer, ReportHeader, ReportAnimalInfoArea, ReportAnimalInfoBox,
  ReportAnimalInfoCheckBox,ReportAnimalInfoCheckBoxTitle,ReportAnimalInfoCheckBoxSelete,
  ReportAnimalInfoBoxColumn,ReportAnimalInfoBoxColumnRow,ReportanimaltypesBox,ReportanimaltypesTitle,
  ReportanimaltypesSelect,ReportInput,ReportLgInput,ReportAnimalDayBox,ReportAnimalSignificantBox,
  ReportAnimalSignificantBoxTitle,ReportAnimalSignificantBoxInputArea,ReportAnimalPictureArea,
  ReportAnimalPictureAreaTitle, ReportAnimalPictureAreaInputBox, ReportAnimalPictureInput,
  ReportAnimalPicturePreview, ReportAnimalUserInfo, PreviewImage,
} from "./components/reportstyle";
import {
  NameValue, TimeValue,SeletegenderArr, seleteneuteredArr,
} from "./components/data";
import { __PostMissingData } from "../../redux/modules/missingSlice";
import { toggleMenu } from "../../redux/modules/menubarSlice";
import { PostModal } from "./components/Modal";
import { useModalState } from "../../hooks/useModalState";

const Missing = () => {
  let imageRef;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginModal, toggleModal] = useModalState(false);
  const [postNumber, setPostNumber] = useState("");
  const MissingNumber = useSelector((state) => {
    return state.MissingData
  });

  const data = {
    number: MissingNumber?.data,
    name: "missingdetail",
  };

  useEffect(() => {
    console.log(MissingNumber) 
    setPostNumber(data);
  }, [MissingNumber]);

  // 리덕스에 저장되어있는 메뉴바 토글상태를 가지고 오고
  const menutoggle = useSelector((state) => {
    return state.menubar.toggle;
  });
  
  const [mapBg, setMapBg] = useState(menutoggle);
  useEffect(() => {
    setMapBg(true);
  }, [menutoggle]);

  const MoveToBackPage = () => {
    dispatch(toggleMenu(mapBg));
    navigate(-1);
  };
  // 종류데이터
  const [type, setType] = useState(NameValue[0].name);
  const [typeID, setTypeID] = useState("DOG");
  const onChangeData = (newData) => {
    setType(newData);
  };
  const onChangeID = (newValue) => {
    setTypeID(newValue);
  };
  const [time, setTime] = useState(TimeValue[0].name);
  const onChangeTimeData = (newData) => {
    setTime(newData);
  };
  const onChangeTimeValeu = () => {};
  const [currentGenderTab, setCurrentGenderTab] = useState(0);
  const [currentNeuteredTab, setCurrentNeuteredTab] = useState(0);
  const [currentGenderValue, setCurrentGenderValue] = useState("수컷");
  const [currentGenderEnValue, setCurrentGenderEnValue] = useState("DOG");
  const [currentNeuteredValue, setCurrentNeuteredValue] = useState("완료");
  const [currentNeuteredEnValue, setCurrentNeuteredEnValue] = useState("YES");
  const selectMGenderHandler = (index) => {
    setCurrentGenderTab(index);
    setCurrentGenderValue(SeletegenderArr[index].gender);
    setCurrentGenderEnValue(SeletegenderArr[index].value);
  };
  const selectNeuteredHandler = (index) => {
    setCurrentNeuteredTab(index);
    setCurrentNeuteredValue(seleteneuteredArr[index].neutered);
    setCurrentNeuteredEnValue(seleteneuteredArr[index].value);
  };
  // 사진 로직
  // 올린 이미지 담을 관리하는 State
  const [showImages, setShowImages] = useState([]);
  // 폼데이터로 이미지 관리하는 State
  const [imageFormData, setImageFormData] = useState([]);
  const onChangeUploadHandler = async (e) => {
    e.preventDefault();
    // 인풋에서 선택된 이미지들
    const imageLists = e.target.files;
    console.log(imageLists);
    // 미리보기 담을것
    let imageUrlLists = [...showImages];
    // 폼데이터 담을것
    let imageFormLists = [...imageFormData];
    // 미리보기 로직
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
      imageFormLists.push(imageLists[i]);
    }
    if (imageUrlLists.length > 3) {
      imageUrlLists = imageUrlLists.slice(0, 3);
      imageFormLists = imageFormLists.slice(0, 3);
    }
    setShowImages(imageUrlLists);
    setImageFormData(imageFormLists);
  };

  const onClickDeleteHandler = () => {
    setShowImages("");
    setImageFormData("");
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    watch,
  } = useForm({ mode: "onChange" });
  // 주소
  const addressDiv = document.getElementById("address");
  // 좌표값들
  const addressLatDiv = document.getElementById("addressLat");
  const addressLngDiv = document.getElementById("addressLng");
  // 입력값에 따라 버튼 활성화
  const [isActive, setIsActive] = useState(false);
  const onClickDeleteValue = (data) => {
    resetField(data);
  };
  const [selectedDate, setSelectedDate] = useState("");
  // console.log(selectedDate)
  // 현재 날짜를 가져옵니다.
  const currentDate = new Date().toISOString().split("T")[0];
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  useEffect(() => {
    if (
      watch("animaltypes") !== "" &&
      watch("animalName") !== "" &&
      watch("animaltypes") !== "" &&
      watch("animalAge") !== "" &&
      watch("animalkg") !== "" &&
      watch("address") !== "" &&
      watch("animalcolor") !== "" &&
      addressDiv?.innerHTML !== "" &&
      selectedDate !== ""
    ) {
      // console.log('성공')
      setIsActive(false);
    } else {
      // console.log('실패')
      setIsActive(true);
    }
  }, [watch()]);

  // POST
  const onSubmitMissingHanlder = (data) => {
    if (addressDiv?.innerHTML === "") {
      alert("지도에 위치를 표기해주세요");
    } else {
      const formData = new FormData();
      formData.append("upkind", typeID);
      formData.append("sexCd", currentGenderEnValue);
      formData.append("neuterYn", currentNeuteredEnValue);
      formData.append("petName", data.animalName);
      formData.append("kindCd", data.animaltypes);
      formData.append("age", data.animalAge);
      formData.append("weight", data.animalkg);
      formData.append("colorCd", data.animalcolor);
      formData.append("happenPlace", addressDiv.innerHTML);
      formData.append("happenLatitude", addressLatDiv.innerHTML);
      formData.append("happenLongitude", addressLngDiv.innerHTML);
      formData.append("happenDt", selectedDate);
      formData.append("happenHour", time);
      formData.append("specialMark", data.characteristic);
      formData.append("content", data.memo);
      formData.append("gratuity", data.money);
      formData.append("contact", data.number);
      imageFormData.map((img) => {
        formData.append("postImages", img);
      });
      dispatch(__PostMissingData(formData));
      toggleModal();
      reset();
    }
  };
  return (
    <Layout>
      <ReportMissingContainer onSubmit={handleSubmit(onSubmitMissingHanlder)}>
        <ReportHeader>
          <div></div>
          <div>실종 글 작성하기</div>
          <div>
            <img src={close} onClick={MoveToBackPage} />
          </div>
        </ReportHeader>
        <ReportAnimalInfoArea>
          <ReportanimaltypesBox>
            <ReportanimaltypesTitle>동물 정보 *</ReportanimaltypesTitle>
            <ReportanimaltypesSelect>
              <div>
                <p>종류</p>
                <CustomSelect
                  data={NameValue}
                  onChangeData={onChangeData}
                  onChangeID={onChangeID}
                />
              </div>
              <div>
                <p>품종</p>
                {/* Input */}
                <ReportInput
                  type="text"
                  placeholder="입력하기"
                  {...register("animaltypes", {
                    required: true,
                    pattern: {
                      value: /^[ㄱ-ㅎ|가-힣]+$/,
                      message: "한글만 2 ~ 8글자 사이로 입력",
                    },
                  })}
                />
                <img
                  src={cancel}
                  onClick={() => {
                    onClickDeleteValue("animaltypes");
                  }}
                />
                <span>{errors?.animaltypes?.message}</span>
              </div>
            </ReportanimaltypesSelect>
          </ReportanimaltypesBox>
          <ReportAnimalInfoBox>
            <ReportAnimalInfoCheckBox>
              <ReportAnimalInfoCheckBoxTitle>
                <p>성별</p>
              </ReportAnimalInfoCheckBoxTitle>
              <ReportAnimalInfoCheckBoxSelete>
                {SeletegenderArr.map((el, index) => (
                  <li
                    key={index}
                    value={el.value}
                    className={
                      index === currentGenderTab ? "submenu focused" : "submenu"
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
                {" "}
                <p>중성화</p>{" "}
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
          <ReportAnimalInfoBox>
            <ReportAnimalInfoBoxColumn>
              <ReportAnimalInfoBoxColumnRow>
                <p>이름</p>
                <ReportInput
                  type="text"
                  placeholder="입력하기"
                  {...register("animalName", {
                    required: true,
                    pattern: {
                      value: /^[가-힣\s]+$/,
                      message: "한글만 2 ~ 8글자 사이로 입력 ",
                    },
                    maxLength: {
                      value: 8,
                      message: "8글자 이하이어야 합니다.",
                    },
                  })}
                />
                <img
                  src={cancel}
                  onClick={() => {
                    onClickDeleteValue("animalName");
                  }}
                />
                <span>{errors?.animalName?.message}</span>
              </ReportAnimalInfoBoxColumnRow>
              <ReportAnimalInfoBoxColumnRow>
                <p>나이(살)</p>
                <ReportInput
                  type="text"
                  placeholder="입력하기"
                  {...register("animalAge", {
                    required: true,
                    pattern: { value: /^[0-9]+$/, message: "숫자만입력가능" },
                    maxLength: {
                      value: 3,
                      message: "숫자만 입력! 3자리수 이하로 작성",
                    },
                  })}
                />
                <img
                  src={cancel}
                  onClick={() => {
                    onClickDeleteValue("animalAge");
                  }}
                />
                <span>{errors?.animalAge?.message}</span>
              </ReportAnimalInfoBoxColumnRow>
            </ReportAnimalInfoBoxColumn>
            <ReportAnimalInfoBoxColumn>
              <ReportAnimalInfoBoxColumnRow>
                <p>체중(Kg)</p>
                <ReportInput
                  type="text"
                  placeholder="입력하기"
                  {...register("animalkg", {
                    required: true,
                    pattern: { value: /^[0-9]+$/, message: "숫자만입력가능" },
                    maxLength: {
                      value: 4,
                      message: "4글자 이하이어야 합니다.",
                    },
                  })}
                />
                <img
                  src={cancel}
                  onClick={() => {
                    onClickDeleteValue("animalkg");
                  }}
                />
                <span>{errors?.animalkg?.message}</span>
              </ReportAnimalInfoBoxColumnRow>
              <ReportAnimalInfoBoxColumnRow>
                <p>색상</p>
                <ReportInput
                  type="text"
                  placeholder="입력하기"
                  {...register("animalcolor", {
                    required: true,
                    pattern: {
                      value: /^[가-힣\s]+$/,
                      message: "한글만 2 ~ 8글자 사이로 입력 ",
                    },
                    maxLength: {
                      value: 8,
                      message: "8글자 이하이어야 합니다.",
                    },
                  })}
                />
                <img
                  src={cancel}
                  onClick={() => {
                    onClickDeleteValue("animalcolor");
                  }}
                />
                <span>{errors?.animalcolor?.message}</span>
              </ReportAnimalInfoBoxColumnRow>
            </ReportAnimalInfoBoxColumn>
          </ReportAnimalInfoBox>
        </ReportAnimalInfoArea>
        {/* 실종 로직  */}
        <Location />
        {/* 실종 로직 */}
        <ReportAnimalDayBox>
          <p>실종일시 *</p>
          <div>
            <div>
              <p>날짜</p>
              <ReportInput
                type="date"
                onChange={handleDateChange}
                value={selectedDate}
                max={currentDate}
              />
              {/* <img src={cancel} onClick={(() => { onClickDeleteValue('days') })} /> */}
              {/* <span>{errors?.days?.message}</span> */}
            </div>
            <div>
              <p>시간대</p>
              <CustomSelect
                data={TimeValue}
                onChangeData={onChangeTimeData}
                onChangeID={onChangeTimeValeu}
              />
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
              <ReportLgInput
                type="text"
                placeholder="입력하기"
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
                })}
              />
              <img
                src={cancel}
                onClick={() => {
                  onClickDeleteValue("characteristic");
                }}
              />
              <span>{errors?.characteristic?.message}</span>
            </div>
            {/* 메모 */}
            <div>
              <p>메모</p>
              <ReportLgInput
                type="text"
                placeholder="입력하기"
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
                })}
              />
              <img
                src={cancel}
                onClick={() => {
                  onClickDeleteValue("memo");
                }}
              />
              <span>{errors?.memo?.message}</span>
            </div>
          </ReportAnimalSignificantBoxInputArea>
        </ReportAnimalSignificantBox>
        <ReportAnimalPictureArea>
          <ReportAnimalPictureAreaTitle>
            <p>사진첨부</p>
          </ReportAnimalPictureAreaTitle>
          <ReportAnimalPictureAreaInputBox>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              multiple
              ref={(refer) => (imageRef = refer)}
              onChange={onChangeUploadHandler}
            />
            <ReportAnimalPictureInput onClick={() => imageRef.click()}>
              <h3>+</h3>
            </ReportAnimalPictureInput>
            {showImages.length === 0 ? (
              <ReportAnimalPicturePreview>
                <div>
                  {" "}
                  <img src={imgdelete} />
                </div>
              </ReportAnimalPicturePreview>
            ) : (
              <>
                {showImages.map((image, index) => (
                  <ReportAnimalPicturePreview key={index}>
                    <PreviewImage src={image} alt={`${image}-${index}`} />
                    <div
                      onClick={() => {
                        onClickDeleteHandler(index);
                      }}
                    >
                      <img src={imgdelete} />
                    </div>
                  </ReportAnimalPicturePreview>
                ))}
              </>
            )}
          </ReportAnimalPictureAreaInputBox>
        </ReportAnimalPictureArea>
        <ReportAnimalUserInfo>
          <div>
            <p>사례금(원)</p>
            <ReportInput
              type="text"
              placeholder="입력하기"
              {...register("money", {
                required: false, // 필수 X
                maxLength: { value: 15, message: "15글자 이하이어야 합니다." },
              })}
              inputMode="numeric"
              onChange={(event) => {
                const value = event.target.value;
                event.target.value = Number(
                  value.replace(/[^0-9]/g, "")
                ).toLocaleString();
              }}
            />
            <img
              src={cancel}
              onClick={() => {
                onClickDeleteValue("money");
              }}
            />
            <span>{errors?.money?.message}</span>
          </div>
          <div>
            <p>연락처</p>
            <ReportInput
              type="tel"
              placeholder="010-xxxx-xxxx"
              inputMode="numeric"
              onChange={(event) => {
                const value = event.target.value;
                event.target.value = Number(
                  value.replace(/[^0-9]/g, "")
                ).toLocaleString();
              }}
              {...register("number", {
                required: false, // 필수 X
                pattern: {
                  value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/,
                  message: "하이픈(-)을 넣어주세요 ",
                },
                maxLength: { value: 16, message: "12글자 이하이어야 합니다." },
              })}
            />
            <img
              src={cancel}
              onClick={() => {
                onClickDeleteValue("number");
              }}
            />
            <span>{errors?.number?.message}</span>
          </div>
        </ReportAnimalUserInfo>
        {isActive === true ? (
          <Button type="submit" disable assistiveFillButton>
            작성 완료
          </Button>
        ) : (
          <Button type="submit" fillButton>
            작성 완료
          </Button>
        )}
        {
          <PostModal
            isOpen={loginModal}
            toggle={toggleModal}
            onClose={toggleModal}
            data={postNumber}
          ></PostModal>
        }
      </ReportMissingContainer>
    </Layout>
  );
};
export default Missing;
