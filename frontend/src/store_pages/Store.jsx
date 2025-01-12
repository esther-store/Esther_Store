import CategorieSideBar from "../components/CategorieSideBar";
import ProductsGrid from "../components/ProductsGrid";
import Search from "../components/Search";
import OrderingProducts from "../components/OrderingProducts";
import "./pagesStyles/Store.css";
import ProductDetails2 from "../components/ProductDetails/ProductDetail2";
import React, { useState, useEffect } from "react";
import { useGetCategories } from "../hooks/useGetCategories";
import { useGetPromotions } from "../hooks/useGetPromotionsFromProducts";
import ActiveFilters from "../components/ActiveFilters";

function Store() {
  const [activeProductDetails, setActiveProductDetails] = useState(false);
  const [detail, setDetail] = useState({});
  const { categories, loading } = useGetCategories();
  const { promotions, loadingPromotions } = useGetPromotions();

  useEffect(() => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = activeProductDetails ? "hidden" : "auto";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [activeProductDetails]);

  const handleOnactivateProductdetails = (product) => {
    setDetail(product);
    setActiveProductDetails(true);
  };
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
        <ProductsGrid activateProductdetails={handleOnactivateProductdetails} />
      </main>


      <ProductDetails2
        active={activeProductDetails}
        onHide={() => setActiveProductDetails(false)}
        data={detail}
      />

      
    </section>
  );
}

export default Store;
