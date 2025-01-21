import RemoveProductIcon from "@/assets/icons/remove-product-icon.svg";
import { ConfirmDialog } from "primereact/confirmdialog";
import React, { useState } from "react";
import CloseIcon from "@/assets/icons/close-icon.svg"
import CheckIcon from "@/assets/icons/check-icon.svg"

const DeleteMultipleProductsButton = React.memo(
  function DeleteMultipleProductsButton({
    selectedProducts,
    setSelectedProducts,
    handleDeleteMultipleProducts,
    showCheckboxes,
    setShowCheckboxes,
  }) {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    return (
      <>
        <ConfirmDialog
          visible={showConfirmDialog}
          onHide={() => {
            setShowConfirmDialog(false);
          }}
          acceptClassName="p-button-danger"
          acceptLabel="Aceptar"
          rejectLabel="Cancelar"
          message="Deseas continuar con la operación?"
          header="Confirmación"
          icon="pi pi-exclamation-triangle"
          accept={() => handleDeleteMultipleProducts(selectedProducts)}
          style={{ maxWidth: "90%" }}
        />
        <div className="remove-product-button-container">
          <button
            className="products-management-filters-bar-button btn-general-styles"
            onClick={() => setShowCheckboxes(true)}>
            <img src={RemoveProductIcon.src} />
            <span>Eliminar</span>
          </button>
          <section
          style={{
            position: "fixed",
            left: "50%",
            bottom: "50px",
            transform: "translate(-50%)",
            zIndex: 1,
            display:showCheckboxes?'flex':'none',
            flexDirection:"row",
            gap:"10px"
          }}
          >
            <button
              className="products-management-filters-bar-button btn-general-styles"
              onClick={() => setShowConfirmDialog(true)}
            >
              <img src={CheckIcon.src} />
              <span>Confirmar</span>
            </button>
            <button
              className="products-management-filters-bar-button btn-general-styles"
              onClick={() => {
                setShowCheckboxes(false);
                setSelectedProducts([]);
              }}
            >
              <img src={CloseIcon.src} />
              <span>Cancelar</span>
            </button>
          </section>
        </div>
      </>
    );
  }
);

export default DeleteMultipleProductsButton;
