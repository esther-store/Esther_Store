import "./index.css";
import InOffertIcon from "@/assets/icons/in-offert-icon.svg";
import AddToCartButton from "../Cart/AddToCartButton";
import { Carousel } from "primereact/carousel";
import BMlogo from "@/assets/BYM logo/B&M-LOGO.svg";
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

  return data ? (
    <section
      title="Detalles del producto"
      className="product-details-container"
    >
      <Header/>
        <section className="details-container">
          <div className="carrusel-sidebar content">
            <Carousel
              value={imgData}
              numVisible={1}
              numScroll={1}
              itemTemplate={productTemplate}
              className="carousel-detail"
            />
          </div>

          <div className="name-description-container padding-line">
            <div className="name-container">
              <p className="description">Nombre del producto</p>
              <p className="product-name">{data.product_name}</p>
            </div>
          </div>
          <div className="price-oferts-container padding-line">
            <div className="price-status">
              <span className="price-label">Precio:</span>
              {data.price_with_discounts? (
                <p className="card-text price product-detail-price-with-discount">
                  <span className="original-price">
                    ${data.precio.toFixed(2)}
                  </span>
                  <span className="new-price">
                    $
                    {data.price_with_discounts.toFixed(2)}
                  </span>
                </p>
              ) : (
                <p className="card-text price">${data.precio}</p>
              )}
            </div>
          </div>
          <div className="name-description-container padding-line">
            <div className="product-description-container">
              <p className="description">Descripción</p>
              <p className="product-description">{data.product_description}</p>
            </div>
          </div>
          <AddToCartButton
            product = {data}
          />
        </section>
    </section>
  ) : (
    <></>
  );
})

export default ProductDetails;
