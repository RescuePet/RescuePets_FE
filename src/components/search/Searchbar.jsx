import React from "react";
import Search from "../../asset/search";
import styled from "styled-components";
import { FlexAttribute } from "../../style/Mixin";
import { toDown } from "../../style/Animation";

const Searchbar = ({ closeHandler }) => {
  return (
    <>
      <SearchContainer>
        <SearchInput placeholder="검색어를 입력하세요"></SearchInput>
        <SearchTrueIcon width={30} height={30} onClick={closeHandler} />
      </SearchContainer>
    </>
  );
};

const SearchContainer = styled.div`
  position: relative;
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
  cursor: pointer;
`;

export default Searchbar;
