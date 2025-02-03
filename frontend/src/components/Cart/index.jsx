import {CartIcon} from "@/icons/CartIcon";
import CartContext from "@/context/cartContext";
import React, { useState, useContext, useRef } from "react";
import { useIsMobileMode } from "@/hooks/useIsMobileMode";
import {
  sendWhatsappMessage,
  prepareProductsCartToBeSentByWhatsapp,
} from "@/utils/sendWhatsappMessage";
import { useGetContactInfo } from "@/hooks/useGetContactInfo";
import "./index.css";
import CartContent from "@/components/Cart/CartContent";
import DeliveryInfo from "@/components/Cart/DeliveryInfo";

const Cart = React.memo(function Cart() {
  const [showCartContent, setShowCartContent] = useState(false);
  const { productsCart, cleanCart, total } = useContext(CartContext);
  const { mobileMode } = useIsMobileMode({ mobileWidth: 950 });
  const { contactInfo } = useGetContactInfo();
  const deliveryInfoButtonRef = useRef(null);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: null,
    phone: null,
    address: null,
  });
  const [showErrorDeliveryInfo, setShowErrorDeliveryInfo] = useState(false);

  //function to send the pedido
  function handleSendPedido() {
    if (productsCart.length > 0 && contactInfo !== null) {
      if (
        deliveryInfo.name == null ||
        deliveryInfo.phone == null ||
        deliveryInfo.address == null
      ) {
        showErrorEmptyDeliveryInfo(true);
      } else {
        sendWhatsappMessage({
          phone: contactInfo.whatsapp,
          message: prepareProductsCartToBeSentByWhatsapp({
            productsCart: productsCart,
            total: total.toFixed(2),
            deliveryInfo: deliveryInfo,
          }),
        });
      }
    }
  }

  //focus the add delivery info button when the user try to send the order and the delivery info is empty
  function showErrorEmptyDeliveryInfo() {
    setShowErrorDeliveryInfo(true);
    if (deliveryInfoButtonRef !== null) {
      deliveryInfoButtonRef.current.scrollIntoView({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }

  return (
    <section className="cart">
      <div className="show-cart-button-container">
        <button
          className="show-cart-button"
          onClick={() => setShowCartContent(true)}
        >
          <CartIcon color = "#D9658F" width={30} height={30}/>
          {productsCart.length > 0 ? (
            <span className="cart-products-cont">{productsCart.length}</span>
          ) : null}
        </button>
      </div>
      <CartContent
        show={showCartContent}
        setShow={setShowCartContent}
        mobileMode={mobileMode}
        productsCart={productsCart}
        cleanCart={cleanCart}
        handleSendPedido={handleSendPedido}
      >
        <DeliveryInfo
          deliveryInfo={deliveryInfo}
          setDeliveryInfo={setDeliveryInfo}
          showErrorDeliveryInfo={showErrorDeliveryInfo}
          setShowErrorDeliveryInfo={setShowErrorDeliveryInfo}
          deliveryInfoButtonRef={deliveryInfoButtonRef}
        />
      </CartContent>
    </section>
  );
});

export default Cart;
