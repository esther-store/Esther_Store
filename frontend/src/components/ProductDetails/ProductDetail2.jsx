import "./PDindex.css";
import { Sidebar } from "primereact/sidebar";
import useWindowSize from "../../hooks/useWindowSize";
import { applyDiscount } from "../../utils/applyDiscount";
import InOffertIcon from "../../assets/in-offert-icon.svg";
import CartButton from "./CartButton";
import { Carousel } from "primereact/carousel";
import Cart from "../Cart";
import BMlogo from "../../assets/BYM logo/B&M-LOGO.svg";
import React from "react";

const ProductDetails2 = React.memo(function ProductDetails2({ active, data, onHide }) {
  const responsive = useWindowSize("max", 600);

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

  const headerSide = () => {
    return (
      <div className="header-side-content">
        <button
          onClick={onHide}
          className={
            responsive
              ? active
                ? "close-button-responsive open"
                : "close-button-responsive closed"
              : active
              ? "close-button open"
              : "close-button closed"
          }
        >
          <i className="pi pi-chevron-right"></i>
        </button>
          <img src={BMlogo.src} className="logo-header" />

        <div className="oferts-status">
          <Cart />
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
      <Sidebar
        className="sidebar-products-details"
        visible={active}
        onHide={() => {
          return;
        }}
        position="right"
        style={{ width: responsive ? "100%" : "350px" }}
        showCloseIcon={false}
        maskStyle={{ color: "red" }}
        maskClassName="sidebar-2"
        header={headerSide}
      >
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
              {data.promotion || data.descuento > 0 ? (
                <p className="card-text price product-detail-price-with-discount">
                  <span className="original-price">
                    ${data.precio.toFixed(2)}
                  </span>
                  <span className="new-price">
                    $
                    {applyDiscount({
                      price: data.precio,
                      promotionDiscountInPercent: data.promotion_full_info?.discount_in_percent,
                      discount: data.descuento,
                    }).toFixed(2)}
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
          <CartButton
            key={data.id}
            id={data.id}
            product_name={data.product_name}
            precio={data.precio}
            descuento={data.descuento}
            promotion={data.promotion}
            product_img1={data.product_img1}
            promotion_full_info={data.promotion_full_info}
          />
        </section>
      </Sidebar>
    </section>
  ) : (
    <></>
  );
})

export default ProductDetails2;
