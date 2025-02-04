import ProductsGrid from "../components/StorePageComponents/ProductsGrid";
import "./pagesStyles/Store.css";
import ActiveFilters from "@/components/StorePageComponents/ActiveFilters";
import CategorieSideBar from "@/components/StorePageComponents/CategorieSideBar";

function Store() {
  return (
    <section className="store-page">
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
