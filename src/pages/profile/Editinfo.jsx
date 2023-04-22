import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import { HeaderStyle, Border_1_color, FlexAttribute } from "../../style/Mixin";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import camera from "../../asset/profile/camera.png";
import close from "../../asset/Close.svg";
import Button from "../../elements/Button";

import { __PutMyinfoEdit } from "../../redux/modules/infoeditSlice";
import Cookies from "js-cookie";
import { Spinner } from "../../components/Spinner";
import { useModalState } from "../../hooks/useModalState";
import { CheckModal } from "../../elements/Modal";

import {
  initAmplitude,
  logEvent,
  setAmplitudeUserId,
  resetAmplitude,
} from "../../utils/amplitude";
import isLogin from "../../utils/isLogin";
import { instance } from "../../utils/api";
import Option from "../../components/Option";

const Editinfo = () => {
  let imageRef;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = JSON.parse(Cookies.get("UserInfo"));
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

  const [loginModal, toggleModal] = useModalState(false);
  const [editMsg, setEditMsg] = useState("");
  const [secessionOption, setSecessionOption] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ mode: "onChange" });

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
    if (watch("name") !== "" || imageFormData !== "") {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [watch()]);

  const onSubmitmyInfoHandler = (data) => {
    const formData = new FormData();
    if (data.name == "") {
      formData.append("image", imageFormData);
    } else if (imageFormData === "") {
      formData.append("nickname", data.name);
    } else if (data.name !== "" && imageFormData === "") {
      formData.append("nickname", data.name);
      formData.append("image", imageFormData);
    }

    dispatch(__PutMyinfoEdit(formData)).then((response) => {
      toggleModal();
      reset();
      console.log(response);
      if (response.payload == undefined) {
        setEditMsg(response.error.message);
        reset();
      } else if (response.type === "putMyinfoEdit/fulfilled") {
        setEditMsg(response.payload.message);
        setTimeout(function () {
          navigate("/profile");
        }, 1000);
      }
    });
  };

  const EditMsg = useSelector((state) => {
    return state.infoEdit;
  });

  if (JSON.stringify(EditMsg.loading) === "true") {
    return <Spinner />;
  }

  const secessionHandler = async () => {
    try {
      const response = await instance.post(`/api/member/withdrawal`);
      if (response.data.status === true) {
        toggleModal();
        setEditMsg("✅ 회원탈퇴 성공");
        setTimeout(() => {
          Cookies.remove("Token");
          Cookies.remove("Refresh");
          Cookies.remove("UserInfo");
          setEditMsg("");
          setSecessionOption(false);
          navigate("/signin");
        }, 1000);
      } else {
        setEditMsg("회원탈퇴 오류");
      }
    } catch (error) {
      return;
    }
  };

  const secessionOptionSetting = [
    {
      option: "구해줘! 펫츠 탈퇴하기",
      color: "report",
      handler: secessionHandler,
      type: "comment",
    },
  ];

  const mapCloseHandler = () => {
    setSecessionOption(false);
  };

  return (
    <>
      <Layout>
        <EditInfoForm onSubmit={handleSubmit(onSubmitmyInfoHandler)}>
          {editMsg === "" ? null : (
            <CheckModal
              isOpen={loginModal}
              toggle={toggleModal}
              onClose={toggleModal}
            >
              {editMsg}
            </CheckModal>
          )}
          <EditHeader>
            <h2>내 정보 수정</h2>
            <CloseSvg src={close} onClick={MoveToBackPage} />
          </EditHeader>
          <EditInfoImgBox>
            <EditInfoImgBack>
              {imageFormData === "" ? (
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
                  message: "한글만 2 ~ 6글자 사이로 입력",
                },
                maxLength: { value: 6, message: "6글자 이하이어야 합니다." },
              })}
            />
            <span>{errors?.name?.message}</span>
          </EditInfoTextBox>

          <EditInfoTextBox>
            <p>이메일</p>
            {/* <input type="text" value={userInfo.email} /> */}
            <div>{userInfo.email}</div>
          </EditInfoTextBox>

          <EditinfoButtonBox>
            {isActive === true ? (
              <Button disable emptyButton type="button">
                저장 중
              </Button>
            ) : (
              <Button type="submit" fillButton>
                저장하기
              </Button>
            )}
            <SecessionButton
              assistiveFillButton
              onClick={() => setSecessionOption(!secessionOption)}
            >
              회원 탈퇴
            </SecessionButton>
          </EditinfoButtonBox>
        </EditInfoForm>
      </Layout>
      {secessionOption && (
        <Option
          setting={secessionOptionSetting}
          mapCloseHandler={mapCloseHandler}
        />
      )}
    </>
  );
};

export default Editinfo;

const EditInfoForm = styled.form`
  width: 100%;
  height: 100%;
`;

const EditHeader = styled.header`
  position: relative;
  ${FlexAttribute("row", "center")};
  ${HeaderStyle}
  h2 {
    ${(props) => props.theme.Body_500_16};
    color: ${(props) => props.theme.color.text_normal};
    line-height: 1.5rem;
    margin-bottom: 16px;
  }
`;

const CloseSvg = styled.img`
  position: absolute;
  right: 1.25rem;
  cursor: pointer;
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
`;

const EditInfoImgIn = styled.img`
  z-index: 5;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const EditInfoImgInput = styled.img`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  right: 1.75rem;
  top: 1.875rem;
  background: transparent;
  cursor: pointer;
`;

const EditInfoTextBox = styled.div`
  width: 20.9375rem;
  height: 5.1875rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 1.25rem;
  gap: 0.4688rem 0;
  > p {
    width: 100%;
    height: 20%;
    ${(props) => props.theme.Body_400_14_16}
    color: ${(props) => props.theme.color.black};
  }
  > div {
    width: 100%;
    height: 1.5rem;
    ${Border_1_color}
    border-radius: 0;
    ${(props) => props.theme.Body_400_12}
  }
  > input {
    width: 100%;
    height: 1.5rem;
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
  ${FlexAttribute("column", "center", "center")}
  margin-top: 6.25rem
`;

const SecessionButton = styled(Button)`
  margin-top: 1rem;
`;
