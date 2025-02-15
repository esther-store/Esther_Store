import "./index.css";
import Search from "@/components/Search";
import React from "react";
import FiltersModal from "../FiltersModal";

const ProductsManagementFiltersBar = React.memo(
  function ProductsManagementFiltersBar({
    DeleteMultipleProductsButton,
    CreateProductButton,
    AddProductsToCategory,
    AddProductsToPromotion,
    RemoveProductsCategory,
    RemoveProductsPromotion
  }) {
    return (
      <section className="products-management-filters-bar">
        <div className="search-container">
          <Search />
        </div>

        <div className="filters-modal-button-container">
          <FiltersModal />
        </div>
        <div className="add-product-button-container">
          {CreateProductButton}
        </div>
        <div className = "delete-products-container">
          {DeleteMultipleProductsButton}
        </div>
        <div className = "add-products-to-category-button-container">
          {AddProductsToCategory}
        </div>
        <div className = "add-products-to-promotion-button-container">
          {AddProductsToPromotion}
        </div>
        <div className = "remove-products-category">
          {RemoveProductsCategory}
        </div>
        <div className = "remove-products-promotion">
          {RemoveProductsPromotion}
        </div>
      </section>
    );
  }
);

export default ProductsManagementFiltersBar;
