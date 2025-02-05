import { useNavigateItems } from "@/customHooks/useNavigateItems";
import { useRef, useState } from "react";
import ZoomImage from "../ZoomImage";
import "./index.css";

function ImagesSlider({ images, imagesMaxWidth = 600 }) {
  const scrollRef = useRef();
  const { contador, updateCont, processScrollChange } = useNavigateItems(scrollRef);
  const [imageToZoom, setImageToZoom] = useState(null);

  return (
    <div className="slider-container">
      <ZoomImage imageToZoom={imageToZoom} setImageToZoom={setImageToZoom}/>
      <div
        className="images-container"
        style={{ maxWidth: `${imagesMaxWidth}px` }}
        ref={scrollRef}
        onScroll={processScrollChange}
      >
        {images.map((img) => (
          <img
            key={img}
            alt="Software Project Image"
            src={img}
            onClick={(e) => setImageToZoom(e.target)}
            width={600} height={350}
          />
        ))}
      </div>
      <div className="images-navigator">
        {images.map((img, index) => (
          <div
            key={index + "point"}
            className={
              contador === index
                ? "images-navigator-point point-active"
                : "images-navigator-point"
            }
            onClick={() => updateCont(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default ImagesSlider;
