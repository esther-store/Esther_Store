import { useNavigate } from "react-router-dom";
import BackArrow from "@/assets/icons/products-management-back-icon.svg";

export function ManagementProductsPageHeader({title = "Gestión de Productos"}) {
    const navigate = useNavigate()
    return ( 
        <section className="back-button-title-container">
        <button
          className="products-management-go-back-button btn-general-styles"
          onClick={() => navigate("/management-menu")}
        >
          <img src={BackArrow.src} />
        </button>
        <h3>{title}</h3>
      </section>
     );
}
