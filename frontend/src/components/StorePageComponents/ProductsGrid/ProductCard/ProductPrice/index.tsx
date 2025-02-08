import './index.css'

function ProductPrice({precio, price_with_discounts}:{precio:number, price_with_discounts?:number}) {
  return (
      price_with_discounts != null && price_with_discounts !== precio ? (
        <div className="price price-with-discount">
          <span className="new-price">
            ${price_with_discounts?.toFixed(2)}
          </span>
          <span className="original-price">${precio?.toFixed(2)}</span>
        </div>
      ) : (
        <p className="price">${precio?.toFixed(2)}</p>
      )
  );
}

export default ProductPrice;
