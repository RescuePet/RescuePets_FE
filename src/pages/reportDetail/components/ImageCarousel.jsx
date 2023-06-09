import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import ClippingEmpty from "../../../asset/Clippingwhite.jsx";
import ClippingFill from "../../../asset/profile/ClippingFill";
import Backwhite from "../../../asset/Backwhite";
import { ButtonBackgroundStyle } from "../../../style/Mixin.jsx";
import Hamburger from "../../../asset/Hamburger.jsx";

const ImageCarousel = ({ images, imageCarouselInfo, data }) => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevTo></PrevTo>,
    nextArrow: <NextTo></NextTo>,
    dotsClass: "slick-dots custom-dots",
  };
  return (
    <Container>
      <StyledSlider {...settings}>
        {images.map((image, index) => (
          <ImageWrapper
            key={`carousel-image-${index}`}
            imageUrl={image?.imageURL}
          >
            <Image src={image?.imageURL} />
          </ImageWrapper>
        ))}
      </StyledSlider>
      <BackButton onClick={() => navigate(-1)} />
      {imageCarouselInfo.scrapState ? (
        <ScrapStateTrue onClick={imageCarouselInfo.scrapHandler} />
      ) : (
        <ScrapStateFalse onClick={imageCarouselInfo.scrapHandler} />
      )}
      <EditButton onClick={data.handler} />
    </Container>
  );
};

const StyledSlider = styled(Slider)`
  .custom-dots {
    bottom: 0;
    background-color: transparent;
  }
  .custom-dots li {
    background-color: transparent;
  }
  .slick-dots li button {
    width: 0.375rem;
    height: 0.375rem;
  }

  .slick-dots li button:before {
    color: ${(props) => props.theme.color.white};
    opacity: 1;
  }

  .slick-dots li.slick-active button:before {
    content: "";
    width: 1.4375rem;
    height: 0.5rem;
    background-color: ${(props) => props.theme.color.primary_normal};
    border-radius: 0.625rem;
    margin-top: 0.3125rem;
  }
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 15rem;
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url(${(props) => props.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Image = styled.img`
  width: 100%;
  height: 15rem;
  object-fit: contain;
  backdrop-filter: blur(0.1875rem);
`;

const BackButton = styled(Backwhite)`
  position: absolute;
  top: 2.5rem;
  left: 1.6875rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  ${ButtonBackgroundStyle}
  path {
    fill: ${(props) => props.theme.color.primary_normal};
  }
`;

const ScrapStateTrue = styled(ClippingFill)`
  position: absolute;
  top: 2.5rem;
  right: 1.25rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  ${ButtonBackgroundStyle}
  path {
    fill: ${(props) => props.theme.color.primary_normal};
  }
`;

const ScrapStateFalse = styled(ClippingEmpty)`
  position: absolute;
  top: 2.5rem;
  right: 1.25rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  ${ButtonBackgroundStyle}
  path {
    fill: ${(props) => props.theme.color.primary_normal};
  }
`;
// 수정
const EditButton = styled(Hamburger)`
  position: absolute;
  top: 2.5rem;
  right: 3.4375rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  ${ButtonBackgroundStyle}
  path {
    fill: ${(props) => props.theme.color.primary_normal};
  }
`;

const PrevTo = styled.div`
  left: 0.625rem;
  z-index: 10;
  visibility: hidden;
`;

const NextTo = styled.div`
  right: 0.625rem;
  z-index: 10;
  visibility: hidden;
`;

export default ImageCarousel;
