import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import cancel from "../../asset/cancel.svg";
import check from "../../asset/check.svg";
import Layout from "../../layouts/Layout";
import { __signinUser } from "../../redux/modules/signSlice";
import { FlexAttribute, HeaderStyle, SignSvgStyle } from "../../style/Mixin";
import Button from "../../elements/Button";
import { useNavigate } from "react-router-dom";
import { useModalState } from "../../hooks/useModalState";
import { CheckModal } from "../../elements/Modal";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginModal, toggleModal] = useModalState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    watch,
  } = useForm({ mode: "onChange" });

  // 삭제로직
  const onClickDeleteValue = (data) => {
    resetField(data);
  };
  // 입력값에 따라 버튼 활성화
  const [isActive, setIsActive] = useState(false);

  const watchAll = Object.values(watch());

  useEffect(() => {
    if (watchAll.every((el) => el)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [watchAll]);

  const onSubmitSigninHanler = (data) => {
    const siginInfo = {
      email: data.email,
      password: data.password,
    };
    // 토
    toggleModal();
    dispatch(__signinUser(siginInfo));
  };

  // 에러 메시지만 받아서 처리하면 좋을 듯
  const SignInMessage = useSelector((state) => {
    return state?.users?.Signinmessage;
  });
  // console.log(SignInMessage)
  // 로그인 성공시
  useEffect(() => {
    if (SignInMessage === "success") {
      console.log("로그인성공");
      setTimeout(function () {
        navigate("/home");
      }, 1000);
      // navigate('/home')
    } else if (SignInMessage === "아이디,비밀번호를 확인해주세요") {
      // toggleModal()
      console.log("로그인실패");
      // alert('로그인 실패')
    }
  }, [SignInMessage]);

  const URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_SIGN_ID}&redirect_uri=${process.env.REACT_APP_RESCUEPETS}/kakaologin`;

  const kakaoSignUp = () => {
    window.location.href = URL;
  };

  return (
    <Layout>
      <SignContainer onSubmit={handleSubmit(onSubmitSigninHanler)}>
        <SignHeader>
          <span>로그인</span>
        </SignHeader>
        <SignForm>
          <SignText>아이디</SignText>
          <InputWrapper>
            <SignInput
              name="email"
              placeholder="이메일 주소"
              {...register("email", {
                pattern: {
                  value: /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/,
                  message: "이메일 형식으로 작성",
                },
                maxLength: {
                  value: 30,
                  message: "30글자이내 작성",
                },
              })}
            />
            <img
              onClick={() => {
                onClickDeleteValue("email");
              }}
              src={cancel}
              alt="cancel"
              name="email"
            />
            <span>{errors?.email?.message}</span>
          </InputWrapper>
          <SignText>비밀번호</SignText>
          <InputWrapper>
            <SignInput
              name="password"
              type="password"
              placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
              {...register("password", {
                required: true,
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,12}$/,
                  message: "8~12 자리 숫자, 문자, 특수문자 최소 1개",
                },
                maxLength: {
                  value: 12,
                  message: "8~12 자리 숫자, 문자, 특수문자 최소 1개",
                },
              })}
            />
            <img
              onClick={() => {
                onClickDeleteValue("password");
              }}
              src={cancel}
              alt="cancel"
              name="password"
            />
            <span>{errors?.password?.message}</span>
          </InputWrapper>
        </SignForm>
        {SignInMessage === null ? null : (
          <CheckModal
            isOpen={loginModal}
            toggle={toggleModal}
            onClose={toggleModal}
          >
            {SignInMessage}
          </CheckModal>
        )}
        <AutoSignInWrapper>
          <img src={check} alt="check" />
          <span>자동로그인</span>
        </AutoSignInWrapper>
        <ButtonWrapper>
          {isActive === false ? (
            <Button type="submit" disable assistiveFillButton>
              로그인
            </Button>
          ) : (
            <Button type="submit" fillButton>
              로그인
            </Button>
          )}

          <Button type="button" fillButton onClick={() => kakaoSignUp()}>
            카카오톡으로 로그인
          </Button>
        </ButtonWrapper>
        <SignUpWrapper>
          <SignUpSpan onClick={() => navigate("/signup")}>회원가입</SignUpSpan>
          <BrSpan>|</BrSpan>
          <Forgot>아이디/비밀번호찾기</Forgot>
        </SignUpWrapper>
      </SignContainer>
    </Layout>
  );
};

const SignContainer = styled.form`
  ${FlexAttribute("column")}
  width: 100%;
`;

const SignHeader = styled.div`
  ${FlexAttribute("row", "center")}
  ${HeaderStyle}
`;

const SignForm = styled.div`
  ${FlexAttribute("column", "center")}
  margin: 0px 20px 0px 20px;
  img {
    ${SignSvgStyle}
  }
`;

const SignText = styled.span`
  font-size: 0.875rem;
  margin-top: 2rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  ${FlexAttribute("row", "", "center")}
  border-bottom: .125rem solid #eeeeee;
  > img {
    position: absolute;
    right: 0;
  }
  > span {
    position: absolute;
    top: 50px;
    right: 50%;
    ${(props) => props.theme.Span_alert}
  }
`;

const SignInput = styled.input`
  width: 100%;
  height: 2.875rem;
  font-size: 0.75rem;
  ::placeholder {
    color: #cccccc;
  }
`;

const ButtonWrapper = styled.div`
  ${FlexAttribute("column", "center", "center")}
  margin-top: 3.25rem;
  button:first-child {
    margin-bottom: 1.125rem;
  }
`;

const AutoSignInWrapper = styled.div`
  ${FlexAttribute("row", "flex-end", "center")}
  margin: 1.125rem 1.9375rem 0 0;
  cursor: pointer;
  img {
    ${SignSvgStyle}
  }
  span {
    margin-left: 0.5rem;
    font-size: 0.8125rem;
    color: #666666;
  }
`;

const SignUpWrapper = styled.div`
  ${FlexAttribute("row", "center", "center")}
  margin-top: 1.5rem;
`;

const SignUpSpan = styled.span`
  font-size: 0.875rem;
  cursor: pointer;
`;

const Forgot = styled.span`
  font-size: 0.75rem;
  color: #999999;
  cursor: pointer;
`;

const BrSpan = styled.span`
  margin: 0 1rem;
  font-size: 0.75rem;
  color: #999999;
`;

export default Signin;
