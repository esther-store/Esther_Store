import "./index.css"
import Loader from "../../Loader";
import ProductCardForOfertManagement from "../ProductCard";

function ProductsGridForOfertManagement({
  products,
  loading,
  handleOnChangeChecked,
  searchChecked,
}) {

  return (
    <section className="products-grid-management-oferts-container">
      {loading ? (
        <section className="products-management-grid-loader-container">
          <div>
            <Loader />
          </div>
        </section>
      ) : null}
      {products.map((product) => (
        <ProductCardForOfertManagement
            key={product.id}
            data={product}
            handleOnChangeChecked={handleOnChangeChecked}
            searchChecked={searchChecked}
        />
      ))}
    </section>
  );
}
export default ProductsGridForOfertManagement;