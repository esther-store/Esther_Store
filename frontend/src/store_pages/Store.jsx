import ProductsGrid from "../components/StorePageComponents/ProductsGrid";
import "./pagesStyles/Store.css";
import ActiveFilters from "@/components/StorePageComponents/ActiveFilters";
import CategorieSideBar from "@/components/StorePageComponents/CategorieSideBar";
import { pagesTitle } from "@/constants";

function Store() {
  return (
    <section className="store-page">
      <title>{pagesTitle.store}</title>
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
