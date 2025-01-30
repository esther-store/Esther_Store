import CategorieSideBar from "../components/CategorieSideBar";
import ProductsGrid from "../components/ProductsGrid";
import Search from "../components/Search";
import OrderingProducts from "../components/OrderingProducts";
import "./pagesStyles/Store.css";
import ActiveFilters from "../components/ActiveFilters";

function Store() {
  return (
    <section className={"store-page"}>
      <search>
        <section className="search-product">
          <h3>Productos</h3>
          <section className="search-order-container">
            <Search />
            <OrderingProducts />
          </section>
        </section>
      </search>
      <main>
        <div className = "store-page-active-filters-component-container">
          <ActiveFilters/>
        </div>
        <ProductsGrid/>
      </main>
    </section>
  );
}

export default Store;
