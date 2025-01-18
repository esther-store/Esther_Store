import "./index.css";
import Search from "@/components/Search";
import React from "react";
import FiltersModal from "../FiltersModal";

const ProductsManagementFiltersBar = React.memo(
  function ProductsManagementFiltersBar({
    DeleteMultipleProductsButton,
    CreateProductButton
  }) {
    return (
      <section className="products-management-filters-bar">
        
        <div className="search-container">
          <Search />
        </div>

        <div className="filters-modal-button-container">
          <FiltersModal />
        </div>

        {CreateProductButton}

        {DeleteMultipleProductsButton}
        
      </section>
    );
  }
);

export default ProductsManagementFiltersBar;
