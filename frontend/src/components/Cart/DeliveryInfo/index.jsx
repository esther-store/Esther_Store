import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useState } from "react";
import "./index.css";

const DeliveryInfo = React.memo(function DeliveryInfo({
  deliveryInfo,
  setDeliveryInfo,
  showErrorDeliveryInfo,
  setShowErrorDeliveryInfo,
  deliveryInfoButtonRef,
}) {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        ref={deliveryInfoButtonRef}
        className={`btn-general-styles cart-button-add-delivery-info ${
          showErrorDeliveryInfo ? "cart-delivery-info-error" : null
        }`}
        onClick={() => {
          setShowErrorDeliveryInfo(false);
          setShow(true);
        }}
      >
        <i className="pi pi-map-marker"></i>
        <span>Agregar Detalles de Envío</span>
      </button>
      <Dialog
        visible={show}
        onHide={() => setShow(false)}
        position="top"
        draggable={false}
        resizable={false}
        header="Detalles de Envío"
        style={{ width: "85%" }}
      >
        <form
          action=""
          className="cart-delivery-info-form"
          onSubmit={(e) => {
            e.preventDefault();
            setDeliveryInfo((prev) => ({
              ...prev,
              name: e.target["name"].value,
              phone: e.target["phone"].value,
              address: e.target["address"].value,
            }));
            setShow(false);
          }}
        >
          <span className="p-float-label">
            <InputText
              id="name"
              defaultValue={deliveryInfo.name}
              required={true}
            />
            <label htmlFor="phone">Nombre</label>
          </span>
          <span className="p-float-label">
            <InputText
              id="phone"
              defaultValue={deliveryInfo.phone}
              required={true}
            />
            <label htmlFor="phone">Teléfono</label>
          </span>
          <span className="p-float-label">
            <InputTextarea
              id="address"
              defaultValue={deliveryInfo.address}
              required={true}
            />
            <label htmlFor="address">Dirección</label>
          </span>
          <button className="btn-general-styles save-btn" type="submit">
            Guardar
          </button>
        </form>
      </Dialog>
    </>
  );
});

export default DeliveryInfo;
