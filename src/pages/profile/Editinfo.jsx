import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import { HeaderStyle } from "../../style/Mixin";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import Input
import camera from "../../asset/profile/camera.png";
import close from "../../asset/Close.svg";
import Button from "../../elements/Button";
import { Border_1_color } from "../../style/Mixin";
import { __PutMyinfoEdit } from "../../redux/modules/infoeditSlice";

// import
const Editinfo = () => {
  let imageRef;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ mode: "onChange" });

  // console.log(userInfo.profileImage)

  const MoveToBackPage = () => {
    navigate(-1);
  };

  // 이미지로 로직
  const [imageFormData, setImageFormData] = useState("");
  const [imageShow, setImageShow] = useState("");

  const onChangeUploadHandler = async (e) => {
    e.preventDefault();
    const imageFile = e.target.files[0];

    const currentImageUrl = URL.createObjectURL(imageFile);
    setImageShow(currentImageUrl);
    setImageFormData(imageFile);
  };

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (watch("name") !== "" && imageFormData !== "") {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [watch()]);

  console.log(userInfo);
  const onSubmitmyInfoHandler = (data) => {
    const formData = new FormData();

    formData.append("nickname", data.name);

    formData.append("image", imageFormData);

    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }
    dispatch(__PutMyinfoEdit(formData));
  };

  const [EditInfoMsg, setEditInfoMsg] = useState("");

  const EditMsg = useSelector((state) => {
    return state.infoEdit;
  });

  useEffect(() => {
    console.log("통신결과", EditMsg);
    if (EditMsg?.message?.status === true) {
      console.log(userInfo);
      // console.log("성공")
      console.log(EditMsg?.message);
      console.log(EditMsg?.message?.message);
      console.log(EditMsg?.message?.data);
      // localStorageNaNpxoveItem("nickname");
      // localStorageNaNpxoveItem("profileImage");
      // localStorage.setItem("nickname", EditMsg?.message?.data?.nickname)
      // localStorage.setItem("profileImage", EditMsg?.message?.data?.image)
    } else {
      console.log("실패");
    }
    // setEditInfoMsg()
  }, [EditMsg]);

  // 통신중일떄 보여줄것
  if (JSON.stringify(EditMsg.loading) === "true") {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <EditInfoForm onSubmit={handleSubmit(onSubmitmyInfoHandler)}>
        <EditInfoHeader>
          <div></div>
          <div>
            <h2>프로필 수정하기</h2>
          </div>
          <div>
            <img src={close} onClick={MoveToBackPage} />
          </div>
        </EditInfoHeader>

        <EditInfoImgBox>
          <EditInfoImgBack>
            {imageFormData == "" ? (
              <EditInfoImgIn src={userInfo?.profileImage} />
            ) : (
              <EditInfoImgIn src={imageShow} />
            )}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={(refer) => (imageRef = refer)}
              onChange={onChangeUploadHandler}
            />
            <EditInfoImgInput src={camera} onClick={() => imageRef.click()} />
          </EditInfoImgBack>
        </EditInfoImgBox>

        <EditInfoTextBox>
          <p>닉네임</p>
          <input
            type="text"
            placeholder={userInfo.nickname}
            {...register("name", {
              required: false,
              pattern: {
                value: /^[ㄱ-ㅎ|가-힣]+$/,
                message: "한글만 2 ~ 8글자 사이로 입력",
              },
              maxLength: { value: 8, message: "8글자 이하이어야 합니다." },
            })}
          />
          <span>{errors?.name?.message}</span>
        </EditInfoTextBox>
        <EditinfoButtonBox>
          {isActive === true ? (
            <Button disable emptyButton>
              값입력
            </Button>
          ) : (
            <Button type="submit" fillButton>
              등록
            </Button>
          )}
        </EditinfoButtonBox>
      </EditInfoForm>
    </Layout>
  );
};

export default Editinfo;

const EditInfoForm = styled.form`
  width: 100%;
  height: 100%;
`;

const EditInfoHeader = styled.div`
  ${HeaderStyle}
  ${(props) => props.theme.FlexRow}
  > div {
    width: 33.3%;
    ${(props) => props.theme.FlexCenter}
    > h2 {
      ${(props) => props.theme.Body_500_16}
      color: ${(props) => props.theme.color.black};
    }
  }
`;

const EditInfoImgBox = styled.div`
  width: 100%;
  height: 7.5rem;
  padding-top: 20px;

  ${(props) => props.theme.FlexCenter}
`;

const EditInfoImgBack = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  /* background: ${(props) => props.theme.color.gray}; */
  /* opacity: 0.5; */
`;

const EditInfoImgIn = styled.img`
  z-index: 5;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  /* background-color: rgba(0, 0, 0, 0.8); */
`;

const EditInfoImgInput = styled.img`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  right: 28px;
  top: 40px;
  background: transparent;
`;

const EditInfoTextBox = styled.div`
  width: 20.9375rem;
  height: 5.1875rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 1.25rem;
  gap: 5px 0;
  > P {
    width: 100%;
    height: 20%;
    ${(props) => props.theme.Body_400_14_16}
    color: ${(props) => props.theme.color.black};
  }
  > input {
    width: 100%;
    height: 1.5rem;
    /* border-bottom: 1px solid #000; */
    ${Border_1_color}
    border-radius: 0;
    ${(props) => props.theme.Body_400_12}
  }
  > span {
    width: 100%;
    height: 1rem;
    ${(props) => props.theme.Span_alert}
  }
`;

const EditinfoButtonBox = styled.div`
  ${(props) => props.theme.FlexCenter}
  margin-top: 15.625rem;
`;
