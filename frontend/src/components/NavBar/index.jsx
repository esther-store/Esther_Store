import "./index.css";
import { Link } from "react-router-dom";
import "primeicons/primeicons.css";
import { useLocation } from "react-router-dom";
import { CompanyLogo } from "./CompanyLogo";
import Cart from "../Cart";
import Search from "../Search";
import { lazy, Suspense, useContext } from "react";
import { FilterIcon } from "@/icons/FilterIcon";
import { Skeleton } from "primereact/skeleton";
import AuthenticationContext from "@/context/authenticationContext";

const NavbarDropdown = lazy(() => import("./NavbarDropdown"));
const CategoriePromotionSlider = lazy(() =>
  import("@/components/NavBar/CategoriePromotionSlider")
);
const CategoriesDropdown = lazy(() => import("./CategoriesDropdown"));
const PromotionsDropdown = lazy(() => import("./PromotionsDropdown"));
const OrderingProducts = lazy(() =>
  import("../StorePageComponents/OrderingProducts")
);

function NavBar() {
  const { pathname } = useLocation();
  const { auth } = useContext(AuthenticationContext);

  function scrollToElement(id) {
    document.getElementById(id).scrollIntoView({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <nav className="navbar">
      <ul>
        <li className="navbar-logo-container">
          <Link to="/">
            <CompanyLogo />
          </Link>
        </li>
        {pathname === "/" ? (
          <>
            <li className="navbar-promotions-container">
              <span
                className="navbar-homepage-link"
                onClick={() => scrollToElement("promotions")}
              >
                Promociones
              </span>
            </li>
            <li
              className="navbar-recommended-products-container"
              style={{ maxWidth: "130px" }}
            >
              <span
                className="navbar-homepage-link"
                onClick={() => scrollToElement("recommended-products")}
              >
                Productos Recomendados
              </span>
            </li>
            <li className="navbar-categories-container ">
              <span
                className="navbar-homepage-link"
                onClick={() => scrollToElement("categories")}
              >
                Categorías
              </span>
            </li>
          </>
        ) : (
          <>
            <li
              className="navbar-promotions-container"
              style={{ position: "relative", left: "20px" }}
            >
              <Suspense fallback={<Skeleton width="130px" height="25px" />}>
                <PromotionsDropdown onPromotionsSelect={() => {}} />
              </Suspense>
            </li>
            <li
              className="navbar-categories-container"
              style={{ position: "relative", right: "20px" }}
            >
              <Suspense
                fallback={
                  <div style={{ marginLeft: "10px" }}>
                    <Skeleton width="130px" height="25px" />
                  </div>
                }
              >
                <CategoriesDropdown onCategorySelect={() => {}} />
              </Suspense>
            </li>
          </>
        )}
        <li className="navbar-search-container">
          <Search redirectToStoreOnSearch={true} />
          {pathname == "/store" ? (
            <div style={{marginLeft:"10px", marginRight:"-10px"}}>
              <Suspense
                fallback={
                  <div style={{ marginLeft: "10px" }}>
                    <Skeleton width="30px" height="30px" />
                  </div>
                }
              >
                <OrderingProducts
                  style={{
                    width: "40px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  placeholder=""
                  fixedPlaceholder={true}
                  dropdownIcon={() => <FilterIcon color="#d763aeff" />}
                />
              </Suspense>
            </div>
          ) : null}
        </li>
        <li className="navbar-cart-container">
          <Cart />
        </li>
        <li className="navbar-dropdown-container">
        {auth?.token ? (
            <Suspense fallback={<Skeleton width="100%" height="25px" />}>
              <NavbarDropdown />
            </Suspense>
        ) : null}
        </li>
        {pathname.startsWith("/store/product") === false && (
          <li className="navbar-categories-list-container">
            <Suspense
              fallback={
                <div style={{ width: "90%", margin: "0 auto" }}>
                  <Skeleton width="100%" height="30px" />
                </div>
              }
            >
              <CategoriePromotionSlider />
            </Suspense>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
