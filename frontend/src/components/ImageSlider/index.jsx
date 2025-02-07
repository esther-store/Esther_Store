import React, { useState, useRef } from "react";
import "./index.css";
import { debounce } from "@/utils/debounce";

const ImageSlider = ({ images, imagesWidth }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const carouselRef = useRef(null);

  const handleScroll = () => {
    const scrollLeft = carouselRef.current.scrollLeft;
    const imageIndex = Math.round(scrollLeft / carouselRef.current.clientWidth);
    setCurrentImage(imageIndex);
  };
  const goToImage = (index) => {
    setCurrentImage(index);
    const scrollPosition = index * carouselRef.current.clientWidth;
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const processScrollChange = debounce(() => handleScroll(), 100)

  return (
    <div className="carousel-container">
      <div
        ref={carouselRef}
        className="pictures-details"
        onScroll={processScrollChange}
      >
        {images.map((image) => (
          <img src={image.src} key={image.alt} alt={image.alt} />
        ))}
      </div>

      <div className="selector">
        {images.map((_, index) => (
          <div
            className={
              currentImage === index
                ? "button-selected active-button-carousel"
                : "button-selected"
            }
            key={index}
            onClick={() => goToImage(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
