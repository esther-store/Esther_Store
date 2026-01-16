import { CartIcon } from "@/icons/CartIcon";
import CartContext from "@/context/cartContext";
import { Skeleton } from "primereact/skeleton";
import React, { useState, useContext, useRef, Suspense } from "react";
import {
  sendWhatsappMessage,
  prepareProductsCartToBeSentByWhatsapp,
} from "@/utils/sendWhatsappMessage";
import { useGetContactInfo } from "@/hooks/useGetContactInfo";
import "./index.css";
import CartContent from "@/components/Cart/CartContent";
const DeliveryInfo = React.lazy(() => import("@/components/Cart/DeliveryInfo"));
import { Dialog } from "primereact/dialog";
import type { DeliveryInfoType } from "@/Types";
import { getDeliveryInfoFromLocalStorage } from "@/utils/deliveryInfo";

const Cart = React.memo(function Cart() {
  const [showCartContent, setShowCartContent] = useState(false);
  const { productsCart, total } = useContext<any>(CartContext);
  const { contactInfo } = useGetContactInfo();
  const deliveryInfoButtonRef = useRef(null);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfoType>(getDeliveryInfoFromLocalStorage());
  const [showErrorDeliveryInfo, setShowErrorDeliveryInfo] = useState(false);

  //function to send the pedido
  function handleSendPedido() {
    if (productsCart.length > 0 && contactInfo != null) {
      if (
        deliveryInfo.name == null ||
        deliveryInfo.phone == null ||
        deliveryInfo.email == null ||
        deliveryInfo.address == null
      ) {
        showErrorEmptyDeliveryInfo();
      } else {
        const message = prepareProductsCartToBeSentByWhatsapp({
            productsCart: productsCart,
            total: total?.toFixed(2),
            deliveryInfo: deliveryInfo,
          })
        sendWhatsappMessage({
          phone: contactInfo.whatsapp,
          message: message
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
    <>
      <button
        className="show-cart-button"
        onClick={() => setShowCartContent(true)}
      >
        <CartIcon color="#d763aeff" width={30} height={30} />
        {productsCart.length > 0 ? (
          <span className="cart-products-cont">{productsCart.length}</span>
        ) : null}
      </button>
      <Dialog
        visible={showCartContent}
        onHide={() => setShowCartContent(false)}
        position="center"
        draggable={false}
        resizable={false}
        style={{ width: "95%", maxWidth: "500px" }}
        header={
          <div className="cart-title">
            <CartIcon color="#000" />
            Carrito
          </div>
        }
        headerStyle={{ padding:"1rem"}}
        contentClassName="cart-modal-content"
      >
        {productsCart.length > 0?
        <CartContent
          handleSendPedido={handleSendPedido}
          total={total}
        >
          <Suspense fallback={<Skeleton width="200px" height="40px" />}>
            <DeliveryInfo
              deliveryInfo={deliveryInfo}
              setDeliveryInfo={setDeliveryInfo}
              showErrorDeliveryInfo={showErrorDeliveryInfo}
              setShowErrorDeliveryInfo={setShowErrorDeliveryInfo}
              deliveryInfoButtonRef={deliveryInfoButtonRef}
            />
          </Suspense>
        </CartContent>
        : <div className="empty-cart-message">Tu carrito está vacio</div>
        }
      </Dialog>
    </>
  );
});

export default Cart;
