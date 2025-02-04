import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {TrashIcon} from "@/icons/TrashIcon";
import BoxIcon from "@/assets/icons/box-icon.svg";
import ProductQuantityController from "../ProductQuantityController";
import CartContext from "@/context/cartContext";
import React, {useContext } from "react";
import './index.css'

const ProductsCartList = React.memo(function ProductsCartList() {
    const {
        productsCart,
        addProductToCart,
        restProductFromCart,
        deleteProductFromCart,
        total
      } = useContext(CartContext);

    return ( 
        <DataTable
          value={productsCart}
          tableStyle={{ minWidth: "50rem"}}
          selectionMode={"checkbox"}
          dataKey="id"
          size="small"
          className="products-cart-datatable"
          emptyMessage = "No hay productos en el carrito"
        >
          <Column
            field="productName"
            header="Nombre"
            body={(product) => {
              return (
                <div className="table-product-field-container">
                  <img src={BoxIcon.src} />
                  <span>{product.productName}</span>
                </div>
              );
            }}
          />
          <Column
            field="img1"
            header="Imagen"
            body={(product) => {
              return (
                <img
                  className="product-cart-img"
                  alt={product.productName}
                  src={product.img1}
                />
              );
            }}
          />
          <Column
            field="price"
            header="Precio"
            body={(product) => {
              return `$${product.price.toFixed(2)}`;
            }}
          />
          <Column
            header="Cantidad"
            body={(product) => {
              return (
                <ProductQuantityController
                  item={{
                    id: product.id,
                    productName: product.productName,
                    price: product.price,
                    img1: product.img1,
                  }}
                  add={addProductToCart}
                  rest={restProductFromCart}
                  quantity={product.quantity}
                />
              );
            }}
          />
          <Column
            field="subtotal"
            header="Sub Total"
            footer = {`Total: $${total.toFixed(2)}`}
            body={(product) => {
              return `$${product.subtotal.toFixed(2)}`;
            }}
          />
          <Column
            body={(product) => {
              return (
                <button onClick={() => deleteProductFromCart(product.id)} className = "delete-product-from-cart-button">
                  <TrashIcon color = "#000"/>
                </button>
              );
            }}
          />
        </DataTable>
     );
})

export default ProductsCartList;