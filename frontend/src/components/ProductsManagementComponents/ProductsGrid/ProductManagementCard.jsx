import ActionButtons from "../ProductList/ActionButtons";
import { Checkbox } from "primereact/checkbox";

function ProductManagementCard({product, handleDeleteProduct, processDetailProduct, processUpdateProduct, selectedProducts, handleCheckProduct}) {
    return ( 
        <div
          className="product-management-card"
          id={product.id}
          key={product.id}
        >
          <div className="img-container">
            <img
              loading="lazy"
              src={product.product_img1}
              alt={product.product_name}
            />
          </div>
          <div className="name-and-price-container">
            <p className="product-card-name">{product.product_name}</p>
            <p className="card-text price">${product.precio.toFixed(2)}</p>
          </div>
          <div className = "action-buttons-container">
            <ActionButtons
                item={product}
              handleDelete={handleDeleteProduct}
              handleDetil={processDetailProduct}
              handleEdit={processUpdateProduct}
            />
          </div>
          <div className = "product-management-card-checkbox">
            <Checkbox
                checked={selectedProducts.some(selectedProduct => product.id === selectedProduct.id)}
                onChange={(e) => handleCheckProduct({checked:e.checked, product:product})}
            />
          </div>
        </div>
     );
}

export default ProductManagementCard;