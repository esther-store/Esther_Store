import React, { useState, useRef } from "react";
import "@/store_pages/pagesStyles/ProductsManagement.css";
import "primeicons/primeicons.css";
import ProductsManagementFiltersBar from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar";
import { useManageProducts } from "@/hooks/managementHooks/useManageProducts";
import Paginator from "@/components/StorePageComponents/Paginator";
import { useProductFormProperties } from "@/hooks/managementHooks/useProductFormProperties";
import { Toast } from "primereact/toast";
import ActiveFilters from "@/components/StorePageComponents/ActiveFilters";
import RetryQueryComponent from "@/components/RetryQueryComponent";
import CreateProductButton from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar/CreateProductButton";
import ProductForm from "@/components/ManagmentComponents/ProductsManagementComponents/ProductForm";
import { ManagementProductsPageHeader } from "@/components/ManagmentComponents/ProductsManagementComponents/ManagmentProductsPageHeader";
import PerformMultipleButton from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar/PerformMultipleButton";
import ProductsGrid from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsGrid/index";
import { RemovePageLoader } from "@/components/RemovePageLoader";
import { productsToManagePageSize } from "@/constants";
import { AddProductsToCategory } from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar/AddProductsToCategory";
import { AddProductsToPromotion } from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar/AddProductsToPromotion";
import { RemoveProductsCategory } from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar/RemoveProductsCategory";
import { RemoveProductsPromotion } from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar/RemoveProductsPromotion";

function ManagementProducts() {
  const toast = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const {
    confirmMultiple: confirmMultipleProductDeletion,
    performMultipleButton: deleteMultipleProducts,
  } = PerformMultipleButton();

  const {
    productFormProperties,
    setProductFormProperties,
    resetProductFormProperties,
    processDetailProduct,
    processUpdateProduct,
  } = useProductFormProperties();

  //products management hook
  const {
    products,
    loadingProducts,
    numOfProducts,
    errorGettingProducts,
    handleDeleteProduct,
    refetchProducts,
    handleUpdateProduct,
    handleCreateProduct,
    handleQuitProductsCategory,
    handleQuitProductsPromotion,
  } = useManageProducts({
    toastRef: toast,
    setSelectedProducts: setSelectedProducts,
    resetProductFormProperties: resetProductFormProperties,
  });

  return (
    <section className="products-management-page">
      <meta name="robots" content="noindex"></meta>
      <RemovePageLoader />
      <Toast ref={toast} position="bottom-center" />
      <ManagementProductsPageHeader />
      {errorGettingProducts ? (
        <section
          style={{
            minHeight: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RetryQueryComponent
            message="Error obteniendo los productos. Revisa tu conexión a internet"
            refetch={refetchProducts}
          />
        </section>
      ) : (
        <>
          {confirmMultipleProductDeletion({
            onCancel: () => {
              setShowCheckboxes(false);
              setSelectedProducts([]);
            },
            onConfirm: () => {
              setShowCheckboxes(false);
              handleDeleteProduct(selectedProducts);
            },
          })}

          <ProductsManagementFiltersBar
            CreateProductButton={
              <CreateProductButton
                setProductFormProperties={setProductFormProperties}
              />
            }
            AddProductsToCategory={
              <AddProductsToCategory
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                showCheckboxes={showCheckboxes}
                setShowCheckboxes={setShowCheckboxes}
                toastRef={toast}
              />
            }
            AddProductsToPromotion={
              <AddProductsToPromotion
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                showCheckboxes={showCheckboxes}
                setShowCheckboxes={setShowCheckboxes}
                toastRef={toast}
              />
            }
            DeleteMultipleProductsButton={deleteMultipleProducts({
              onPress: () => {
                if (showCheckboxes) {
                  return otherActiveActionError();
                }
                setShowCheckboxes(true);
              },
            })}
            RemoveProductsCategory={
              <RemoveProductsCategory
                showCheckboxes={showCheckboxes}
                setShowCheckboxes={setShowCheckboxes}
                selectedProducts={selectedProducts}
                handleQuitProductsCategory={handleQuitProductsCategory}
                setSelectedProducts={setSelectedProducts}
                toast={toast}
              />
            }
            RemoveProductsPromotion={
              <RemoveProductsPromotion
                showCheckboxes={showCheckboxes}
                setShowCheckboxes={setShowCheckboxes}
                setSelectedProducts={setSelectedProducts}
                toast={toast}
                selectedProducts={selectedProducts}
                handleQuitProductsPromotion={handleQuitProductsPromotion}
              />
            }
          />
          <ProductForm
            productFormProperties={productFormProperties}
            resetProductFormProperties={resetProductFormProperties}
            handleCreateProduct={handleCreateProduct}
            handleUpdateProduct={handleUpdateProduct}
            loading={loadingProducts}
          />
          <div className="products-management-page-active-filter-component-container">
            <ActiveFilters />
          </div>
          <ProductsGrid
            products={products}
            loading={loadingProducts}
            selectedProducts={selectedProducts}
            showCheckboxes={showCheckboxes}
            setSelectedProducts={setSelectedProducts}
            handleDeleteProduct={handleDeleteProduct}
            processDetailProduct={processDetailProduct}
            processUpdateProduct={processUpdateProduct}
          />
          <Paginator
            count={numOfProducts}
            itemsLength={products.length}
            pageSize={productsToManagePageSize}
          />
        </>
      )}
    </section>
  );
}

export default ManagementProducts;
