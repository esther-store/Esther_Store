import AddProductIcon from "@/assets/icons/add-product-icon.svg";
import React from "react";

const CreateProductButton = React.memo(function CreateProductButton({setProductFormProperties}) {
  return (
    <div className="add-product-button-container">
      <button
        className="products-management-filters-bar-button btn-general-styles"
        onClick={() =>
          setProductFormProperties((prev) => ({ ...prev, show: true }))
        }
      >
        <img src={AddProductIcon.src} />
        <span>Agregar</span>
      </button>
    </div>
  );
})

export default CreateProductButton;
