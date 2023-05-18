import React, { useEffect, useState } from "react";
import Layout from "../../../layouts/Layout";
import Button from "../../../elements/Button";
import { CheckModal } from "../../../elements/Modal";
import Header from "../components/Header";
import SeleteTab from "../components/SeleteTab";
import EditLocation from "../components/EditLocation";
import { CustomSelect } from "../../../elements/CustomSelect";
import { NameValue, TimeValue } from "./../components/data";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useModalState } from "../../../hooks/useModalState";
import { __getMissingPostDetail } from "../../../redux/modules/petworkSlice";
import cancel from "../../../asset/delete.svg";
import imgdelete from "../../../asset/imgDelete.svg";
import { __PutCatchposts } from "../../../redux/modules/editpostsSlice";
import styles from "../components/reportstyle";
const EditCatch = () => {
  let imageRef;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginModal, toggleModal] = useModalState(false);

  const { missingPostDetail } = useSelector((state) => state?.petwork);

  useEffect(() => {
    dispatch(__getMissingPostDetail(id));
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
  } = useForm({ mode: "onChange" });

  const onClickDeleteValue = (data) => {
    resetField(data);
  };

  // 종류데이터
  const [type, setType] = useState(NameValue[0].name);
  const [typeID, setTypeID] = useState(missingPostDetail.upkind);

  // 셀렉트도직
  const onChangeData = (newData) => {
    setType(newData);
  };
  const onChangeID = (newValue) => {
    setTypeID(newValue);
  };

  const [time, setTime] = useState(missingPostDetail.happenHour);
  const onChangeTimeData = (newData) => {
    setTime(newData);
  };

  // 탭 로직
  const [currentGenderEnValue, setCurrentGenderEnValue] = useState(
    missingPostDetail.sexCd
  );
  const [currentNeuteredEnValue, setCurrentNeuteredEnValue] = useState(
    missingPostDetail.neuterYn
  );
  const [currentNinkNameEnValue, setCurrentNinkNameEnValue] = useState(
    missingPostDetail.openNickname
  );

  const onChangeGender = (newData) => {
    setCurrentGenderEnValue(newData);
  };
  const onChangeNeutered = (newData) => {
    setCurrentNeuteredEnValue(newData);
  };
  const onChangeNickname = (newData) => {
    setCurrentNinkNameEnValue(newData);
  };

  const tabValue = {
    GenderNum: missingPostDetail.sexCd,
    neuterYn: missingPostDetail.neuterYn,
    ninkCheck: missingPostDetail.openNickname,
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

  // 통신결과에따라 보여줄 로딩창
  const [editMsg, setEditMsg] = useState("");

  const onSubmitEditCatchHandler = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("postType", "CATCH");
    formData.append("upkind", typeID);
    formData.append("sexCd", currentGenderEnValue);
    formData.append("neuterYn", currentNeuteredEnValue);
    // formData.append("openNickname", currentNinkNameEnValue);
    {
      data.animalName == ""
        ? formData.append("petName", missingPostDetail.petName)
        : formData.append("petName", data.animalName);
    }
    {
      data.animaltypes == ""
        ? formData.append("kindCd", missingPostDetail.kindCd)
        : formData.append("kindCd", data.animaltypes);
    }
    {
      data.animalAge == ""
        ? formData.append("age", missingPostDetail.age)
        : formData.append("age", data.animalAge);
    }
    {
      data.animalkg == ""
        ? formData.append("weight", missingPostDetail.weight)
        : formData.append("weight", data.animalkg);
    }
    {
      data.animalcolor == ""
        ? formData.append("colorCd", missingPostDetail.colorCd)
        : formData.append("colorCd", data.animalcolor);
    }
    {
      addressDiv.innerHTML == ""
        ? formData.append("happenPlace", missingPostDetail.happenPlace)
        : formData.append("happenPlace", addressDiv.innerHTML);
    }
    {
      addressLatDiv.innerHTML == ""
        ? formData.append("happenLatitude", missingPostDetail.happenLatitude)
        : formData.append("happenLatitude", addressLatDiv.innerHTML);
    }
    {
      addressLngDiv.innerHTML == ""
        ? formData.append("happenLongitude", missingPostDetail.happenLongitude)
        : formData.append("happenLongitude", addressLngDiv.innerHTML);
    }
    {
      selectedDate == ""
        ? formData.append("happenDt", missingPostDetail.happenDt)
        : formData.append("happenDt", selectedDate);
    }
    formData.append("happenHour", time);
    {
      data.characteristic == ""
        ? formData.append("specialMark", missingPostDetail.specialMark)
        : formData.append("specialMark", data.characteristic);
    }
    {
      data.memo == ""
        ? formData.append("content", missingPostDetail.content)
        : formData.append("content", data.memo);
    }
    {
      imageFormData == ""
        ? missingPostDetail?.postImages.map((img) => {
            formData.append("postImages", img);
          })
        : imageFormData.map((img) => {
            formData.append("postImages", img);
          });
    }

    toggleModal();
    const number = missingPostDetail.id;
    dispatch(__PutCatchposts({ formData, number })).then((response) => {
      if (response.type === "putcatchposts/fulfilled") {
        setEditMsg("수정 성공!");
        reset("");
        setCurrentGenderEnValue("");
        setCurrentNeuteredEnValue("");
        setCurrentNinkNameEnValue("");
        setTimeout(function () {
          navigate(`/catchdetail/${missingPostDetail.id}`);
        }, 1000);
      } else {
        setEditMsg("수정 실패..ㅠ");
      }
    });
  };

  const SelecteKind = missingPostDetail.upkind;
  const selecteHour = missingPostDetail.happenHour;

  return (
    <Layout>
      <styles.ReportMissingContainer
        onSubmit={handleSubmit(onSubmitEditCatchHandler)}
      >
        {/* 컴포넌트  */}
        <Header>내 목격 글 수정 </Header>

        <styles.ReportAnimalInfoArea>
          <styles.ReportanimaltypesBox>
            <styles.ReportanimaltypesTitle>
              동물 정보 *
            </styles.ReportanimaltypesTitle>
            <styles.ReportanimaltypesSelect>
              <div>
                <p>종류</p>
                <CustomSelect
                  data={NameValue}
                  onChangeData={onChangeData}
                  onChangeID={onChangeID}
                  selectedValue={SelecteKind}
                />
              </div>
              <div>
                <p>품종</p>
                <styles.ReportInput
                  type="text"
                  placeholder={missingPostDetail.kindCd}
                  {...register("animaltypes", {
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
                <p>추정나이(살)</p>
                <styles.ReportInput
                  type="text"
                  placeholder={missingPostDetail.age}
                  {...register("animalAge", {
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
                <p>추정체중(Kg)</p>
                <styles.ReportInput
                  type="text"
                  placeholder={missingPostDetail.weight}
                  {...register("animalkg", {
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
                <p>색상</p>
                <styles.ReportLgInput
                  type="text"
                  placeholder={missingPostDetail.colorCd}
                  {...register("animalcolor", {
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

        <EditLocation data={missingPostDetail} />

        <styles.ReportAnimalDayBox>
          <p>실종일시 *</p>
          <div>
            <div>
              <p>날짜</p>
              <styles.ReportInput
                type="date"
                onChange={handleDateChange}
                value={selectedDate}
                max={currentDate}
              />
            </div>
            <div>
              <p>시간대</p>
              <CustomSelect
                data={TimeValue}
                onChangeData={onChangeTimeData}
                onChangeID={onChangeTimeValeu}
                selectedValue={selecteHour}
              />
            </div>
          </div>
        </styles.ReportAnimalDayBox>
        {/* 특이사항  */}
        <styles.ReportAnimalSignificantBox>
          <styles.ReportAnimalSignificantBoxTitle>
            <p> 특이사항 </p>
          </styles.ReportAnimalSignificantBoxTitle>
          <styles.ReportAnimalSignificantBoxInputArea>
            <div>
              <p>특징</p>
              <styles.ReportLgInput
                type="text"
                placeholder={
                  missingPostDetail.specialMark == ""
                    ? "입력하세요"
                    : missingPostDetail.specialMark
                }
                {...register("characteristic", {
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
            {/* 메모 */}
            <div>
              <p>메모</p>
              <styles.ReportLgInput
                type="text"
                placeholder={
                  missingPostDetail.content == ""
                    ? "입력하세요"
                    : missingPostDetail.content
                }
                {...register("memo", {
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

        <styles.ReportAnimalPictureArea>
          <styles.ReportAnimalPictureAreaTitle>
            <p>기존이미지</p>
          </styles.ReportAnimalPictureAreaTitle>
          <styles.ReportAnimalPictureAreaInputBox>
            {missingPostDetail?.postImages?.length === 0 ? (
              <styles.ReportAnimalPicturePreview></styles.ReportAnimalPicturePreview>
            ) : (
              <>
                {missingPostDetail?.postImages?.map((image, index) => (
                  <styles.ReportAnimalPicturePreview key={index}>
                    <styles.PreviewImage
                      src={image.imageURL}
                      alt={`${image.imageURL}-${index}`}
                    />
                  </styles.ReportAnimalPicturePreview>
                ))}
              </>
            )}
          </styles.ReportAnimalPictureAreaInputBox>
        </styles.ReportAnimalPictureArea>

        <Button type="submit" fillButton>
          수정 하기
        </Button>

        {editMsg == "" ? null : (
          <CheckModal
            isOpen={loginModal}
            toggle={toggleModal}
            onClose={toggleModal}
          >
            {editMsg}
          </CheckModal>
        )}
      </styles.ReportMissingContainer>
    </Layout>
  );
};

export default EditCatch;
