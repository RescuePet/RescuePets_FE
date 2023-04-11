import React from "react";
import styled from "styled-components";
import Search from "../../asset/search";
import { FlexAttribute } from "../../style/Mixin";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSearchState,
  toggleDistanceState,
  toggleInputState,
  togglePostSearchState,
  togglePublicSearchState,
  toggleSearchCategory,
  toggleSearchPostSetState,
  toggleSearchPublicSetState,
} from "../../redux/modules/searchSlice";
import { CategoryBoxStyle } from "./SearchMixin";
import { toDown } from "../../style/Animation";

const SearchCategory = ({ petwork }) => {
  const dispatch = useDispatch();
  const { searchCategory } = useSelector((state) => state.search);

  const closePostSearchSet = () => {
    dispatch(togglePostSearchState());
    dispatch(resetSearchState());
  };

  const closePublicSearchSet = () => {
    dispatch(togglePublicSearchState());
    dispatch(resetSearchState());
  };

  const categoryHandler = (category) => {
    if (petwork) {
      dispatch(toggleSearchPostSetState(true));
    } else {
      dispatch(toggleSearchPublicSetState(true));
    }
    dispatch(toggleSearchCategory(category));
  };

  return (
    <SearchCategoryContainer>
      <CategoruSearchIcon
        width={30}
        height={30}
        onClick={petwork ? closePostSearchSet : closePublicSearchSet}
      />
      <CategoryBox
        active={searchCategory === "distance"}
        onClick={() => {
          categoryHandler("distance");
          dispatch(toggleInputState(false));
          dispatch(toggleDistanceState(true));
        }}
      >
        <span>거리</span>
      </CategoryBox>
      <CategoryBox
        petwork={petwork}
        active={searchCategory === "kindType"}
        onClick={() => {
          categoryHandler("kindType");
          dispatch(toggleInputState(false));
          dispatch(toggleDistanceState(false));
        }}
      >
        <span>종류</span>
      </CategoryBox>
      <CategoryBox
        petwork={petwork}
        active={searchCategory === "kindCd"}
        onClick={() => {
          categoryHandler("kindCd");
          dispatch(toggleInputState(true));
          dispatch(toggleDistanceState(false));
        }}
      >
        <span>품종</span>
      </CategoryBox>
      {!petwork && (
        <CategoryBox
          active={searchCategory === "careNm"}
          onClick={() => {
            categoryHandler("careNm");
            dispatch(toggleInputState(true));
            dispatch(toggleDistanceState(false));
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
