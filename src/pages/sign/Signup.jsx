import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import back from "../../asset/Back.svg";
import eye from "../../asset/eye.svg";
import Layout from "../../layouts/Layout";
import { __signupUser } from "../../redux/modules/signSlice";
import {
  FlexAttribute,
  SignSvgStyle,
  Border_2_color,
  Border_1_color,
} from "../../style/Mixin";
import Button from "../../elements/Button";
import { CustomSelect } from "../../elements/CustomSelect";
import { useNavigate } from "react-router-dom";
import { useModalState } from "../../hooks/useModalState";
import { CheckModal } from "../../elements/Modal";
import SignHeader from "./SignHeader";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginModal, toggleModal] = useModalState(false);
  const [SignUpMsg, setSignUpMsg] = useState("");

  const data = [
    { id: 0, name: "naver.com" },
    { id: 1, name: "gmail.com" },
    { id: 2, name: "nate.com" },
  ];
  // 종류데이터
  const [email, setEmail] = useState(data[0].name);
  const onChangeData = (newData) => {
    setEmail(newData);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ mode: "onChange" });

  const [emailCheck, setEmailCheck] = useState(false);
  const emailWatch = watch("id");
  useEffect(() => {
    if (errors?.id?.message !== undefined) {
      setEmailCheck(true);
    } else {
      setEmailCheck(false);
    }
  }, [emailWatch]);

  // 비밀번호 체크 로직
  const [showPassword, setShowPassword] = useState(false);

  //비밀번호 이모티콘
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // 입력값에 따라 버튼 활성화
  const [isActive, setIsActive] = useState(false);

  const watchAll = Object.values(watch());

  useEffect(() => {
    // react-hook-form 만든 값들이 전부 입력이 되면
    if (watchAll.every((el) => el)) {
      // 비밀번호 같다면
      if (watchAll[1] === watchAll[2]) {
        setIsActive(true);
      }
      // 비밀번호와 비밀번호 체크가 다르다면
      else {
        setIsActive(false);
      }
    }
    // react-hook-form 만든 값들이 전부 입력이 되지않으며
    else {
      setIsActive(false);
    }
  }, [watchAll]);

  const onSubmitSignupHandler = (data) => {
    if (data.password === data.checkpassword) {
      const id = data.id + "@" + email;
      const userInfo = {
        email: id,
        password: data.password,
        nickname: data.nickname,
      };
      toggleModal();
      dispatch(__signupUser(userInfo));
      reset();
    }
  };

  const SignUpmessage = useSelector((state) => {
    return state.users?.Signupmessage;
  });

  useEffect(() => {
    if (SignUpmessage === "중복된 이메일이 존재합니다.") {
      setSignUpMsg("⛔ 중복된 이메일이 존재합니다.");
      // 모달 띄우기
    } else if (SignUpmessage === "중복된 닉네임이 존재합니다.") {
      setSignUpMsg("⛔ 중복된 닉네임이 존재합니다.");
    } else if (SignUpmessage === "회원가입이 완료 되었습니다.") {
      setSignUpMsg("✅ 회원가입이 완료 되었습니다.");
      setTimeout(function () {
        navigate("/signin");
      }, 1000);
    }
  }, [SignUpmessage]);

  return (
    <Layout>
      <SignContainer onSubmit={handleSubmit(onSubmitSignupHandler)}>
        <SignHeader>회원가입</SignHeader>
        <SignIdNincknameBox>
          <p>아이디</p>
          <div>
            <div>
              <SignsmInput
                name="email"
                type="text"
                placeholder="입력하기"
                required
                {...register("id", {
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "영문 숫자 2 ~ 12글자 사이로 입력",
                  },
                  maxLength: { value: 12, message: "12글자이내 작성" },
                })}
              />
              <span>{errors?.id?.message}</span>
            </div>
            <p style={{ position: "aabsoluteb", top: "-5px" }}>@</p>
            <div>
              <CustomSelect data={data} onChangeData={onChangeData} />
            </div>
          </div>
        </SignIdNincknameBox>

        <SignPwBox>
          <p>비밀번호</p>
          <div>
            <div>
              <SignLgInput
                {...register("password", {
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                    message:
                      "비밀번호 (최소 8자리 숫자, 문자, 특수문자 최소 1개",
                  },
                  maxLength: {
                    value: 12,
                    message: "8~12 자리 숫자, 문자, 특수문자 최소 1개",
                  },
                })}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
              />
              <img onClick={toggleShowPassword} src={eye} alt="showPassword" />

              <span>{errors?.password?.message}</span>
            </div>
            <div>
              <SignLgInput
                name="checkpassword"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호 재입력"
                {...register("checkpassword", {
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                    message: "8~12 자리 숫자, 문자, 특수문자 최소 1개",
                  },
                  maxLength: {
                    value: 12,
                    message: "8~12 자리 숫자, 문자, 특수문자 최소 1개",
                  },
                })}
              />

              <img onClick={toggleShowPassword} src={eye} alt="showPassword" />
              <span>{errors?.checkpassword?.message}</span>
            </div>
          </div>
        </SignPwBox>

        <SignIdNincknameBox>
          <p>닉네임</p>
          <div>
            <SignLgInput
              {...register("nickname", {
                required: true,
                pattern: {
                  value: /^[ㄱ-ㅎ|가-힣]+$/,
                  message: "6자이내 한글 또는 영문",
                },
                maxLength: { value: 6, message: "6자이내 한글 또는 영문" },
              })}
              name="nickname"
              type="text"
              placeholder="8자이내 한글 또는 영문"
            />
            <span>{errors?.nickname?.message}</span>
          </div>
        </SignIdNincknameBox>
        <SignBtnBox>
          {isActive === false ? (
            <Button type="submit" disable assistiveFillButton>
              회원가입
            </Button>
          ) : (
            <Button type="submit" fillButton>
              회원가입
            </Button>
          )}
        </SignBtnBox>
      </SignContainer>

      {SignUpMsg == "" ? null : (
        <CheckModal
          isOpen={loginModal}
          toggle={toggleModal}
          onClose={toggleModal}
        >
          {SignUpMsg}
        </CheckModal>
      )}
    </Layout>
  );
};
const SignContainer = styled.form`
  ${FlexAttribute("column", "", "center")}
  width: 100%;
  height: 50.75rem;
  gap: 2rem 0;
`;

const SignIdNincknameBox = styled.div`
  width: 20.9375rem;
  height: 4rem;
  margin-top: 2rem;
  > p {
    width: 100%;
    height: 20%;
    ${(props) => props.theme.Body_400_14}
  }
  > div {
    position: relative;
    width: 100%;
    height: 80%;
    ${(props) => props.theme.FlexRow}
    > div {
      width: 50%;
      height: 90%;
      > span {
        ${(props) => props.theme.Span_alert}
        color: #D6459C;
        font-size: 0.625rem;
        > img {
          position: absolute;
          left: 0.3125rem;
          bottom: 0.25rem;
          width: 0.625rem;
          height: 0.5625rem;
          ${(props) => props.theme.FlexCenter}
        }
      }
    }

    > span {
      position: absolute;
      top: 2.5rem;
      ${(props) => props.theme.Span_alert}
    }
  }
`;
const SignPwBox = styled.div`
  width: 20.9375rem;
  height: 7.5rem;
  > p {
    width: 100%;
    height: 20%;
    ${(props) => props.theme.Body_400_14}
  }
  > div {
    width: 100%;
    height: 80%;
    ${(props) => props.theme.FlexColumn}
    > div {
      position: relative;
      width: 100%;
      height: 50%;

      > img {
        position: absolute;
        ${SignSvgStyle}
        top: 10px;
        right: 0px;
      }
      > span {
        position: absolute;
        display: flex;
        ${(props) => props.theme.Span_alert}
        color: #D6459C;
        font-size: 10px;
      }
    }
  }
`;

const SignBtnBox = styled.div`
  width: 20.9375rem;
  height: 5rem;
  margin-top: 5rem;
  ${(props) => props.theme.FlexCenter}
`;
const SignsmInput = styled.input`
  width: 9.75rem;
  height: 1.5625rem;
  margin-top: 5px;
  ${Border_1_color}
  background: transparent;
  ${(props) => props.theme.Body_400_12}
  cursor: pointer;
  ::placeholder {
    color: ${(props) => props.theme.color.text_assistive};
  }
`;
const SignLgInput = styled.input`
  width: 20.9375rem;
  height: 1.5625rem;
  margin-top: 0.3125rem;
  ${Border_1_color}
  background: transparent;
  font-size: 0.75rem;
  cursor: pointer;
  ::placeholder {
    color: ${(props) => props.theme.color.text_assistive};
  }
`;

export default Signup;
