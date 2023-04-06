import React, { useEffect, useState } from "react";
import Layout from "../../../layouts/Layout";
import Button from "../../../elements/Button";
import { CheckModal } from "../../../elements/Modal";
import Header from "../components/Header";
import SeleteTab from "../components/SeleteTab";
import EditLocation from "./EditLocation";
import { CustomSelect } from "../../../elements/CustomSelect";
import { NameValue, TimeValue } from "./../components/data";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useModalState } from "../../../hooks/useModalState";
import { __getMissingPostDetail } from "../../../redux/modules/petworkSlice";
import cancel from "../../../asset/delete.svg";
import imgdelete from "../../../asset/imgDelete.svg";
import { __PutMissingposts } from "../../../redux/modules/editpostsSlice";
import {
  ReportMissingContainer,
  ReportAnimalInfoArea,
  ReportAnimalInfoBox,
  ReportAnimalInfoBoxColumn,
  ReportAnimalInfoBoxColumnRow,
  ReportanimaltypesBox,
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
  ReportAnimalUserInfo,
  PreviewImage,
} from "../components/reportstyle";
import { data } from "autoprefixer";

const EditMissing = () => {
  let imageRef;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginModal, toggleModal] = useModalState(false);

  const { missingPostDetail } = useSelector((state) => state?.petwork);

  // console.log(missingPostDetail);
  useEffect(() => {
    dispatch(__getMissingPostDetail(id));
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    watch,
  } = useForm({ mode: "onChange" });

  const onClickDeleteValue = (data) => {
    resetField(data);
  };

  // 종류데이터
  const [type, setType] = useState(NameValue[0].name);
  const [typeID, setTypeID] = useState("DOG");

  // 셀렉트도직
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

  // 탭 로직
  const [currentGenderEnValue, setCurrentGenderEnValue] = useState("MALE");
  const [currentNeuteredEnValue, setCurrentNeuteredEnValue] = useState("YES");

  const onChangeGender = (newData) => {
    setCurrentGenderEnValue(newData);
  };
  const onChangeNeutered = (newData) => {
    setCurrentNeuteredEnValue(newData);
  };

  const [selectedDate, setSelectedDate] = useState("");
  const currentDate = new Date().toISOString().split("T")[0];
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const onChangeTimeValeu = () => {};

  // 주소
  const addressDiv = document.getElementById("address");
  // 좌표값들
  const addressLatDiv = document.getElementById("addressLat");
  const addressLngDiv = document.getElementById("addressLng");

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

  // 입력값에 따라 버튼 활성화
  const [isActive, setIsActive] = useState(false);
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
      //   console.log('성공')
      setIsActive(false);
    } else {
      //  console.log('실패')
      setIsActive(true);
    }
  }, [watch()]);

  // 통신결과에따라 보여줄 로딩창
  const [editMsg, setEditMsg] = useState("");

  const onSubmitEditMissingHandler = (data) => {
    if (addressDiv?.innerHTML === "") {
      alert("지도에 위치를 표기해주세요");
    } else {
      const formData = new FormData();
      formData.append("postType", "MISSING");
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
      for (let value of formData.values()) {
        console.log(value);
      }
      toggleModal();
      const number = missingPostDetail.id;
      dispatch(__PutMissingposts({ formData, number })).then((response) => {
        if (response.type === "putmissingposts/fulfilled") {
          console.log("성공");
          // 바로 이동시키기
          setEditMsg("수정 성공!");
          setTimeout(function () {
            navigate(`/missingdetail/${missingPostDetail.id}`);
          }, 1000);
          // navigate(`missingdetail/${missingPostDetail.id}`)
        } else {
          console.log("실패");
          setEditMsg("수정 실패..ㅠ");
        }
      });
    }
  };

  return (
    <Layout>
      <ReportMissingContainer
        onSubmit={handleSubmit(onSubmitEditMissingHandler)}
      >
        {/* 컴포넌트  */}
        <Header>내 실종글 수정 </Header>

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
                <ReportInput
                  type="text"
                  placeholder={missingPostDetail.kindCd}
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
          />

          <ReportAnimalInfoBox>
            <ReportAnimalInfoBoxColumn>
              <ReportAnimalInfoBoxColumnRow>
                <p>이름</p>
                <ReportInput
                  type="text"
                  placeholder={missingPostDetail.petName}
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
                  placeholder={missingPostDetail.age}
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
                  placeholder={missingPostDetail.weight}
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
                  placeholder={missingPostDetail.colorCd}
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

        <EditLocation data={missingPostDetail} />

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
                placeholder={missingPostDetail.happenDt}
              />
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
                placeholder={missingPostDetail.specialMark}
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
                placeholder={missingPostDetail.content}
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
        <ReportAnimalUserInfo>
          <div>
            <p>사례금(원)</p>
            <ReportInput
              type="text"
              placeholder={
                missingPostDetail.gratuity == ""
                  ? "입력하세요"
                  : missingPostDetail.gratuity
              }
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
              placeholder={
                missingPostDetail.contact == ""
                  ? "입력하세요"
                  : missingPostDetail.contact
              }
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
        {editMsg == "" ? null : (
          <CheckModal
            isOpen={loginModal}
            toggle={toggleModal}
            onClose={toggleModal}
          >
            {editMsg}
          </CheckModal>
        )}
      </ReportMissingContainer>
    </Layout>
  );
};

export default EditMissing;
