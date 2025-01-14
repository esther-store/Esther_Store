import CartIcon from "../../assets/cart-icon.svg";
import CartContext from "../../context/cartContext";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useIsMobileMode } from "../../hooks/useIsMobileMode";
import {
  sendWhatsappMessage,
  prepareProductsCartToBeSentByWhatsapp,
} from "../../utils/sendWhatsappMessage";
import { useGetContactInfo } from "../../hooks/useGetContactInfo";
import "./index.css";
import CartContent from '@/components/Cart/CartContent'

const Cart = React.memo(function Cart() {
  const [showCartContent, setShowCartContent] = useState(false);
  const [listView, setListView] = useState(true);
  const { productsCart, cleanCart, calculateTotal } = useContext(CartContext);
  const { mobileMode } = useIsMobileMode({ mobileWidth: 950 });
  const { contactInfo } = useGetContactInfo();
  const deliveryInfoButtonRef = useRef(null);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: null,
    phone: null,
    address: null,
  });
  const [showErrorDeliveryInfo, setShowErrorDeliveryInfo] = useState(false);
  //effect to change the view type to grid or list depending of the mobileMode
  useEffect(() => {
    if (mobileMode) {
      setListView(false);
    } else {
      setListView(true);
    }
  }, [mobileMode]);

  //function to send the pedido
  function handleSendPedido() {
    if (productsCart.length > 0 && contactInfo !== null) {
      if (deliveryInfo.name==null || deliveryInfo.phone == null || deliveryInfo.address == null) {
        showErrorEmptyDeliveryInfo(true);
      } else {
        sendWhatsappMessage({
          phone: contactInfo.whatsapp,
          message: prepareProductsCartToBeSentByWhatsapp({
          productsCart: productsCart,
          total: calculateTotal().toFixed(2),
          deliveryInfo:deliveryInfo
          }),
        });
      }
    }
  }

  //focus the add delivery info button when the user try to send the order and the delivery info is empty
  function showErrorEmptyDeliveryInfo(){
    setShowErrorDeliveryInfo(true)
    if(deliveryInfoButtonRef !== null){
      deliveryInfoButtonRef.current.scrollIntoView({
        top:0,
        left:0,
        behavior:'smooth'
      })
    }
  }

  return (
    <section className="cart">
      <div className="show-cart-button-container">
        <button className="show-cart-button" onClick={() => setShowCartContent(true)}>
          <img alt="cart" src={CartIcon.src} />
          {productsCart.length > 0 ? (
            <span className="cart-products-cont">{productsCart.length}</span>
          ) : null}
        </button>
      </div>
      <CartContent 
        show={showCartContent} 
        setShow={setShowCartContent}
        listView = {listView}
        productsCart={productsCart}
        deliveryInfo={deliveryInfo}
        setDeliveryInfo={setDeliveryInfo}
        cleanCart={cleanCart}
        handleSendPedido={handleSendPedido}
        showErrorDeliveryInfo={showErrorDeliveryInfo}
        setShowErrorDeliveryInfo={setShowErrorDeliveryInfo}
        deliveryInfoButtonRef={deliveryInfoButtonRef}
        />
    </section>
  );
})

export default Cart;
