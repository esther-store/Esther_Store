import ProductsGrid from "../components/ProductsGrid";
import "./pagesStyles/Store.css";
import ActiveFilters from "@/components/ActiveFilters";
import CategorieSideBar from "@/components/CategorieSideBar";

function Store() {
  return (
    <section className={"store-page"}>
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
