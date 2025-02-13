import { TrashIcon } from "@/icons/TrashIcon";
import { ConfirmDialog } from "primereact/confirmdialog";
import React, { useState } from "react";
import { CloseIcon } from "@/icons/CloseIcon";
import { CheckIcon } from "@/icons/CheckIcon";
import "./index.css";

function PerformMultipleButton() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const performMultipleButton = ({
    buttonText = "Eliminar",
    Icon = <TrashIcon />,
    onPress = () => {},
  }) => (
    <button
      className="products-management-filters-bar-button btn-general-styles"
      onClick={onPress}
    >
      {Icon}
      <span>{buttonText}</span>
    </button>
  );

  const confirmMultiple = ({
    showConfirmButtons = false,
    onConfirm = () => {},
    onCancel = () => {},
  }) => (
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
        accept={onConfirm}
        style={{ maxWidth: "90%" }}
      />
      <section
        className={`confirm-cancel-multiple-products-deletion-container ${
          showConfirmButtons ? "show-buttons" : "hide-buttons"
        }`}
      >
        <button
          className="products-management-filters-bar-button btn-general-styles"
          onClick={() => setShowConfirmDialog(true)}
        >
          <CheckIcon color={"#fff"} />
          <span>Confirmar</span>
        </button>
        <button
          className="products-management-filters-bar-button btn-general-styles"
          onClick={onCancel}
        >
          <CloseIcon />
          <span>Cancelar</span>
        </button>
      </section>
    </>
  );
  return { confirmMultiple, performMultipleButton };
}

export default PerformMultipleButton;
