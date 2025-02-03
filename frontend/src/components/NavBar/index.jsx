import "./index.css";
import { Link } from "react-router-dom";
import "primeicons/primeicons.css";
import { useLocation } from "react-router-dom";
import { CompanyLogo } from "./CompanyLogo";
import Cart from "../Cart";
import NavbarDropdown from "./NavbarDropdown";
import Search from "../Search";

function NavBar() {
  const { pathname } = useLocation();

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
              <a className = "navbar-homepage-link">Promociones</a>
            </li>
            <li className="navbar-recommended-products-container">
              <a className = "navbar-homepage-link">Productos Recomendados</a>
            </li>
            <li className="navbar-categories-container ">
              <a className = "navbar-homepage-link">Categorías</a>
            </li>
          </>
        ) : null}
        <li className="navbar-search-container">
          <Search redirectToStoreOnSearch={true} />
        </li>
        <li className="navbar-cart-container">
          <Cart />
        </li>
        <li className="navbar-dropdown-container">
          <NavbarDropdown />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
