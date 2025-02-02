import RemoveProductIcon from "@/assets/icons/remove-product-icon.svg";
import { ConfirmDialog } from "primereact/confirmdialog";
import React, { useState } from "react";
import {CloseIcon} from "@/icons/CloseIcon";
import {CheckIcon} from "@/icons/CheckIcon";

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
            onClick={() => setShowCheckboxes(true)}
          >
            <img src={RemoveProductIcon.src} />
            <span>Eliminar</span>
          </button>
          <section
            className={`confirm-cancel-multiple-products-deletion-container ${showCheckboxes ? 'show' : 'hide'}`}
          >
            <button
              className="products-management-filters-bar-button btn-general-styles"
              onClick={() => setShowConfirmDialog(true)}
            >
              <CheckIcon color = {'#fff'}/>
              <span>Confirmar</span>
            </button>
            <button
              className="products-management-filters-bar-button btn-general-styles"
              onClick={() => {
                setShowCheckboxes(false);
                setSelectedProducts([]);
              }}
            >
              <CloseIcon/>
              <span>Cancelar</span>
            </button>
          </section>
        </div>
      </>
    );
  }
);

export default DeleteMultipleProductsButton;