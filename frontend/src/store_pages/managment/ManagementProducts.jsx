import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  Suspense,
  useCallback,
} from "react";
import "@/store_pages/pagesStyles/ProductsManagement.css";
import "primeicons/primeicons.css";
import ProductsManagementFiltersBar from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar";
import QueryFiltersContext from "@/context/filtersContext";
import { useManageProducts } from "@/hooks/useManageProducts";
import Paginator from "@/components/Paginator";
import { Toast } from "primereact/toast";
import {
  getInitialValues,
  createProductInitialValues,
} from "@/utils/productInitialValues";
import { useIsMobileMode } from "@/hooks/useIsMobileMode";
import ActiveFilters from "@/components/ActiveFilters";
import RetryQueryComponent from "@/components/RetryQueryComponent";
import Loader from "@/components/Loader";
import CreateProductButton from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar/CreateProductButton";
import ViewToggle from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar/ViewToggle";
import ProductForm from "@/components/ManagmentComponents/ProductsManagementComponents/ProductForm";
import { ManagementProductsPageHeader } from "@/components/ManagmentComponents/ProductsManagementComponents/ManagmentProductsPageHeader";
import DeleteMultipleProductsButton from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar/DeleteMultipleProductsButton";

const ProductList = React.lazy(() =>
  import(
    "@/components/ManagmentComponents/ProductsManagementComponents/ProductList"
  )
);
const ProductsGrid = React.lazy(() =>
  import(
    "@/components/ManagmentComponents/ProductsManagementComponents/ProductsGrid/index"
  )
);

function ManagementProducts() {
  const toast = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [listView, setListView] = useState(true);
  const { mobileMode } = useIsMobileMode({ mobileWidth: 840 });
  const {
    searchParams,
    removeFilter,
    setFilter,
    getActiveFilter,
    removeAllFilters,
  } = useContext(QueryFiltersContext);

  //product form properties state
  const [productFormProperties, setProductFormProperties] = useState({
    show: false,
    disabled: false,
    creatingMode: true,
    initialValues: getInitialValues(),
  });

  //function to reset the product Form Properties
  const resetProductFormProperties = useCallback(
    function resetProductFormProperties() {
      setProductFormProperties((prev) => ({
        ...prev,
        show: false,
        creatingMode: true,
        disabled: false,
        initialValues: getInitialValues(),
      }));
    }
  );

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
    searchParams: searchParams,
    toastRef: toast,
    setSelectedProducts: setSelectedProducts,
    resetProductFormProperties: resetProductFormProperties,
    removeAllFilters: removeAllFilters,
  });

  const processUpdateProduct = useCallback(function processUpdateProduct(
    product
  ) {
    setProductFormProperties((prev) => ({
      ...prev,
      show: true,
      creatingMode: false,
      disabled: false,
      initialValues: createProductInitialValues({ product: product }),
    }));
  });

  const processDetailProduct = useCallback(function processDetailProduct(
    product
  ) {
    setProductFormProperties((prev) => ({
      ...prev,
      show: true,
      creatingMode: false,
      disabled: true,
      initialValues: createProductInitialValues({ product: product }),
    }));
  });

  //effect to change the view type to grid or list depending of the mobileMode
  useEffect(() => {
    if (mobileMode) {
      setListView(false);
    } else {
      setListView(true);
    }
  }, [mobileMode]);

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
            ViewToggle={
              <ViewToggle listView={listView} setListView={setListView} />
            }
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
          {listView ? (
            <Suspense
              fallback={
                <section
                  style={{
                    minHeight: "60vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Loader />
                </section>
              }
            >
              <ProductList
                products={products}
                loading={loadingProducts}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                handleDeleteProduct={handleDeleteProduct}
                processDetailProduct={processDetailProduct}
                processUpdateProduct={processUpdateProduct}
              />
            </Suspense>
          ) : (
            <Suspense
              fallback={
                <section
                  style={{
                    minHeight: "60vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Loader />
                </section>
              }
            >
              <ProductsGrid
                products={products}
                loading={loadingProducts}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                handleDeleteProduct={handleDeleteProduct}
                processDetailProduct={processDetailProduct}
                processUpdateProduct={processUpdateProduct}
              />
            </Suspense>
          )}
          <Paginator
            count={numOfProducts}
            itemsLength={products.length}
            getActiveFilter={getActiveFilter}
            setFilter={setFilter}
            removeFilter={removeFilter}
          />
        </>
      )}
    </section>
  );
}

export default ManagementProducts;
