import "./index.css";
import { Dialog } from "primereact/dialog";
import React, { useState, useContext, useRef } from "react";
import "primeicons/primeicons.css";
import ProductsGridForOfertManagement from "../ProductGrid";
import { Toast } from "primereact/toast";
import SearchProducts from "../SearchProducts";
import { addProductsToPromotion } from "@/services/ManagePromotions/addProductsToOfert";
import AddIcon from "@/assets/icons/oferts-management-add.svg";
import { getProductsOfert } from "@/services/ManagePromotions/getProductsOfert";
import { useGetProducts } from "@/hooks/useGetProducts";
import Loader from "../../Loader";
import AuthenticationContext from "@/context/authenticationContext";

const heaerTitle = (info) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <i className="pi pi-tag "></i>
      <p style={{ marginBlock: "0px", fontSize: "1rem" }}>{info}</p>
    </div>
  );
};

function AddProductsToOferts({
  visible,
  onHide,
  show,
  idPromotion,
  setProductOferts,
  setLoading,
}) {
  const { auth } = useContext(AuthenticationContext);
  const toast = useRef(null);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [typeOfSaerch, setTypeOfSaerch] = useState("");
  const [updateProductList, setUpdateProductList] = useState(false);
  const { products, loadingProducts, next, previous } = useGetProducts({
    searchParams: `${typeOfSaerch}${search}`,
    setNumOfProducts: setNumberOfProducts,
    updateProductList: updateProductList,
  });

  const [page, setPage] = useState(1);
  const searchChecked = (id) => {
    for (let i = 0; i < checkedProducts.length; i++) {
      if (checkedProducts[i] === id) {
        return true;
      }
    }
    return false;
  };

  const handleOnsearch = (searchValue) => {
    setTypeOfSaerch("search=");
    setPage(1);
    setSearch(searchValue);
  };

  const handleOnChangeNext = () => {
    if (next !== null) {
      const newPage = page + 1;
      setPage(newPage);
      setSearch(() => {
        if (typeOfSaerch !== "page=") {
          setTypeOfSaerch("page=");
        }
        return newPage.toString();
      });
    }
  };

  const handleOnChangePrevious = () => {
    if (previous !== null && page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      setSearch(() => {
        if (typeOfSaerch !== "page=") {
          setTypeOfSaerch("page=");
        }
        if (newPage === 1) {
          setTypeOfSaerch("");
          return "";
        } else {
          return newPage.toString();
        }
      });
    }
  };

  const handleOnChangeChecked = (data) => {
    var aux = [];
    if (checkedProducts.length > 0) {
      for (let i = 0; i < checkedProducts.length; i++) {
        if (checkedProducts[i] !== data.id) {
          aux.push(checkedProducts[i]);
        }
      }
      if (aux.length == checkedProducts.length) {
        aux.push(data.id);
      }
      setCheckedProducts(aux);
    } else {
      aux.push(data.id);
      setCheckedProducts(aux);
    }
  };

  return (
    <Dialog
      visible={visible}
      onHide={() => {
        onHide();
        setCheckedProducts([]);
        setSearch("");
        setTypeOfSaerch("");
        setPage(1);
      }}
      className="addProductsToOferts-container"
      header={heaerTitle("Añadir productos")}
    >
      <Toast ref={toast} position="bottom-center" />
      <div className="addProductsToOferts-search-container">
        <SearchProducts search={search} onHandleChange={handleOnsearch} />
      </div>

      {!loadingProducts ? (
        <ProductsGridForOfertManagement
          products={products}
          loading={loadingProducts}
          handleOnChangeChecked={handleOnChangeChecked}
          searchChecked={searchChecked}
        />
      ) : (
        <Loader />
      )}
      <div className="btns-paginator-container ">
        <button onClick={handleOnChangePrevious}>
          <i className="pi pi-angle-left"></i>
        </button>
        <button onClick={handleOnChangeNext}>
          <i className="pi pi-angle-right"></i>
        </button>
      </div>
      <button
        className="add-products-button"
        onClick={() => {
          if (checkedProducts.length > 0) {
            addProductsToPromotion({
              products: checkedProducts,
              id: idPromotion,
              token: auth.token,
            }).then(() => {
              getProductsOfert(idPromotion).then((products) => {
                setLoading(true);
                setProductOferts(products.results);
                setLoading(false);
              });

              setCheckedProducts([]);
              setUpdateProductList(!updateProductList);
              show("Acción completada", "success");
              onHide();
            });
          } else show("Debe seleccionar almenos un elemento", "warn");
        }}
      >
        <img src={AddIcon.src} alt="delete" width={"13px"} />
        <p>Añadir</p>
      </button>
    </Dialog>
  );
}

export default AddProductsToOferts;
