import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import { debounce } from "@/utils/debounce";

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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const imageIndex = Math.round(
      scrollLeft / carouselRef.current.clientWidth
    );
    setCurrentImage(imageIndex);
  };

  const goToImage = (index: number) => {
    if (!carouselRef.current) return;
    setCurrentImage(index);
    const scrollPosition = index * carouselRef.current.clientWidth;

    carouselRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  };

  const processScrollChange = debounce(() => handleScroll(), 100);

  // 🔹 Cerrar modal con ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPreviewImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="carousel-container">
      <div
        ref={carouselRef}
        className="pictures-details"
        onScroll={processScrollChange}
      >
        {images.map((image: ImageType) => {
          const imageSrc =
            image.src;

          return (
            <img
              key={image.id}
              src={imageSrc}
              alt={image.alt}
              style={{ cursor: "pointer" }}
              onClick={() => {
                onImageClick ? onImageClick(image.id) : setPreviewImage(imageSrc);
              }}
            />
          );
        })}
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

      {/* 🔥 MODAL DE IMAGEN */}
      {previewImage && (
        <div
          className="image-modal"
          onClick={() => setPreviewImage(null)}
        >
          {/* ❌ Botón cerrar */}
          <button
            className="image-modal-close"
            onClick={() => setPreviewImage(null)}
            aria-label="Cerrar imagen"
          >
            ✕
          </button>

          <img
            src={previewImage}
            alt="Vista ampliada"
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
