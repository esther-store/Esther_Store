import React from "react";
import ProductsCartList from "@/components/Cart/ProductsCartList";
import ProductsCartGrid from "@/components/Cart/ProductsCartGrid";
import { Dialog } from "primereact/dialog";
import CartIcon from "@/assets/cart-icon.svg";
import "./index.css";

const CartContent = React.memo(function CartContext({
  show,
  setShow,
  mobileMode,
  cleanCart,
  productsCart,
  handleSendPedido,
  children
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
            {!mobileMode ? <ProductsCartList /> : <ProductsCartGrid />}
            <div className="cart-delivery-info-container">
              {children}
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
