import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";

import { InputTextarea } from "primereact/inputtextarea";
import React, { useState, useEffect, useRef } from "react";
import "./index.css";

import { redirect } from "react-router-dom";

function SubjectRequest(MailBM) {
  const [show, setShow] = useState(false);
  const deliveryInfoButtonRef = useRef(null);
  const [info, setInfo] = useState({
    phone: "",
    text: "",
  });

  return (
    <>
      <button
        ref={deliveryInfoButtonRef}
        className={"btn-general"}
        onClick={() => {
          setShow(true);
        }}
      >
        <i className="pi pi-send"></i>
        <span>Enviar</span>
      </button>

      <Dialog
        visible={show}
        onHide={() => setShow(false)}
        position="top"
        draggable={false}
        resizable={false}
        header="Registro de queja"
        style={{ width: "85%" }}
      >
        <form
          
          className="cart-delivery-info-form"
          onSubmit={(e) => {
            e.preventDefault();
            setShow(false);
          }}
        >
          <span className="p-float-label">

            <InputMask
              id="phone"
              mask="(+99) 99-999999"
              placeholder=""
              defaultValue={""}
              required={false}
              onChange={(e) => {
                setInfo((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }));
              }}
            ></InputMask>

            <label htmlFor="phone">Teléfono</label>
          </span>
          <span className="p-float-label">
            <InputTextarea
              id="subject"
              defaultValue={""}
              required={true}
              onChange={(e) => {
                setInfo((prev) => ({
                  ...prev,
                  text: e.target.value,
                }));
              }}
            />
            <label htmlFor="address">Queja</label>
          </span>

          <a
            type="submit"
            className="btn-general save-btn-subject"
            
            href={`mailto:${MailBM.MailBM}?subject=${String(info.phone)}&body=${
              info.text
            }`}
            
          >
            <i className="pi pi-send"></i>
            Enviar
          </a>
        </form>
      </Dialog>
    </>
  );
}

export default SubjectRequest;
