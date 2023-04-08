import React, { useEffect } from "react";
import styled from "styled-components";
import Search from "../../asset/search";
import { FlexAttribute } from "../../style/Mixin";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSearchState,
  toggleInputState,
  toggleSearchCategory,
} from "../../redux/modules/searchSlice";
import { CategoryBoxStyle } from "./SearchMixin";
import { toDown } from "../../style/Animation";

const SearchCategory = ({ toggleSearchState, handleSearchState }) => {
  const dispatch = useDispatch();
  const { searchCategory } = useSelector((state) => state.search);

  const closeSearchSet = () => {
    toggleSearchState();
    handleSearchState(false);
  };

  useEffect(() => {
    return () => {
      dispatch(resetSearchState());
    };
  }, []);

  return (
    <SearchCategoryContainer>
      <CategoruSearchIcon width={30} height={30} onClick={closeSearchSet} />
      <CategoryBox
        active={searchCategory === "none"}
        onClick={() => {
          handleSearchState(true);
          dispatch(toggleSearchCategory("none"));
          dispatch(toggleInputState(true));
        }}
      >
        <span>선택안함</span>
      </CategoryBox>
      <CategoryBox
        active={searchCategory === "type"}
        onClick={() => {
          handleSearchState(true);
          dispatch(toggleSearchCategory("type"));
          dispatch(toggleInputState(false));
        }}
      >
        <span>종류</span>
      </CategoryBox>
      <CategoryBox
        active={searchCategory === "kind"}
        onClick={() => {
          handleSearchState(true);
          dispatch(toggleSearchCategory("kind"));
          dispatch(toggleInputState(true));
        }}
      >
        <span>품종</span>
      </CategoryBox>
      <CategoryBox
        active={searchCategory === "care"}
        onClick={() => {
          handleSearchState(true);
          dispatch(toggleSearchCategory("care"));
          dispatch(toggleInputState(true));
        }}
      >
        <span>보호소</span>
      </CategoryBox>
    </SearchCategoryContainer>
  );
};

const SearchCategoryContainer = styled.div`
  position: relative;
  ${FlexAttribute("row")}
  width: 100%;
  padding: 0 8px;
  margin-bottom: 7px;
  animation: ${toDown} 0.5s ease-in-out;
`;

const CategoryBox = styled.div`
  ${CategoryBoxStyle}
`;

const CategoruSearchIcon = styled(Search)`
  cursor: pointer;
`;

export default SearchCategory;
