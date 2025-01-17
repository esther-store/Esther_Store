import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  Suspense,
} from "react";
import "@/store_pages/pagesStyles/ProductsManagement.css";
import "primeicons/primeicons.css";
import BackArrow from "@/assets/icons/products-management-back-icon.svg";
import ProductsManagementFiltersBar from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar";
import QueryFiltersContext from "@/context/filtersContext";
import { useManageProducts } from "@/hooks/useManageProducts";
import Paginator from "@/components/Paginator";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import {
  getInitialValues,
  createProductInitialValues,
} from "@/utils/productInitialValues";
import { useIsMobileMode } from "@/hooks/useIsMobileMode";
import ActiveFilters from "@/components/ActiveFilters";
import RetryQueryComponent from "@/components/RetryQueryComponent";
import Loader from "@/components/Loader";
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
  const navigate = useNavigate();

  //product form properties state
  const [productFormProperties, setProductFormProperties] = useState({
    show: false,
    disabled: false,
    creatingMode: true,
    initialValues: getInitialValues(),
  });

  //function to reset the product Form Properties
  function resetProductFormProperties() {
    setProductFormProperties((prev) => ({
      ...prev,
      show: false,
      creatingMode: true,
      disabled: false,
      initialValues: getInitialValues(),
    }));
  }

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

  function processUpdateProduct(product) {
    setProductFormProperties((prev) => ({
      ...prev,
      show: true,
      creatingMode: false,
      disabled: false,
      initialValues: createProductInitialValues({ product: product }),
    }));
  }

  function processDetailProduct(product) {
    setProductFormProperties((prev) => ({
      ...prev,
      show: true,
      creatingMode: false,
      disabled: true,
      initialValues: createProductInitialValues({ product: product }),
    }));
  }

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
      <section className="back-button-title-container">
        <button
          className="products-management-go-back-button btn-general-styles"
          onClick={() => navigate("/management-menu")}
        >
          <img src={BackArrow.src} />
        </button>
        <h3>Gestión de Productos</h3>
      </section>
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
            loadingProducts={loadingProducts}
            listView={listView}
            setListView={setListView}
            handleDeleteMultipleProducts={handleDeleteProduct}
            selectedProducts={selectedProducts}
            toastRef={toast}
            removeAllFilters={removeAllFilters}
            resetProductFormProperties={resetProductFormProperties}
            setProductFormProperties={setProductFormProperties}
            productFormProperties={productFormProperties}
            handleCreateProduct={handleCreateProduct}
            handleUpdateProduct={handleUpdateProduct}
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
