import React from "react";
import ProductsCartList from "@/components/Cart/ProductsCartList";
import ProductsCartGrid from "@/components/Cart/ProductsCartGrid";
import DeliveryInfo from "@/components/Cart/DeliveryInfo";
import { Dialog } from "primereact/dialog";
import CartIcon from "@/assets/cart-icon.svg";
import "./index.css";

const CartContent = React.memo(function CartContext({
  show,
  setShow,
  listView,
  cleanCart,
  productsCart,
  deliveryInfo,
  setDeliveryInfo,
  handleSendPedido,
  showErrorDeliveryInfo,
  setShowErrorDeliveryInfo,
  deliveryInfoButtonRef
}) {
  return (
    <Dialog
      visible={show}
      onHide={() => setShow(false)}
      position="top"
      draggable={false}
      resizable={false}
      style={{ width: "90vw", maxWidth: "850px" }}
      header={
        <div className="cart-title">
          <img alt="cart" src={CartIcon.src} />
          Carrito
        </div>
      }
      contentClassName="cart-modal-content"
    >
      {productsCart.length > 0 ? (
        <>
          <div className="table-grid-container">
            {listView ? <ProductsCartList /> : <ProductsCartGrid />}
            <div className="cart-delivery-info-container">
              <DeliveryInfo
                deliveryInfo={deliveryInfo}
                setDeliveryInfo={setDeliveryInfo}
                showErrorDeliveryInfo={showErrorDeliveryInfo}
                setShowErrorDeliveryInfo={setShowErrorDeliveryInfo}
                deliveryInfoButtonRef={deliveryInfoButtonRef}
              />
            </div>
          </div>
          <section className="cart-action-buttons">
            <button className="btn-general-styles" onClick={() => cleanCart()}>
              <i className="pi pi-trash"></i>
              Vaciar Carrito
            </button>
            <button
              className="btn-general-styles"
              onClick={() => setShow(false)}
            >
              <i className="pi pi-times"></i>
              Cancelar
            </button>
            <button
              className="btn-general-styles"
              onClick={() => handleSendPedido()}
            >
              <i className="pi pi-check"></i>
              Procesar Pedido
            </button>
          </section>
        </>
      ) : (
        <div className="empty-cart-message">Tu carrito esta vacio</div>
      )}
    </Dialog>
  );
})

export default CartContent;
