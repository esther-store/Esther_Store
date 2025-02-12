import AddProductIcon from "@/assets/icons/add-product-icon.svg";
import "./index.css";
import React from "react";

const ButtonsAddAndDelete = React.memo(function ButtonsAddAndDelete({
  setCategoryFormProperties,
  children
}) {

  return (
    <div className="buttons-add-delete-container">
      
      <div className="add-product-button-container">
        <button
          className="management-filters-bar-button btn-general-styles category-management-buttons"
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
        {children}
      </div>
    </div>
  );
});

export default ButtonsAddAndDelete;
