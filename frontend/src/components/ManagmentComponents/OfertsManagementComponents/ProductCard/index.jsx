import "./index.css";
import { Checkbox } from "primereact/checkbox";

function ProductCardForOfertManagement({
  data,
  handleOnChangeChecked,
  searchChecked,
}) {
  return (
    <div className="product-card" id={data.id} style={{ width: "240px" }}>
      <div className="img-container">
        <img src={data.product_img1} alt={data.product_name} />
      </div>
      <div className="name-and-price-container">
        <Checkbox
          checked={searchChecked(data.id)}
          onChange={() => handleOnChangeChecked(data)}
        />
        <p className="product-card-name">{data.product_name}</p>
        {data.price_with_discounts ? (
          <p className="card-text price price-with-discount">
            <span className="original-price">${data.precio.toFixed(2)}</span>
            <span className="new-price">
              $
              {data.price_with_discounts.toFixed(2)}
            </span>
          </p>
        ) : (
          <p className="card-text price">${data.precio.toFixed(2)}</p>
        )}
      </div>
    </div>
  );
}

export default ProductCardForOfertManagement;
