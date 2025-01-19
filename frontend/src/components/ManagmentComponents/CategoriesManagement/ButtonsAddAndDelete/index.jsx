import AddProductIcon from "@/assets/icons/add-product-icon.svg";
import RemoveProductIcon from "@/assets/icons/remove-product-icon.svg";
import React, { useState } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import "./index.css";

const ButtonsAddAndDelete = React.memo(function ButtonsAddAndDelete({
  setCategoryFormProperties,
  handleDeleteMultipleCategories,
  selectedCategories
}) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  return (
    <div className="buttons-add-delete-container">
      <ConfirmDialog
        visible={showConfirmDialog}
        onHide={() => setShowConfirmDialog(false)}
        acceptClassName="p-button-danger"
        acceptLabel="Aceptar"
        rejectLabel="Cancelar"
        message="Deseas continuar con la operación?"
        header="Confirmación"
        icon="pi pi-exclamation-triangle"
        accept={() => handleDeleteMultipleCategories(selectedCategories)}
        style={{ maxWidth: "90%" }}
      />
      <div className="add-product-button-container">
        <button
          className="products-management-filters-bar-button btn-general-styles category-management-buttons"
          onClick={() => {
            setCategoryFormProperties((prev) => ({
              ...prev,
              show: true,
              creatingMode: true,
            }));
          }}
        >
          <img src={AddProductIcon.src} />
          <span>Agregar</span>
        </button>
      </div>
      <div className="remove-product-button-container">
        <button
          className="products-management-filters-bar-button btn-general-styles category-management-buttons"
          onClick={() => setShowConfirmDialog(true)}
        >
          <img src={RemoveProductIcon.src} />
          <span>Eliminar</span>
        </button>
      </div>
    </div>
  );
});

export default ButtonsAddAndDelete;
