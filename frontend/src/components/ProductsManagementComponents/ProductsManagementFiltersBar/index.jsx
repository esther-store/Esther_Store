import "./index.css";
import Search from "../../Search";
import CategoriesManagement from "../CategoriesManagement/index";
import ViewToggleGrid from "@/assets/icons/view-toggle-grid.svg";
import ViewToggleList from "@/assets/icons/view-toggle-list.svg";
import React, { useState } from "react";
import FiltersModal from "../FiltersModal";
import AddProductIcon from "@/assets/icons/add-product-icon.svg";
import RemoveProductIcon from "@/assets/icons/remove-product-icon.svg";
import { ConfirmDialog } from "primereact/confirmdialog";
import ProductForm from "../ProductForm";

function ProductsManagementFiltersBar({
  categories,
  loadingCategories,
  loadingProducts,
  selectedProducts,
  selectedCategories,
  setSelectedCategories,
  listView,
  setListView,
  handleDeleteMultipleProducts,
  resetProductFormProperties,
  setProductFormProperties,
  categoryFormProperties,
  setCategoryFormProperties,
  handleCreateCategory,
  handleUpdateCategory,
  handleDeleteCategory,
  handleDeleteMultipleCategories,
  productFormProperties,
  handleCreateProduct,
  handleUpdateProduct,
  promotions,
  loadingPromotions,
}) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  return (
    <section className="products-management-filters-bar">
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
      <div className="search-container">
        <Search />
      </div>
      <div className="categories-management-button-container">
        <CategoriesManagement
          loadingCategories={loadingCategories}
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          categoryFormProperties={categoryFormProperties}
          setCategoryFormProperties={setCategoryFormProperties}
          handleCreateCategory={handleCreateCategory}
          handleUpdateCategory={handleUpdateCategory}
          handleDeleteCategory={handleDeleteCategory}
          handleDeleteMultipleCategories={handleDeleteMultipleCategories}
        />
        <ProductForm
          productFormProperties={productFormProperties}
          resetProductFormProperties={resetProductFormProperties}
          handleCreateProduct={handleCreateProduct}
          handleUpdateProduct={handleUpdateProduct}
          categories={categories}
          promotions={promotions}
          loading={loadingProducts}
        />
      </div>
      <div className="view-toggle-container">
        <span>Vista:</span>
        <img
          src={listView ? ViewToggleGrid.src : ViewToggleList.src}
          onClick={() => setListView((prev) => !prev)}
        />
      </div>
      <div className="filters-modal-button-container">
        <FiltersModal
          categories={categories}
          loadingCategories={loadingCategories}
          promotions={promotions}
          loadingPromotions={loadingPromotions}
        />
      </div>
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
      <div className="remove-product-button-container">
        <button
          className="products-management-filters-bar-button btn-general-styles"
          onClick={() => setShowConfirmDialog(true)}
        >
          <img src={RemoveProductIcon.src} />
          <span>Eliminar</span>
        </button>
      </div>
    </section>
  );
}

export default ProductsManagementFiltersBar;
