import ProductsGrid from "../components/StorePageComponents/ProductsGrid";
import "./pagesStyles/Store.css";
import ActiveFilters from "@/components/StorePageComponents/ActiveFilters";
import { pagesTitle } from "@/constants";

function Store() {
  return (
    <section className="store-page">
      <title>{pagesTitle.store}</title>
      <main>
        <div className="active-filters-component-container">
          <ActiveFilters excludedFilters={["search", "categoria", "promotion"]}/>
        </div>
        <ProductsGrid />
      </main>
    </section>
  );
}

export default Store;
