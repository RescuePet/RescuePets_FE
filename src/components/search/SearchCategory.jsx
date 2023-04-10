import React from "react";
import styled from "styled-components";
import Search from "../../asset/search";
import { FlexAttribute } from "../../style/Mixin";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSearchState,
  toggleDistanceState,
  toggleInputState,
  toggleSearchCategory,
  toggleSearchSetState,
  toggleSearchState,
} from "../../redux/modules/searchSlice";
import { CategoryBoxStyle } from "./SearchMixin";
import { toDown } from "../../style/Animation";

const SearchCategory = ({ petwork }) => {
  const dispatch = useDispatch();
  const { searchCategory } = useSelector((state) => state.search);

  const closeSearchSet = () => {
    dispatch(toggleSearchSetState(false));
    dispatch(toggleSearchState(false));
    dispatch(resetSearchState());
  };

  return (
    <SearchCategoryContainer>
      <CategoruSearchIcon width={30} height={30} onClick={closeSearchSet} />
      <CategoryBox
        active={searchCategory === "distance"}
        onClick={() => {
          dispatch(toggleSearchSetState(true));
          dispatch(toggleInputState(false));
          dispatch(toggleDistanceState(true));
          dispatch(toggleSearchCategory("distance"));
        }}
      >
        <span>거리</span>
      </CategoryBox>
      <CategoryBox
        petwork={petwork}
        active={searchCategory === "kindType"}
        onClick={() => {
          dispatch(toggleSearchSetState(true));
          dispatch(toggleInputState(false));
          dispatch(toggleDistanceState(false));
          dispatch(toggleSearchCategory("kindType"));
        }}
      >
        <span>종류</span>
      </CategoryBox>
      <CategoryBox
        petwork={petwork}
        active={searchCategory === "kindCd"}
        onClick={() => {
          dispatch(toggleSearchSetState(true));
          dispatch(toggleInputState(true));
          dispatch(toggleDistanceState(false));
          dispatch(toggleSearchCategory("kindCd"));
        }}
      >
        <span>품종</span>
      </CategoryBox>
      {!petwork && (
        <CategoryBox
          active={searchCategory === "careNm"}
          onClick={() => {
            dispatch(toggleSearchSetState(true));
            dispatch(toggleInputState(true));
            dispatch(toggleDistanceState(false));
            dispatch(toggleSearchCategory("careNm"));
          }}
        >
          <span>보호소</span>
        </CategoryBox>
      )}
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
