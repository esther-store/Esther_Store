import { LeftArrow } from "@/icons/LeftArrow";
import { Link } from "react-router-dom";
import "./index.css";
import NavbarDropdown from "@/components/NavBar/NavbarDropdown";

export function ManagementProductsPageHeader({
  title = "Gestión de Productos",
  justifyContent = "flex-start",
}) {
  return (
    <section
      className="back-button-title-container"
      style={{ justifyContent: justifyContent }}
    >
      <Link
        className="products-management-go-back-button btn-general-styles"
        style={{height:'15px'}}
        to="/store"
      >
        <LeftArrow width={20} />
      </Link>
      <h3>{title}</h3>
      <NavbarDropdown iconColor="#000"/>
    </section>
  );
}
