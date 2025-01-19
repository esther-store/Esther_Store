import React, { useState, useRef } from "react";
import "@/store_pages/pagesStyles/ProductsManagement.css";
import "primeicons/primeicons.css";
import ProductsManagementFiltersBar from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar";
import { useManageProducts } from "@/hooks/useManageProducts";
import Paginator from "@/components/Paginator";
import { useProductFormProperties } from "@/hooks/useProductFormProperties";
import { Toast } from "primereact/toast";
import ActiveFilters from "@/components/ActiveFilters";
import RetryQueryComponent from "@/components/RetryQueryComponent";
import CreateProductButton from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar/CreateProductButton";
import ProductForm from "@/components/ManagmentComponents/ProductsManagementComponents/ProductForm";
import { ManagementProductsPageHeader } from "@/components/ManagmentComponents/ProductsManagementComponents/ManagmentProductsPageHeader";
import DeleteMultipleProductsButton from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar/DeleteMultipleProductsButton";

const ProductsGrid = React.lazy(() =>
  import(
    "@/components/ManagmentComponents/ProductsManagementComponents/ProductsGrid/index"
  )
);

function ManagementProducts() {
  const toast = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
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
  } = useManageProducts({
    toastRef: toast,
    setSelectedProducts: setSelectedProducts,
    resetProductFormProperties: resetProductFormProperties,
  });

  return (
    <section className="products-management-page">
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
          <ProductsManagementFiltersBar
            CreateProductButton={
              <CreateProductButton
                setProductFormProperties={setProductFormProperties}
              />
            }
            DeleteMultipleProductsButton={
              <DeleteMultipleProductsButton
                handleDeleteMultipleProducts={handleDeleteProduct}
                selectedProducts={selectedProducts}
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
            setSelectedProducts={setSelectedProducts}
            handleDeleteProduct={handleDeleteProduct}
            processDetailProduct={processDetailProduct}
            processUpdateProduct={processUpdateProduct}
          />
          <Paginator count={numOfProducts} itemsLength={products.length} />
        </>
      )}
    </section>
  );
}

export default ManagementProducts;
