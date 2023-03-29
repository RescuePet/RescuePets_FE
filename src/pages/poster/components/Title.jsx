import React from "react";
import styled from "styled-components";
import { Body_400_14 } from "../../../style/theme";
import {
  ContentInformationStyle,
  FlexAttribute,
  PostTitleBorderStyle,
} from "../../../style/Mixin";
import { __getMissingPostDetail } from "../../../redux/modules/petworkSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import State from "../../../elements/State";

const Title = ({ titleData }) => {
  const dispatch = useDispatch();
  // const { id } = useParams();
  const id = 1;

  const { missingPostDetail } = useSelector((state) => state.petwork);

  useEffect(() => {
    dispatch(__getMissingPostDetail(id));
    // console.log(missingPostDetail);
  }, [id]);

  return (
    <TitleWrapper>
      <State category="실종">실종</State>
      <SemiText>여성</SemiText>
      <SexCd />
      <RegularText>
        성: {missingPostDetail.sexCd}/{missingPostDetail.age}살/
        {missingPostDetail.weight}kg/중성화:{missingPostDetail.neuterYn}
      </RegularText>
    </TitleWrapper>
  );
};

const TitleWrapper = styled.div`
  ${FlexAttribute("row", "space-evenly", "center")}
  width: 100%;
  margin: 16px auto;
  ${PostTitleBorderStyle}
`;

const SemiText = styled.span`
  flex-basis: 80px;
  text-align: center;
  ${Body_400_14}
`;

const SexCd = styled.div`
  flex-basis: 30px;
`;

const RegularText = styled.span`
  ${ContentInformationStyle}
  flex-basis: 190px;
`;

export default Title;
