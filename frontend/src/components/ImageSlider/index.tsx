import React, { useState, useRef } from "react";
import "./index.css";
import { debounce } from "@/utils/debounce";
import type { ProductIdType } from "@/Types";

type ImageType = {
  src: string;
  alt: string;
  id: any;
};

const ImageSlider = ({
  images,
  onImageClick = null,
}: {
  images: ImageType[];
  onImageClick?: (id: any) => void;
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const carouselRef = useRef(null);

  const handleScroll = () => {
    const scrollLeft = carouselRef.current.scrollLeft;
    const imageIndex = Math.round(scrollLeft / carouselRef.current.clientWidth);
    setCurrentImage(imageIndex);
  };
  const goToImage = (index: number) => {
    setCurrentImage(index);
    const scrollPosition = index * carouselRef.current.clientWidth;
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const processScrollChange = debounce(() => handleScroll(), 100);

  return (
    <div className="carousel-container">
      <div
        ref={carouselRef}
        className="pictures-details"
        onScroll={processScrollChange}
      >
        {images.map((image: ImageType) => (
          <img
            style={onImageClick ? { cursor: "pointer" } : null}
            src={image.src}
            key={image.id}
            alt={image.alt}
            onClick={() => {
              onImageClick ? onImageClick(image.id) : null;
            }}
          />
        ))}
      </div>

      <div className="selector">
        {images.map((_, index: number) => (
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
