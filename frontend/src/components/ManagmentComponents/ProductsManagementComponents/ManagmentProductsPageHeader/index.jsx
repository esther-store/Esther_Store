import { LeftArrow } from "@/icons/LeftArrow";
import { Link } from "react-router-dom";
import "./index.css";
import NavbarDropdown from "@/components/NavBar/NavbarDropdown";

export function ManagementProductsPageHeader({
  title = "Gestión de Productos",
  justifyContent = "flex-start",
}) {
  return (
    <article
      className="products-management-page-header"
      style={{ alignItems: justifyContent }}
    >
      <section className="back-button-title-container">
        <Link
          className="products-management-go-back-button btn-general-styles"
          style={{ height: "15px" }}
          to="/store"
        >
          <LeftArrow width={20} />
        </Link>
        <h3>{title}</h3>
        <NavbarDropdown iconColor="#000" />
      </section>
      <span>
        Nota: Los cambios realizados en esta página se verán reflejados dentro
        de 5 minutos para el público
      </span>
    </article>
  );
}
