import CategorieSideBar from "../components/CategorieSideBar";
import ProductsGrid from "../components/ProductsGrid";
import Search from "../components/Search";
import OrderingProducts from "../components/OrderingProducts";
import "./pagesStyles/Store.css";
import { useGetCategories } from "../hooks/useGetCategories";
import { useGetPromotions } from "../hooks/useGetPromotionsFromProducts";
import ActiveFilters from "../components/ActiveFilters";

function Store() {
  const { categories, loading } = useGetCategories();
  const { promotions, loadingPromotions } = useGetPromotions();

  return (
    <section className={"store-page"}>
      <aside>
        <CategorieSideBar
          loading={loading}
          loadingPromotions={loadingPromotions}
          categories={categories}
          promotions={promotions}
        />
      </aside>
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
