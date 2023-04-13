import React from "react";
import Search from "../../asset/search";
import styled from "styled-components";
import { FlexAttribute } from "../../style/Mixin";
import { toDown } from "../../style/Animation";
import Button from "../../elements/Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/modules/searchSlice";

import { logEvent } from "../../utils/amplitude";

const Searchbar = ({ searchHandler }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const setInputValue = (value) => {
    dispatch(setSearchValue(value.searchValue));
    searchHandler(value.searchValue);
    logEvent("searchValue", { searchValue: value.searchValue });
  };

  return (
    <SearchContainer onSubmit={handleSubmit(setInputValue)}>
      <SearchInput
        placeholder="검색어를 입력하세요"
        {...register("searchValue")}
      ></SearchInput>
      <SearchTrueIcon width={30} height={30} />
      <Button search>검색</Button>
    </SearchContainer>
  );
};

const SearchContainer = styled.form`
  position: sticky;
  top: 0;
  height: 40px;
  ${FlexAttribute("row", "center", "center")}
  width: 330px;
  border-radius: 20px;
  border: 2px solid ${(props) => props.theme.color.input_border};
  overflow: hidden;
  margin-top: 16px;
  animation: ${toDown} 1s ease-in-out;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 32px;
  margin-left: 30px;
  padding-left: 8px;
  border-left: 1px solid ${(props) => props.theme.color.input_border}; ;
`;

const SearchTrueIcon = styled(Search)`
  position: absolute;
  left: 0;
`;

export default Searchbar;
