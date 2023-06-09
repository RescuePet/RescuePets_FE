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
import styles from "./components/reportstyle";
import { NameValue, TimeValue } from "./components/data";
import { __PostCatchData } from "../../redux/modules/petworkSlice";
import { useDispatch, useSelector } from "react-redux";
import imgdelete from "../../asset/imgDelete.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useModalState } from "../../hooks/useModalState";
import { CheckModal } from "../../elements/Modal";

import {
  initAmplitude,
  logEvent,
  setAmplitudeUserId,
  resetAmplitude,
} from "../../utils/amplitude";
import isLogin from "../../utils/isLogin";

const Catch = () => {
  // 앰플리튜드
  const location = useLocation();
  useEffect(() => {
    initAmplitude();
    logEvent(`enter_${location.pathname}`);
    if (isLogin()) {
      setAmplitudeUserId();
    }
    return () => {
      resetAmplitude();
    };
  }, []);
  let imageRef;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginModal, toggleModal] = useModalState(false);
  const [postNumber, setPostNumber] = useState("");

  const [catchMsg, setCatchMsg] = useState("");

  // 커스텀 셀렉트 파트부분
  const [type, setType] = useState(NameValue[0].name);
  const [typeID, setTypeID] = useState("DOG");
  const [time, setTime] = useState(TimeValue[0]?.name);

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
      selectedDate !== "" &&
      showImages.length > 0
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
    } else if (addressDiv?.innerHTML !== "" && selectedDate !== "") {
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
      <styles.ReportMissingContainer
        onSubmit={handleSubmit(onSubmitSightingHanlder)}
      >
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
        <styles.ReportAnimalInfoArea>
          <styles.ReportanimaltypesBox>
            <styles.ReportanimaltypesTitle>
              동물정보
            </styles.ReportanimaltypesTitle>
            <styles.ReportanimaltypesSelect>
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
                <styles.ReportInput
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
            </styles.ReportanimaltypesSelect>
          </styles.ReportanimaltypesBox>

          <SeleteTab
            onChangeGender={onChangeGender}
            onChangeNeutered={onChangeNeutered}
            onChangeNickname={onChangeNickname}
            tabValue={tabValue}
          />

          <styles.ReportAnimalInfoBox>
            <styles.ReportAnimalInfoBoxColumn>
              <styles.ReportAnimalInfoBoxColumnRow>
                <p>추정나이(살)*</p>
                <styles.ReportInput
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
              </styles.ReportAnimalInfoBoxColumnRow>

              <styles.ReportAnimalInfoBoxColumnRow>
                <p>추정체중(Kg)*</p>
                <styles.ReportInput
                  type="text"
                  placeholder="입력하기"
                  {...register("animalkg", {
                    required: true,
                    pattern: { value: /^[0-9.]+$/, message: "숫자만입력가능" },
                    maxLength: {
                      value: 4,
                      message: "숫자 . 만 입력! 4자리수 이하로 작성",
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
              </styles.ReportAnimalInfoBoxColumnRow>
            </styles.ReportAnimalInfoBoxColumn>

            <styles.ReportAnimalInfoBoxColumn>
              <styles.ReportAnimalInfoBoxColumnColumn>
                <p>색상*</p>
                <styles.ReportLgInput
                  type="text"
                  placeholder="입력하기"
                  {...register("animalcolor", {
                    required: true,
                    pattern: {
                      value: /^[가-힣\s\(\)\,]+$/,
                      message: "한글 ( ) , 만입력가능 ",
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
              </styles.ReportAnimalInfoBoxColumnColumn>
            </styles.ReportAnimalInfoBoxColumn>
          </styles.ReportAnimalInfoBox>
        </styles.ReportAnimalInfoArea>

        <Location />

        <styles.ReportAnimalDayBox>
          <p>목격일시 *</p>
          <div>
            <div>
              <p>날짜*</p>
              <styles.ReportInput
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
        </styles.ReportAnimalDayBox>

        <styles.ReportAnimalSignificantBox>
          <styles.ReportAnimalSignificantBoxTitle>
            <p> 특이사항 </p>
          </styles.ReportAnimalSignificantBoxTitle>

          <styles.ReportAnimalSignificantBoxInputArea>
            <div>
              <p>특징</p>
              <styles.ReportLgInput
                type="text"
                placeholder="입력하기"
                {...register("characteristic", {
                  required: false,
                  pattern: {
                    value: /^[a-zA-Z가-힣\s!,.]+$/,
                    message: "한글,영어 . , ! 만 들어갈 수있습니다 ",
                  },
                  maxLength: {
                    value: 30,
                    message: "30글자 이하이어야 합니다.",
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
              <styles.ReportLgInput
                type="text"
                placeholder="입력하기"
                {...register("memo", {
                  required: false,
                  pattern: {
                    value: /^[a-zA-Z가-힣\s!,.]+$/,
                    message: "한글,영어 . , ! 만 들어갈 수있습니다 ",
                  },
                  maxLength: {
                    value: 40,
                    message: "40글자 이하이어야 합니다.",
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
          </styles.ReportAnimalSignificantBoxInputArea>
        </styles.ReportAnimalSignificantBox>
        <styles.ReportAnimalPictureArea>
          <styles.ReportAnimalPictureAreaTitle>
            <p>사진첨부</p>
          </styles.ReportAnimalPictureAreaTitle>
          <styles.ReportAnimalPictureAreaInputBox>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              multiple
              ref={(refer) => (imageRef = refer)}
              onChange={onChangeUploadHandler}
              required
            />
            <styles.ReportAnimalPictureInput onClick={() => imageRef.click()}>
              <h3>+</h3>
            </styles.ReportAnimalPictureInput>
            {showImages.length === 0 ? null : (
              <>
                {showImages.map((image, index) => (
                  <styles.ReportAnimalPicturePreview key={index}>
                    <styles.PreviewImage
                      src={image}
                      alt={`${image}-${index}`}
                    />
                    <div
                      onClick={() => {
                        onClickDeleteHandler(index);
                      }}
                    >
                      <img src={imgdelete} />
                    </div>
                  </styles.ReportAnimalPicturePreview>
                ))}
              </>
            )}
          </styles.ReportAnimalPictureAreaInputBox>
        </styles.ReportAnimalPictureArea>
        {isActive === true ? (
          <Button type="submit" disable assistiveFillButton>
            작성 하기
          </Button>
        ) : (
          <Button type="submit" fillButton>
            작성 완료
          </Button>
        )}
      </styles.ReportMissingContainer>
    </Layout>
  );
};

export default Catch;
