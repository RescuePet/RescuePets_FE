import React, { useEffect } from "react";
import styled from "styled-components";
import Search from "../../asset/search";
import { FlexAttribute } from "../../style/Mixin";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSearchState,
  toggleInputState,
  toggleSearchCategory,
  toggleSearchSetState,
  toggleSearchState,
} from "../../redux/modules/searchSlice";
import { CategoryBoxStyle } from "./SearchMixin";
import { toDown } from "../../style/Animation";

const SearchCategory = () => {
  const dispatch = useDispatch();
  const { searchCategory } = useSelector((state) => state.search);

  useEffect(() => {
    return () => {
      dispatch(resetSearchState());
    };
  }, []);

  const closeSearchSet = () => {
    dispatch(toggleSearchSetState(false));
    dispatch(toggleSearchState(false));
  };

  return (
    <SearchCategoryContainer>
      <CategoruSearchIcon width={30} height={30} onClick={closeSearchSet} />
      <CategoryBox
        active={searchCategory === "kindType"}
        onClick={() => {
          dispatch(toggleSearchSetState(true));
          dispatch(toggleSearchCategory("kindType"));
          dispatch(toggleInputState(false));
        }}
      >
        <span>종류</span>
      </CategoryBox>
      <CategoryBox
        active={searchCategory === "kindCd"}
        onClick={() => {
          dispatch(toggleSearchSetState(true));
          dispatch(toggleSearchCategory("kindCd"));
          dispatch(toggleInputState(true));
        }}
      >
        <span>품종</span>
      </CategoryBox>
      <CategoryBox
        active={searchCategory === "careNm"}
        onClick={() => {
          dispatch(toggleSearchSetState(true));
          dispatch(toggleSearchCategory("careNm"));
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
  ${FlexAttribute("row", "center", "center")}
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
