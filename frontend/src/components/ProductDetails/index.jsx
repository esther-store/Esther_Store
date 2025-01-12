import "./index.css";
import { Sidebar } from "primereact/sidebar";
import useWindowSize from "../../hooks/useWindowSize";
import ImageCarousel from "../ImageCarousel";
import { applyDiscount } from "../../utils/applyDiscount";
import InOffertIcon from "../../assets/in-offert-icon.svg";
import CartButton from "./CartButton";

const style = {
  backdropFilter: "blur(1px)",
  backgroundColor: "transparent !important",
  zIndex: "9 !important",
  position: "relative",
};



function ProductDetails({ active, data, onHide }) {
  const responsive = useWindowSize("max", 600);

  const imgData ={};
  
  return (
    data?
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
        style={{ width: responsive ? "100%" : "450px" }}
        showCloseIcon={false}
        maskStyle={{ color: "red" }}
        maskClassName="sidebar-2"
      >
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
        <section className="details-container">
          <div className="carousel">
            <ImageCarousel
              images={[
                data.product_img1,
                data.product_img2,
                data.product_img3,
              ]}
            />
          </div>
          <div className="name-description-container">
            <div className="name-container">
              <p className="description">Nombre del producto</p>
              <p className="product-name">{data.product_name}</p>
            </div>
          </div>
          <div className="price-oferts-container">
            {data.promotion ? (
              <div className="oferts-status">
                <img src={InOffertIcon.src} alt="En Oferta" />
              </div>
            ) : null}
            <div className="price-status">
              {data.promotion || data.descuento > 0 ? (
                <p className="card-text price product-detail-price-with-discount">
                  <span className="original-price">
                    ${data.precio.toFixed(2)}
                  </span>
                  <span className="new-price">
                    $
                    {applyDiscount({
                      price: data.precio,
                      promotion: data.promotion_full_info,
                      discount: data.descuento,
                    }).toFixed(2)}
                  </span>
                </p>
              ) : (
                <p className="card-text price">${data.precio}</p>
              )}
            </div>
          </div>
          <div className="name-description-container">
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
    </section>: <></>
  );
}

export default ProductDetails;
