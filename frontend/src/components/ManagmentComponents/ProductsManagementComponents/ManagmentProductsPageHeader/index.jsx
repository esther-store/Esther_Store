import { useNavigate } from "react-router-dom";
import BackArrow from "@/assets/icons/products-management-back-icon.svg";

export function ManagementProductsPageHeader() {
    const navigate = useNavigate()
    return ( 
        <section className="back-button-title-container">
        <button
          className="products-management-go-back-button btn-general-styles"
          onClick={() => navigate("/management-menu")}
        >
          <img src={BackArrow.src} />
        </button>
        <h3>Gestión de Productos</h3>
      </section>
     );
}
