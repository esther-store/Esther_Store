import React, { useState, useContext, useRef, useEffect } from "react";
import "./pagesStyles/ProductsManagement.css";
import "primeicons/primeicons.css";
import BackArrow from "../assets/products-management-back-icon.svg";
import ProductsManagementFiltersBar from "../components/ProductsManagementComponents/ProductsManagementFiltersBar";
import ProductList from "../components/ProductsManagementComponents/ProductList";
import ProductsGrid from "../components/ProductsManagementComponents/ProductsGrid/index";
import QueryFiltersContext from "../context/filtersContext";
import { useManageProducts } from "../hooks/useManageProducts";
import Paginator from "../components/Paginator";
import { Toast } from "primereact/toast";
import { useManageCategories } from "../hooks/useManageCategories";
import { getInitialValues, createProductInitialValues } from "../utils/productInitialValues";
import { useIsMobileMode } from "../hooks/useIsMobileMode";
import { useGetPromotions } from "../hooks/useGetPromotionsFromProducts";
import ActiveFilters from '../components/ActiveFilters'

function ProductsManagement() {
  const toast = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [listView, setListView] = useState(true);
  const {mobileMode} = useIsMobileMode({mobileWidth:840})
  const {promotions, loadingPromotions} = useGetPromotions()
  const { searchParams, setFilter, getActiveFilter, removeAllFilters } =
  useContext(QueryFiltersContext);

  //product form properties state
  const [productFormProperties, setProductFormProperties] = useState({
    show: false,
    disabled: false,
    creatingMode: true,
    initialValues: getInitialValues(),
  });

  //categories form properties state
  const [categoryFormProperties, setCategoryFormProperties] = useState({
    show:false,
    initialValues:null,
    disabled:false,
    creatingMode:true
  })

  //function to reset the product Form Properties
  function resetProductFormProperties(){
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
    handleDeleteProduct,
    handleDeleteMultipleProducts,
    setUpdateProducts,
    handleUpdateProduct,
    handleCreateProduct
  } = useManageProducts({
    searchParams: searchParams,
    toastRef: toast,
    setSelectedProducts: setSelectedProducts,
    resetProductFormProperties: resetProductFormProperties,
    removeAllFilters:removeAllFilters
  });

  //categories management hook
  const {
    categories,
    loadingCategories,
    handleDeleteCategory,
    handleDeleteMultipleCategories,
    handleCreateCategory,
    handleUpdateCategory
  } = useManageCategories({
    toastRef: toast,
    setUpdateProducts: setUpdateProducts,
    setSelectedCategories: setSelectedCategories,
    removeAllFilters: removeAllFilters,
    setCategoryFormProperties:setCategoryFormProperties,
    searchParams:searchParams
  });

  function processUpdateProduct(product) {
    setProductFormProperties((prev) => ({
      ...prev,
      show: true,
      creatingMode: false,
      disabled: false,
      initialValues: createProductInitialValues({product: product}),
    }));
  }

  function processDetailProduct(product) {
    setProductFormProperties((prev) => ({
      ...prev,
      show: true,
      creatingMode: false,
      disabled: true,
      initialValues: createProductInitialValues({product: product}),
    }));
  }

  //effect to change the view type to grid or list depending of the mobileMode
  useEffect(() => {
    if(mobileMode){
      setListView(false)
    }
    else{
      setListView(true)
    }
  },[mobileMode])

  return (
    <section className="products-management-page">
      <Toast ref={toast} position="bottom-center" />
      <section className="back-button-title-container">
        <button
          className="products-management-go-back-button btn-general-styles"
          onClick={() => history.back()}
        >
          <img src={BackArrow.src} />
        </button>
        <h3>Gestión de Productos</h3>
      </section>
      <ProductsManagementFiltersBar
        loadingCategories={loadingCategories}
        loadingProducts={loadingProducts}
        listView={listView}
        setListView = {setListView}
        categories = {categories}
        handleDeleteMultipleProducts={handleDeleteMultipleProducts}
        selectedProducts={selectedProducts}
        selectedCategories = {selectedCategories}
        toastRef={toast}
        setUpdateProducts={setUpdateProducts}
        removeAllFilters={removeAllFilters}
        categoryFormProperties = {categoryFormProperties}
        resetProductFormProperties={resetProductFormProperties}
        setProductFormProperties={setProductFormProperties}
        setSelectedCategories={setSelectedCategories}
        setCategoryFormProperties = {setCategoryFormProperties}
        handleCreateCategory = {handleCreateCategory}
        handleUpdateCategory = {handleUpdateCategory}
        handleDeleteCategory = {handleDeleteCategory}
        handleDeleteMultipleCategories={handleDeleteMultipleCategories}
        productFormProperties={productFormProperties}
        handleCreateProduct = {handleCreateProduct}
        handleUpdateProduct = {handleUpdateProduct}
        promotions = {promotions}
        loadingPromotions = {loadingPromotions}
      />
      <div className = "products-management-page-active-filter-component-container">
        <ActiveFilters/>
      </div>
      {listView?
      <ProductList
        products={products}
        loading={loadingProducts}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        handleDeleteProduct={handleDeleteProduct}
        processDetailProduct = {processDetailProduct}
        processUpdateProduct = {processUpdateProduct}
      />:
      <ProductsGrid 
        products={products}
        loading={loadingProducts}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        handleDeleteProduct={handleDeleteProduct}
        processDetailProduct = {processDetailProduct}
        processUpdateProduct = {processUpdateProduct}
        />
      }
      <Paginator
        numOfProducts={numOfProducts}
        productsLength={products.length}
      />
    </section>
  );
}

export default ProductsManagement;
