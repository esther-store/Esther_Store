import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ActiveStatusIcon from "@/assets/icons/active-status-icon.svg";
import DeactiveStatusIcon from "@/assets/icons/deactive-status-icon.svg";
import BoxIcon from "@/assets/icons/box-icon.svg";
import ActionButtons from "./ActionButtons";
import Loader from "../../../Loader";
import BlockIcon from "@/assets/icons/block-icon.svg";
import "./index.css";
import React from "react";

const ProductList = React.memo(function ProductList({
  products,
  loading,
  selectedProducts,
  setSelectedProducts,
  handleDeleteProduct,
  processUpdateProduct,
  processDetailProduct,
}) {
  return (
    <section className="products-management-list-table-container">
      {loading ? (
        <section className="products-management-list-loader-container">
          <Loader />
        </section>
      ) : null}
      <DataTable
        value={products}
        tableStyle={{ minWidth: "50rem" }}
        selectionMode={"checkbox"}
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        dataKey="id"
        size="small"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column
          field="product_name"
          header="Nombre"
          body={(product) => {
            return (
              <div className="table-product-field-container">
                <img src={BoxIcon.src} />
                <span>{product.product_name}</span>
              </div>
            );
          }}
        ></Column>
        <Column
          field="categoria_full_info.nombre"
          header="Categoría"
          body={(product) => {
            return product.categoria == "" || product.categoria == null ? (
              <img src={BlockIcon.src} />
            ) : (
              product.categoria_full_info.nombre
            );
          }}
        ></Column>
        <Column
          field="is_active"
          header="Estado"
          body={(product) => {
            return product.is_active == true ? (
              <img src={ActiveStatusIcon.src} />
            ) : (
              <img src={DeactiveStatusIcon.src} />
            );
          }}
        ></Column>
        <Column
          field="precio"
          header="Precio"
          body={(product) => {
            return `$${product.precio.toFixed(2)}`;
          }}
        ></Column>
        <Column
          header="Acciones"
          body={(product) => {
            return (
              <ActionButtons
                item={product}
                handleDelete={handleDeleteProduct}
                handleDetil={processDetailProduct}
                handleEdit={processUpdateProduct}
              />
            );
          }}
        ></Column>
      </DataTable>
    </section>
  );
});

export default ProductList;
