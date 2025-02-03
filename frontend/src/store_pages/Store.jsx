import ProductsGrid from "../components/ProductsGrid";
import Search from "../components/Search";
import OrderingProducts from "../components/OrderingProducts";
import "./pagesStyles/Store.css";
import ActiveFilters from "@/components/ActiveFilters";
import CategorieSideBar from "@/components/CategorieSideBar";

function Store() {
  return (
    <section className={"store-page"}>
      <search className="search-order-container">
        <Search />
        <OrderingProducts />
      </search>
      <aside>
        <CategorieSideBar />
      </aside>
      <main>
        <div className="store-page-active-filters-component-container">
          <ActiveFilters />
        </div>
        <ProductsGrid />
      </main>
    </section>
  );
}

export default Store;
