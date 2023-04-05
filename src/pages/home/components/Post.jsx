import React from "react";

import styled from "styled-components";
import { FlexAttribute } from "../../../style/Mixin";
import location from "../../../asset/location.svg";
import time from "../../../asset/time.svg";
import information from "../../../asset/information.svg";
import ClippingEmpty from "../../../asset/Clippingwhite.jsx";
import { useNavigate } from "react-router-dom";
import ClippingFill from "../../../asset/profile/ClippingFill";
import { useDispatch } from "react-redux";
import { __postAdoptionListScrap } from "../../../redux/modules/adoptionSlice";
import State from "../../../elements/State";

const Post = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scrapHandler = (e) => {
    e.stopPropagation();
    let payload = {
      page: "home",
      state: item.isScrap,
      desertionNo: item.desertionNo,
    };
    dispatch(__postAdoptionListScrap(payload));
  };

  return (
    <PostContainer
      onClick={() => navigate(`/adoptiondetail/${item.desertionNo}`)}
    >
      <ThunbnailWrapper image={item.filename}>
        <Tuumbnail src={item.filename}></Tuumbnail>
        <State category={"adoptionKind"}>{item.data.refinedata.kind}</State>
      </ThunbnailWrapper>
      <InformationWrapper>
        <TitleBox>
          <State category={"adoptionstate"}>{item.state}</State>
          <h2>{item.data.refinedata.kindCd}</h2>
          <img src={item.data.refinedata.sexCd} alt="sexCd" />
          {item.isScrap ? (
            <ScrapButtonBox onClick={(e) => scrapHandler(e)}>
              <ScrapTrue />
            </ScrapButtonBox>
          ) : (
            <ScrapButtonBox onClick={(e) => scrapHandler(e)}>
              <ScrapFalse />
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
  margin-top: 1rem;
  width: 20.9375rem;
  border: 0.0625rem solid ${(props) => props.theme.color.text_disable};
  border-radius: 0.25rem;
  cursor: pointer;
  :hover {
    border: 0.0625rem solid ${(props) => props.theme.color.primary_normal};
    box-shadow: 0px 1px ${(props) => props.theme.color.primary_normal};
    transform: translate(0px, -1px);
    transition: 0.3s;
  }
  :active {
    border: 0.0625rem solid ${(props) => props.theme.color.primary_heavy};
    transform: translate(0px, 1px);
    background-color: ${(props) => props.theme.color.line_alternative};
    box-shadow: none;
    transition: 0.3s;
  }
`;

const ThunbnailWrapper = styled.div`
  position: relative;
  ${FlexAttribute("row", "center", "center")};
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 0.25rem;
  overflow: hidden;
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: cover;
`;

const Tuumbnail = styled.img`
  width: 7.5rem;
  height: 7.5rem;
  object-fit: contain;
  position: absolute;
  backdrop-filter: blur(0.1875rem);
`;

const InformationWrapper = styled.div`
  padding: 0.5rem 0.9375rem;
  width: 13.3125rem;
`;

const TitleBox = styled.div`
  position: relative;
  ${FlexAttribute("row", "", "center")}
  h2 {
    ${(props) => props.theme.Body_400_14};
    padding-top: 0.125rem;
  }
`;

const TextBox = styled.div`
  ${FlexAttribute("row", "", "flex-start")}
  margin-top: .125rem;
  span {
    ${(props) => props.theme.Body_400_12}
    color: #999999;
    line-height: 1.125rem;
  }
`;

const ScrapButtonBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 1.5rem;
  height: 1.5rem;
  z-index: 10;
`;

const ScrapTrue = styled(ClippingFill)`
  path {
    fill: ${(props) => props.theme.color.primary_normal};
  }
`;

const ScrapFalse = styled(ClippingEmpty)`
  path {
    fill: ${(props) => props.theme.color.primary_normal};
  }
`;

export default Post;
