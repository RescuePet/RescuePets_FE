import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const Carousel = ({ images }) => {
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
          <div key={`carousel-image-${index}`}>
            <Image src={image} />
          </div>
        ))}
      </StyledSlider>
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
    content: "🐶";
  }
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const PrevTo = styled.div`
  left: 10px;
  z-index: -1;
`;

const NextTo = styled.div`
  right: 10px;
  z-index: -1;
`;

export default Carousel;
