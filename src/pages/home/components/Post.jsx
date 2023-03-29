import React from "react";

import styled from "styled-components";
import { FlexAttribute, StateSpanStyle } from "../../../style/Mixin";
import location from "../../../asset/location.svg";
import time from "../../../asset/time.svg";
import information from "../../../asset/information.svg";
import ClippingEmpty from "../../../asset/Clippingwhite.jsx";
import { useNavigate } from "react-router-dom";
import { instance } from "../../../utils/api";
import ClippingFill from "../../../asset/profile/ClippingFill";
import { useDispatch } from "react-redux";
import { adoptionScrap } from "../../../redux/modules/adoptionSlice";

const Post = ({ item }) => {
  console.log(item);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scrapHandler = (e) => {
    e.stopPropagation();
    if (!item.isScrap) {
      // instance.post(`/api/pets/scrap/${item.desertionNo}`);
      dispatch(adoptionScrap());
      console.log("scrap");
    } else if (item.isScrap) {
      // instance.delete(`api/pets/scrap/${item.desertionNo}`);
      dispatch(adoptionScrap());
      console.log("scrap delete");
    }
  };

  return (
    <PostContainer
      onClick={() => navigate(`/adoptiondetail/${item.desertionNo}`)}
    >
      <ThunbnailWrapper image={item.filename}>
        <Tuumbnail src={item.filename}></Tuumbnail>
        <KindSpan>{item.data.refinedata.kind}</KindSpan>
      </ThunbnailWrapper>
      <InformationWrapper>
        <TitleBox>
          <h2>{item.data.refinedata.kindCd}</h2>
          <img src={item.data.refinedata.sexCd} alt="sexCd" />
          {item.isScrap ? (
            <ScrapButtonBox onClick={(e) => scrapHandler(e)}>
              <ClippingFill />
            </ScrapButtonBox>
          ) : (
            <ScrapButtonBox onClick={(e) => scrapHandler(e)}>
              <ScrapState />
            </ScrapButtonBox>
          )}
        </TitleBox>
        <TextBox>
          <img src={location} alt="location" />
          <span>{item.careNm}</span>
        </TextBox>
        <TextBox>
          <img src={time} alt="time" />
          <span>{item.noticeDate}</span>
        </TextBox>
        <TextBox>
          <img src={information} alt="information" />
          <span>{item.ageWeightNeuterYn}</span>
        </TextBox>
      </InformationWrapper>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  position: relative;
  z-index: 1;
  ${FlexAttribute("row", "space-between", "center")}
  margin-top: 16px;
  width: 335px;
  border: 1px solid ${(props) => props.theme.color.text_disable};
  border-radius: 4px;
  cursor: pointer;
`;

const ThunbnailWrapper = styled.div`
  position: relative;
  ${FlexAttribute("row", "center", "center")};
  width: 120px;
  height: 120px;
  border-radius: 4px;
  overflow: hidden;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: cover;
`;

const Tuumbnail = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  position: absolute;
  backdrop-filter: blur(3px);
`;

const KindSpan = styled.span`
  ${StateSpanStyle}
  position: absolute;
  top: 10px;
  left: 10px;
`;

const InformationWrapper = styled.div`
  padding: 8px 15px;
  width: 213px;
`;

const TitleBox = styled.div`
  position: relative;
  ${FlexAttribute("row", "", "center")}
  h2 {
    ${(props) => props.theme.Body_400_14};
    padding-top: 2px;
  }
`;

const TextBox = styled.div`
  ${FlexAttribute("row", "", "flex-start")}
  margin-top: 2px;
  span {
    ${(props) => props.theme.Body_400_12}
    color: #999999;
    line-height: 18px;
  }
`;

const ScrapButtonBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
  z-index: 10;
`;

const ScrapState = styled(ClippingEmpty)`
  path {
    fill: ${(props) => props.theme.color.text_alternative};
  }
`;

export default Post;
