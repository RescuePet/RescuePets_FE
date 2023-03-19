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
  // 종류데이터
  const [email, setEmail] = useState(data[0].name)
  const onChangeData = (newData) => {
    setEmail(newData);
  }

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
    console.log("이메일 :", data.id + "@" + email)
  }

  return (
    <Layout>
      <SignContainer onSubmit={handleSubmit(onSubmitSignupHandler)}>
        <SignHeader>
          <div>이전</div>
          <div>회원가입</div>
          <div></div>
        </SignHeader>

        <SignIdBox>
          <p>아이디</p>
          <div>
            <div>
              <SignsmInput name="email" type="text" placeholder="입력하기" required
                {...register("id", {
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/, message: "영문 숫자 2 ~ 8글자 사이로 입력",
                  },
                  maxLength: { value: 12, message: "12글자이내 작성", }
                })}
              />
              <span>{errors?.id?.message}</span>
            </div>
            <p>@</p>
            <div>
              <CustomSelect data={data} onChangeData={onChangeData} />
            </div>
          </div>
        </SignIdBox>

        <SignPwBox>
          <p>비밀번호</p>
          <div>
            <div>1</div>
            <div>2</div>
          </div>
        </SignPwBox>

        <Button type="submit" TabBtn2>회원가입</Button>
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
        {/* <SignText>비밀번호</SignText>
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
            <span>{errors?.checkpassword?.message}</span>
          </Errormessage>
          <SignText>닉네임</SignText>
          <InputWrapper>
            <SignInput
              {...register("nickname", {
                required: true,
                pattern: { value: /^[ㄱ-ㅎ|가-힣]+$/, message: "한글만 2 ~ 8글자 사이로 입력", },
                maxLength: { value: 8, message: "한글만 2 ~ 8글자 사이로 입력", }
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
        </ButtonWrapper> */}
      </SignContainer>
    </Layout>
  );
};
const SignContainer = styled.form`
   ${FlexAttribute("column", "center", "center")}   
  width: 100%;
  height: 50.75rem;
  border: 1px solid red;
`;

const SignHeader = styled.div`
   width: 100%;
  height: 2.625rem;
  border-bottom: 0.25rem solid #eeeeee;
  font-size: 1.125rem;
  font-weight: 700;
  ${FlexAttribute("", "center", "space-around")}   
  color: #222222;
  border: 1px solid red;
  > div {
    height: 100%;
    width: 33.3%;
    ${props => props.theme.FlexCenter}
    /* border: 1px solid red; */
    ${props => props.theme.Title_700_18}
  }
`;

const SignIdBox = styled.div`
  width: 20.9375rem;
  height: 4rem;
  margin-top: 2rem;

  > p {
    width: 100%;
    height: 20%;
    ${props => props.theme.Body_400_14}
  }
  >div {
    width: 100%;
    height: 80%;
    ${props => props.theme.FlexRow}
    > div {
      width: 50%;
      height: 90%;
    
      > span {
      ${props => props.theme.Span_alert}
      }
    }
   
  }
`;
const SignPwBox = styled.div`
  width: 100%;
  height: 7.5rem;
  border: 1px solid red;
  > p {
    width: 100%;
    height: 20%;
    border: 1px solid red;
    ${props => props.theme.Body_400_14}
  }
  >div {
    width: 100%;
    height: 80%;
    border: 1px solid red;
    ${props => props.theme.FlexColumn}
    > div {
      width: 100%;
      height: 50%;
      border: 1px solid red;
    }
  }
`;


const SignsmInput = styled.input`
  width: 9.75rem;
  height: 1.5625rem;
  margin-top: 5px;
  border-bottom: 2px solid #EEEEEE;
  background: transparent;
  font-size: 12px;
  cursor: pointer;
`;




export default Signup;
