import "./index.css";
import AddToCartButton from "../Cart/AddToCartButton";
import { Carousel } from "primereact/carousel";
import { CompanyLogo } from "../NavBar/CompanyLogo";
import React from "react";

const ProductDetails= React.memo(function ProductDetails({ data }) {
  const imgData = [
    {
      img: data.product_img1,
    },
    {
      img: data.product_img2,
    },
    {
      img: data.product_img3,
    },
  ];

  const Header = () => {
    return (
      <div className="header-side-content">
        <img src={BMlogo.src} className="logo-header" />
        <div className="oferts-status">
          {data.promotion ? <img src={InOffertIcon.src} alt="En Oferta" /> : null}
        </div>
      </div>
    );
  };

  const productTemplate = (item) => {
    return (
      <div className="car-img-carrusel">
        <img className="img-card-carrusel" src={item.img} />
      </div>
    );
  };

  return null
})

export default ProductDetails;
