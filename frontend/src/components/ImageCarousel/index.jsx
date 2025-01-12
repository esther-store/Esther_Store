import React, { useState,useRef } from 'react';
import './index.css';
import useWindowSize from '../../hooks/useWindowSize';

const ImageCarousel = ({images}) => {
  const responsive = useWindowSize("max",600)
  const [currentImage, setCurrentImage] = useState(0);
  const carouselRef = useRef(null);

  const handleScroll = () => {
    const scrollLeft = carouselRef.current.scrollLeft;
    const imageIndex = Math.round(scrollLeft / 250);
    setCurrentImage(imageIndex);
  };

  const goToImage = (index) => {
    setCurrentImage(index);
    const scrollPosition = index * 250;
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='carousel-container'>
      <div ref={carouselRef} className={responsive?'pictures-details add-scroll-x':"pictures-details"} onScroll={handleScroll}>
        {
            images.map((image, index) =>
                <img src = {image} key = {index} alt = {`img ${index}`}
                />
            )
        }
      </div>  
      
      <div className='selector'>
        {
            images.map((_, index) => (
            <div
                className= {currentImage==index?'button-selected active-button-carousel':"button-selected"}
                key={index}
                onClick={() => goToImage(index)}
            ></div>
            ))
        }
      </div>
    </div>
  );
};

export default ImageCarousel;
