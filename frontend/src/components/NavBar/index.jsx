import "./index.css";
import { Link } from "react-router-dom";
import "primeicons/primeicons.css";
import { useLocation } from "react-router-dom";
import { CompanyLogo } from "./CompanyLogo";
import Cart from "../Cart";
import NavbarDropdown from "./NavbarDropdown";
import Search from "../Search";
import CategorieSlider from "@/components/NavBar/CategorieSlider";
import CategoriesDropdown from './CategoriesDropdown'
import PromotionsDropdown from './PromotionsDropdown'

function NavBar() {
  const { pathname } = useLocation();

  function scrollToElement(id){
    document.getElementById(id).scrollIntoView({
      left: 0,
      top: 0,
      behavior:"smooth"
    })
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
              <a className = "navbar-homepage-link" onClick = {() => scrollToElement("promotions")}>Promociones</a>
            </li>
            <li className="navbar-recommended-products-container" style = {{maxWidth:"130px"}}>
              <a className = "navbar-homepage-link" onClick = {() => scrollToElement("recommended-products")}>Productos Recomendados</a>
            </li>
            <li className="navbar-categories-container ">
              <a className = "navbar-homepage-link" onClick = {() => scrollToElement("categories")}>Categorías</a>
            </li>
          </>
        ) : 
        <>
            <li className="navbar-promotions-container" style = {{position:"relative", left:"20px"}}>
              <PromotionsDropdown onPromotionsSelect = {() => {}}/>
            </li>
            <li className="navbar-recommended-products-container">
            </li>
            <li className="navbar-categories-container">
              <CategoriesDropdown onCategorySelect={() => {}}/>
            </li>
          </>}
        <li className="navbar-search-container">
          <Search redirectToStoreOnSearch={true} />
        </li>
        <li className="navbar-cart-container">
          <Cart />
        </li>
        <li className="navbar-dropdown-container">
          <NavbarDropdown />
        </li>
        <li className = "navbar-categories-list-container">
          <CategorieSlider/>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
