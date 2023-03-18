import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useState } from "react";
import arrow from "../../asset/arrow.svg";
import eye from "../../asset/eye.svg";
import Layout from "../../layouts/Layout";
import { __signupUser } from "../../redux/modules/signSlice";
import { FlexAttribute, SignSvgStyle } from "../../style/Mixin";
import Button from "../../elements/Button";

const Signup = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  });
  // console.log(value);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [nickNameError, setNickNameError] = useState(false);
  const [openSelectBox, setOpenSelectBox] = useState(false);
  //셀렉트박스 저장하는 스테이트
  const [selectedOption, setSelectedOption] = useState("");
  //선택한옵션 랜더링하는 스테이트
  const dispatch = useDispatch();
  const handleInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value.email + "@" + selectedOption);

    // 비밀번호 정규식 확인
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;
    if (!passwordRegex.test(value.password)) {
      setPasswordError(true);
      return;
    }

    // 비밀번호 재입력 일치 확인
    if (value.password !== value.passwordConfirm) {
      setPasswordConfirmError(true);
      return;
    }

    // 닉네임 정규식 확인
    const nicknameRegex = /^[a-zA-Z가-힣]{1,8}$/;
    if (!value.nickname || !nicknameRegex.test(value.nickname)) {
      setNickNameError(true);
      return;
    }
    // console.log(value.nickname);

    dispatch(
      __signupUser({
        email: value.email,
        password: value.password,
        passwordConfirm: value.passwordConfirm,
        nickname: value.nickname,
      })
    );
  };

  //비밀번호 이모티콘
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  //비밀번호 확인 이모티콘
  const toggleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleSelect = (event) => {
    const selectedOption = event.target.textContent;
    setSelectedOption(selectedOption);
    // console.log(event.target.textContent);
    // const updatedEmail = `${value.email}${selectedOption}`;
    // setValue({ ...value, email: updatedEmail });
    setOpenSelectBox(false); // 옵션 박스 닫기
  };

  return (
    <Layout>
      <SignContainer>
        <SignHeader>
          <span>회원가입</span>
        </SignHeader>
        <SignForm id="signup" action="" onSubmit={handleSubmit}>
          <SignText>로그인</SignText>
          <InputWrapper>
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
          </InputWrapper>
          <SignText>비밀번호</SignText>
          <InputWrapper>
            <SignInput
              name="password"
              value={value.password || ""}
              onChange={handleInput}
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
            {passwordError && (
              <p>
                비밀번호는 영문, 숫자, 특수문자 조합 8자리 이상이어야 합니다.
              </p>
            )}
          </Errormessage>

          <InputWrapper>
            <SignInput
              name="passwordConfirm"
              value={value.passwordConfirm || ""}
              onChange={handleInput}
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
              name="nickname"
              value={value.nickname || ""}
              onChange={handleInput}
              placeholder="8자이내 한글 또는 영문"
            />
          </InputWrapper>
          <Errormessage>
            {nickNameError && <p>닉네임이 맞지 않습니다</p>}
          </Errormessage>
        </SignForm>
        <ButtonWrapper>
          <Button TabBtn2 type="submit" form="signup">
            회원가입
          </Button>
        </ButtonWrapper>
      </SignContainer>
    </Layout>
  );
};
const SignContainer = styled.div`
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

const SignForm = styled.form`
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
  width: 90%;
  height: 2.875rem;
  font-size: 0.75rem;
  ::placeholder {
    color: #cccccc;
  }
`;

const SelectInput = styled.input`
  width: 50%;
  height: 2.875rem;
  font-size: 0.75rem;
  ::placeholder {
    color: #cccccc;
  }
`;

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

const MiddleContext = styled.div``;

const SelectButton = styled.button`
  position: absolute;
  right: 10px;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 50%;
`;

const SelectBox = styled.div`
  position: relative;
  width: 100%;
  margin-top: 10px;
`;

const SelectUl = styled.ul`
  position: absolute;
  max-height: 120px;
  right: 10px;
  margin-top: 20px;
`;
const Selectli = styled.li`
  padding: 1.5px;
  border: 1px solid black;
  border-bottom: none;
  &:last-child {
    border-bottom: 1px solid black;
  }
  margin-bottom: -1px;
`;
export default Signup;
