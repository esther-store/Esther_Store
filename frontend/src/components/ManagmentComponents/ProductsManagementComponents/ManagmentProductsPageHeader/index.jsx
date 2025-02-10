import { LeftArrow } from "@/icons/LeftArrow";
import { useNavigate } from "react-router-dom";

export function ManagementProductsPageHeader({title = "Gestión de Productos"}) {
    const navigate = useNavigate()
    return ( 
        <section className="back-button-title-container">
        <button
          className="products-management-go-back-button btn-general-styles"
          onClick={() => navigate("/store")}
        >
          <LeftArrow/>
        </button>
        <h3>{title}</h3>
      </section>
     );
}
