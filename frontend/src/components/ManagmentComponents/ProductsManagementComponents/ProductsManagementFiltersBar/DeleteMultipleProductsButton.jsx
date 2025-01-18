import RemoveProductIcon from "@/assets/icons/remove-product-icon.svg";
import { ConfirmDialog } from "primereact/confirmdialog";
import React, { useState } from "react";

const DeleteMultipleProductsButton = React.memo(function DeleteMultipleProductsButton({selectedProducts, handleDeleteMultipleProducts}) {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    return ( 
        <>
        <ConfirmDialog
          visible={showConfirmDialog}
          onHide={() => setShowConfirmDialog(false)}
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
            onClick={() => setShowConfirmDialog(true)}
          >
            <img src={RemoveProductIcon.src} />
            <span>Eliminar</span>
          </button>
        </div>
        </>
     );
})

export default DeleteMultipleProductsButton;