import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../layouts/Layout";
import Button from "../../elements/Button";
import cancel from "../../asset/delete.svg";
import Location from "./components/Location";
import Header from "./components/Header";
import imageCompression from "browser-image-compression";
import { CustomSelect } from "../../elements/CustomSelect";
import SeleteTab from "./components/SeleteTab";
import {
  ReportMissingContainer,
  ReportanimaltypesBox,
  ReportAnimalInfoArea,
  ReportAnimalInfoBox,
  ReportAnimalInfoBoxColumn,
  ReportAnimalInfoBoxColumnRow,
  ReportAnimalInfoBoxColumnColumn,
  ReportanimaltypesTitle,
  ReportanimaltypesSelect,
  ReportInput,
  ReportLgInput,
  ReportAnimalDayBox,
  ReportAnimalSignificantBox,
  ReportAnimalSignificantBoxTitle,
  ReportAnimalSignificantBoxInputArea,
  ReportAnimalPictureArea,
  ReportAnimalPictureAreaTitle,
  ReportAnimalPictureAreaInputBox,
  ReportAnimalPictureInput,
  ReportAnimalPicturePreview,
  PreviewImage,
} from "./components/reportstyle";
import { NameValue, TimeValue } from "./components/data";
import { __PostCatchData } from "../../redux/modules/petworkSlice";
import { useDispatch, useSelector } from "react-redux";
import imgdelete from "../../asset/imgDelete.svg";
import { useNavigate } from "react-router-dom";
import { useModalState } from "../../hooks/useModalState";
import { CheckModal } from "../../elements/Modal";

const Catch = () => {
  let imageRef;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginModal, toggleModal] = useModalState(false);
  const [postNumber, setPostNumber] = useState("");

  const [catchMsg, setCatchMsg] = useState("");

  const { postId } = useSelector((state) => {
    return state.petwork;
  });

  const data = {
    number: postId,
    name: "catchdetail",
  };

  useEffect(() => {
    setPostNumber(data);
  }, [postId]);

  // 커스텀 셀렉트 파트부분
  const [type, setType] = useState(NameValue[0].name);
  const [typeID, setTypeID] = useState("DOG");
  const [time, setTime] = useState(TimeValue[0]?.name);

  const onChangeData = (newData) => {
    setType(newData);
  };
  const onChangeID = (newValue) => {
    setTypeID(newValue);
  };
  const onChangeTimeData = (newData) => {
    setTime(newData);
  };
  // 콘솔없애기 위한 로직
  const onChangeTimeValeu = () => {};

  const [currentGenderEnValue, setCurrentGenderEnValue] = useState("MALE");
  const [currentNeuteredEnValue, setCurrentNeuteredEnValue] = useState("YES");
  const [currentNinkNameEnValue, setCurrentNinkNameEnValue] = useState("true");

  const onChangeGender = (newData) => {
    setCurrentGenderEnValue(newData);
  };
  const onChangeNeutered = (newData) => {
    setCurrentNeuteredEnValue(newData);
  };
  const onChangeNickname = (newData) => {
    setCurrentNinkNameEnValue(newData);
  };

  const tabValue = null;

  // 사진 로직
  const [showImages, setShowImages] = useState([]);
  const [imageFormData, setImageFormData] = useState([]);

  const onChangeUploadHandler = async (e) => {
    e.preventDefault();
    // 인풋에서 선택된 이미지들
    const imageLists = e.target.files;
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

  // React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    watch,
  } = useForm({ mode: "onChange" });

  // 버튼을 누르면 선택된 usehookForm 제거
  const onClickDeleteValue = (data) => {
    resetField(data);
  };

  const [selectedDate, setSelectedDate] = useState("");

  // 현재 날짜를 가져옵니다.
  const currentDate = new Date().toISOString().split("T")[0];

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // 주소 좌표값을 보내기 위한 것들
  const addressDiv = document.getElementById("address");
  const addressLatDiv = document.getElementById("addressLat");
  const addressLngDiv = document.getElementById("addressLng");

  // 입력값에 따라 버튼 활성화 사진도 필수값으로 넣
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (
      watch("animaltypes") !== "" &&
      watch("animalAge") !== "" &&
      watch("animalkg") !== "" &&
      watch("address") !== "" &&
      watch("animalcolor") !== "" &&
      addressDiv?.innerHTML !== "" &&
      selectedDate !== ""
    ) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [watch()]);

  // form submit 로직
  const onSubmitSightingHanlder = (data) => {
    if (addressDiv?.innerHTML === "" && selectedDate == "") {
      toggleModal();
      setCatchMsg("지도상에 위치와 날짜를 선택해주세요.");
    } else {
      const formData = new FormData();
      formData.append("postType", "CATCH");
      formData.append("upkind", typeID);
      formData.append("sexCd", currentGenderEnValue);
      formData.append("neuterYn", currentNeuteredEnValue);
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

      // formData.append("openNickname", currentNinkNameEnValue);
      imageFormData.map((img) => {
        formData.append("postImages", img);
      });
      dispatch(__PostCatchData(formData)).then((response) => {
        if (response.type == "postgetCatchData/fulfilled") {
          toggleModal();
          setCatchMsg("등록 성공 ");
          setTimeout(function () {
            navigate(`/catchdetail/${response.payload.id}`);
          }, 1000);
        } else {
          setCatchMsg("서버 오류.. ");
        }
      });
      reset();
    }
  };

  return (
    <Layout>
      <ReportMissingContainer onSubmit={handleSubmit(onSubmitSightingHanlder)}>
        {catchMsg == "" ? null : (
          <CheckModal
            isOpen={loginModal}
            toggle={toggleModal}
            onClose={toggleModal}
          >
            {catchMsg}
          </CheckModal>
        )}
        <Header>목격 글 작성하기</Header>
        <ReportAnimalInfoArea>
          <ReportanimaltypesBox>
            <ReportanimaltypesTitle>동물정보</ReportanimaltypesTitle>
            <ReportanimaltypesSelect>
              <div>
                <p>종류*</p>
                <CustomSelect
                  data={NameValue}
                  onChangeData={onChangeData}
                  onChangeID={onChangeID}
                />
              </div>
              <div>
                <p>품종*</p>
                <ReportInput
                  type="text"
                  placeholder="입력하기"
                  {...register("animaltypes", {
                    required: true,
                    pattern: {
                      value: /^[가-힣\s]+$/,
                      message: "한글만 2 ~ 15글자 사이로 입력",
                    },
                    maxLength: {
                      value: 15,
                      message: "15글자 이하이어야 합니다.",
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

          <SeleteTab
            onChangeGender={onChangeGender}
            onChangeNeutered={onChangeNeutered}
            onChangeNickname={onChangeNickname}
            tabValue={tabValue}
          />

          <ReportAnimalInfoBox>
            <ReportAnimalInfoBoxColumn>
              <ReportAnimalInfoBoxColumnRow>
                <p>추정나이(살)*</p>
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

              <ReportAnimalInfoBoxColumnRow>
                <p>추정체중(Kg)*</p>
                <ReportInput
                  type="text"
                  placeholder="입력하기"
                  {...register("animalkg", {
                    required: false,
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
                    onClickDeleteValue("animalkg");
                  }}
                />
                <span>{errors?.animalkg?.message}</span>
              </ReportAnimalInfoBoxColumnRow>
            </ReportAnimalInfoBoxColumn>

            <ReportAnimalInfoBoxColumn>
              <ReportAnimalInfoBoxColumnColumn>
                <p>색상*</p>
                <ReportLgInput
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
              </ReportAnimalInfoBoxColumnColumn>
            </ReportAnimalInfoBoxColumn>
          </ReportAnimalInfoBox>
        </ReportAnimalInfoArea>
        <Location />
        <ReportAnimalDayBox>
          <p>목격일시 *</p>
          <div>
            <div>
              <p>날짜*</p>
              <ReportInput
                type="date"
                onChange={handleDateChange}
                value={selectedDate}
                max={currentDate}
              />
            </div>
            <div>
              <p>시간대*</p>
              <CustomSelect
                data={TimeValue}
                onChangeData={onChangeTimeData}
                onChangeID={onChangeTimeValeu}
              />
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
              required
            />
            <ReportAnimalPictureInput onClick={() => imageRef.click()}>
              <h3>+</h3>
            </ReportAnimalPictureInput>
            {showImages.length === 0 ? (
              <ReportAnimalPicturePreview>
                <div>
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
        {isActive === true ? (
          <Button type="submit" disable assistiveFillButton>
            작성 완료
          </Button>
        ) : (
          <Button type="submit" fillButton>
            작성 완료
          </Button>
        )}
      </ReportMissingContainer>
    </Layout>
  );
};

export default Catch;
