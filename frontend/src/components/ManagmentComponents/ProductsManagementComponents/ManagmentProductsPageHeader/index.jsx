import { LeftArrow } from "@/icons/LeftArrow";
import { useNavigate } from "react-router-dom";
import './index.css'

export function ManagementProductsPageHeader({title = "Gestión de Productos"}) {
    const navigate = useNavigate()
    return ( 
        <section className="back-button-title-container">
        <button
          className="products-management-go-back-button btn-general-styles"
          onClick={() => navigate("/store")}
        >
          <LeftArrow width={20}/>
        </button>
        <h3>{title}</h3>
      </section>
     );
}
