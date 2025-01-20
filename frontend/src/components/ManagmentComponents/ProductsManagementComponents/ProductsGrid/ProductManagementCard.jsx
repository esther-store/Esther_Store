import ActionButtons from "./ActionButtons";
import { Checkbox } from "primereact/checkbox";
import ProductPrice from "@/components/ProductCard/ProductPrice";
import React from "react";

const ProductManagementCard = React.memo(function ProductManagementCard({
  product,
  handleDeleteProduct,
  processDetailProduct,
  processUpdateProduct,
  selectedProducts,
  handleCheckProduct,
}) {
  return (
    <div className="product-management-card" id={product.id} key={product.id}>
      <div className="img-container">
        <img src={product.product_img1} alt={product.product_name} />
      </div>
      <div className="name-and-price-container">
        <p className="product-card-name">{product.product_name}</p>
        <ProductPrice precio={product.precio} price_with_discounts={product.price_with_discounts}/>
      </div>
      <div className="action-buttons-container">
        <ActionButtons
          item={product}
          handleDelete={handleDeleteProduct}
          handleDetail={processDetailProduct}
          handleEdit={processUpdateProduct}
        />
      </div>
      <div className="product-management-card-checkbox">
        <Checkbox
          checked={selectedProducts.some(
            (selectedProduct) => product.id === selectedProduct.id
          )}
          onChange={(e) =>
            handleCheckProduct({ checked: e.checked, product: product })
          }
        />
      </div>
    </div>
  );
});

export default ProductManagementCard;
