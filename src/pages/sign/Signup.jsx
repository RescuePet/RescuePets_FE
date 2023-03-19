import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import arrow from "../../asset/arrow.svg";
import eye from "../../asset/eye.svg";
import Layout from "../../layouts/Layout";
// import { __signupUser } from "../../redux/modules/signSlice";
import { FlexAttribute, SignSvgStyle } from "../../style/Mixin";
import Button from "../../elements/Button";
import { CustomSelect } from "../../elements/CustomSelect";
import Input from "../../elements/Input"

const Signup = () => {


  const data = [
    { id: 0, name: "naver.com" },
    { id: 1, name: "gmail.com" },
    { id: 2, name: "nate.com" },
  ];

  const {
    register, handleSubmit, formState: { errors },
    reset, resetField, } = useForm({ mode: 'onChange' });


  // 비밀번호 체크 로직
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  const dispatch = useDispatch();




  //비밀번호 이모티콘
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  //비밀번호 확인 이모티콘
  const toggleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };



  const onSubmitSignupHandler = (data) => {
    console.log(data)
  }

  return (
    <Layout>
      <SignContainer onSubmit={handleSubmit(onSubmitSignupHandler)}>
        <SignHeader>
          <span>회원가입</span>
        </SignHeader>
        <SignForm >
          <SignText>로그인</SignText>
          {/* <InputWrapper>
            <SelectInput
              name="email"
              value={value.email || ""}
              onChange={handleInput}
              placeholder="이메일 주소"
            />
            <MiddleContext>@{selectedOption}</MiddleContext>
            <SelectWrapper>
              <SelectButton onClick={() => setOpenSelectBox(!openSelectBox)}>
                <img src={arrow} alt="셀렉트 박스 열기" />
              </SelectButton>
              {openSelectBox && (
                <SelectBox>
                  <SelectUl>
                    <Selectli onClick={handleSelect} value="naver.com">
                      naver.com
                    </Selectli>
                    <Selectli onClick={handleSelect} value="gmail.com">
                      gmail.com
                    </Selectli>
                    <Selectli onClick={handleSelect} value="nate.com">
                      nate.com
                    </Selectli>
                  </SelectUl>
                </SelectBox>
              )}
            </SelectWrapper>
          </InputWrapper> */}
          <SignText>비밀번호</SignText>
          <InputWrapper>
            <SignInput
              {...register("password", {
                required: true,
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, message: "비밀번호 (최소 8자리 숫자, 문자, 특수문자 최소 1개",
                },
                maxLength: { value: 12, message: "8~12 자리 숫자, 문자, 특수문자 최소 1개", }
              })}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
            />
            <img
              onClick={toggleShowPassword}
              src={eye}
              alt="showPassword"
              name="showPassword"
            />
          </InputWrapper>
          <Errormessage>
            <span>{errors?.password?.message}</span>
          </Errormessage>

          <InputWrapper>
            <SignInput
              {...register("checkpassword", {
                required: true,
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, message: "8~12 자리 숫자, 문자, 특수문자 최소 1개",
                },
                maxLength: { value: 12, message: "8~12 자리 숫자, 문자, 특수문자 최소 1개", }
              })}
              name="checkpassword"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호 재입력"
            />
            <img
              onClick={toggleShowPasswordConfirm}
              src={eye}
              alt="showPassword"
              name="showPassword"
            />
          </InputWrapper>
          <Errormessage>
            {passwordConfirmError && <p>비밀번호가 일치하지 않습니다.</p>}
          </Errormessage>
          <SignText>닉네임</SignText>
          <InputWrapper>
            <SignInput
              {...register("nickname", {
                required: true,
                pattern: { value: /^[ㄱ-ㅎ|가-힣]+$/, message: "한글만 2 ~ 8글자 사이로 입력", },
                maxLength: { value: 8, message: "숫자만 입력! 3자리수 이하로 작성", }
              })}

              name="nickname"
              type="text"
              placeholder="8자이내 한글 또는 영문"
            />
          </InputWrapper>
          <Errormessage>
            <span>{errors?.nickname?.message}</span>
          </Errormessage>
        </SignForm>
        <ButtonWrapper>
          <Button type="submit" TabBtn2>회원가입</Button>
        </ButtonWrapper>
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
  width: 100%;
  height: 5rem;
  padding-top: 2.5rem;
  border-bottom: 0.25rem solid #eeeeee;
  font-size: 1.125rem;
  font-weight: 700;
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
  display: flex;
  align-items: center;
  ${FlexAttribute("row", "", "center")}
  border-bottom: 0.125rem solid #eeeeee;
`;

const SignInput = styled.input`
    width: 20.9375rem;
     height: 2.875rem;
     font-size: 12px;
     ::placeholder {
    color: #cccccc;
  }
`


const ButtonWrapper = styled.div`
  margin-top: 100px;
  margin-left: 50px;
  button:first-child {
    margin-bottom: 1.125rem;
  }
`;
const Errormessage = styled.div`
  width: 100%;
  height: 2.875rem;
  font-size: 0.75rem;
`;



export default Signup;
