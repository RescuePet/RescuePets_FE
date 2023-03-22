import React, { useState } from 'react'
import styled from 'styled-components'

export const CustomSelect = ({ data, onChangeData, onChangeID }) => {
  const [currentValue, setCurrentValue] = useState(data[0].name);
  // console.log(currentValue) //이 값을 상위컴포넌트로 보내야 한다 
  const [showOptions, setShowOptions] = useState(false);

  const handleOnChangeSelectValue = (e) => {
    // 하위컴포넌트에서 보여줄값 
    setCurrentValue(e.target.getAttribute("value"));
    // 이코드로 상위컴포넌트로 가장최신값을 보낸다 
    onChangeData(e.target.getAttribute("value"))
    if (onChangeID !== null) {
      onChangeID(e.target.id)
    }

  };


  return (
    <SelectBox onClick={() => setShowOptions((prev) => !prev)}>
      <Label>{currentValue}</Label>
      <SelectOptions show={showOptions}>
        {data.map((data) => (
          <Option
            key={data.id}
            // 옵션들 값
            id={data.value}
            value={data.name}
            onClick={handleOnChangeSelectValue}>
            {/* 선택된 값*/}
            {data.name}
          </Option>
        ))}
      </SelectOptions>
    </SelectBox>
  )
}


const SelectBox = styled.div`
  position: relative;
  width: 9.75rem;
  height: 1.5625rem;
  border-bottom: 2px solid #EEEEEE;
  padding: 8px 0 20px 0;
  /* align-self: center; */
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  cursor: pointer;
  &::before {
    content: "⌵";
    position: absolute;
    top: 1px;
    right: 8px;
    color: #999999;
    font-size: 20px;
  }
`;
const Label = styled.label`
  font-size: 14px;
  margin-left: 4px;
  text-align: center;
`;

const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  top: 35px;
  left: 0;
  width: 100%;
  overflow: scroll;
  height: 100px;
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  border-radius: 8px;
  background-color: #eeeeee;
  color: #222222;
  z-index: 10;
`;

const Option = styled.li`
  font-size: 14px;
  padding: 6px 8px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #595959;
  }
`;
