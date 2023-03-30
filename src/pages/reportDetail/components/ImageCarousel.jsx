import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import back from "../../../asset/backwhite.svg";
import ClippingEmpty from "../../../asset/Clippingwhite.jsx";
import ClippingFill from "../../../asset/profile/ClippingFill";

const ImageCarousel = ({ images, imageCarouselInfo }) => {
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
      <BackButton src={back} onClick={() => navigate(-1)} />
      {imageCarouselInfo.scrapState ? (
        <ScrapStateTrue onClick={imageCarouselInfo.scrapHandler} />
      ) : (
        <ScrapStateFalse onClick={imageCarouselInfo.scrapHandler} />
      )}
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
    width: 6px;
    height: 6px;
  }

  .slick-dots li button:before {
    color: white;
  }

  .slick-dots li.slick-active button:before {
    content: "";
    width: 23px;
    height: 8px;
    background-color: #666666;
    border-radius: 10px;
    margin-top: 5px;
  }
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 240px;
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
  height: 240px;
  object-fit: contain;
  backdrop-filter: blur(3px);
`;

const BackButton = styled.img`
  position: absolute;
  top: 40px;
  left: 27px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const ScrapStateTrue = styled(ClippingFill)`
  position: absolute;
  top: 40px;
  right: 27px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  path {
    fill: ${(props) => props.theme.color.white};
  }
`;

const ScrapStateFalse = styled(ClippingEmpty)`
  position: absolute;
  top: 40px;
  right: 27px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const PrevTo = styled.div`
  left: 10px;
  z-index: 10;
  visibility: hidden;
`;

const NextTo = styled.div`
  right: 10px;
  z-index: 10;
  visibility: hidden;
`;

export default ImageCarousel;
