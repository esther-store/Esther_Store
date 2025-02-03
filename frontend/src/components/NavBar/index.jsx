import "./index.css";
import { Link } from "react-router-dom";
import "primeicons/primeicons.css";
import { useLocation } from "react-router-dom";
import {CompanyLogo} from "./CompanyLogo";
import Cart from "../Cart";
import UserNavbarActionsDropdown from "../UserNavbarActions";

function NavBar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <CompanyLogo/>
        </li>
      </ul>
      <div className="cart-and-close-session-icons-container">
        <Cart />
        <UserNavbarActionsDropdown />
      </div>
    </nav>
  );
}

export default NavBar;
