import {TrashIcon} from "@/icons/TrashIcon";
import { ConfirmDialog } from "primereact/confirmdialog";
import React, { useState } from "react";
import {CloseIcon} from "@/icons/CloseIcon";
import {CheckIcon} from "@/icons/CheckIcon";
import './index.css'

const DeleteMultipleElementsButton = React.memo(
  function DeleteMultipleProductsButton({
    selectedItems,
    setSelectedItems,
    handleDeleteMultiple,
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
          accept={() => handleDeleteMultiple(selectedItems)}
          style={{ maxWidth: "90%" }}
        />
        <div className="remove-product-button-container">
          <button
            className="products-management-filters-bar-button btn-general-styles"
            onClick={() => setShowCheckboxes(true)}
          >
            <TrashIcon/>
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
                setSelectedItems([]);
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

export default DeleteMultipleElementsButton;