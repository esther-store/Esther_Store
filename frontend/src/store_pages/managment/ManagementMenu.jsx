import "../pagesStyles/ManagementMenu.css";
import ProductsManagement from "@/assets/icons/products-management.svg";
import OfertsManagement from "@/assets/icons/oferts-management.svg";
import SecurityManagement from "@/assets/icons/security-management.svg";
import ContactsManagement from "@/assets/icons/contacts-management.svg";
import useWindowSize from "@/hooks/useWindowSize";
import { useNavigate } from "react-router-dom";
import { LeftArrow } from "@/icons/LeftArrow";

function ManagementMenu (){
    const responsive = useWindowSize("max",400)
    const navigate = useNavigate()

    return(
        <section className="management-container"> 
            <div className = "managment-menu-title-container">
                <button
                    className="products-management-go-back-button btn-general-styles"
                    onClick={() => navigate("/store")}
                    >
                    <LeftArrow color = "#000"/>
                </button>
                <h2>Menú de Gestión</h2>
            </div>
            <main className={responsive?"management-menu-container management-menu-container-reponsive":"management-menu-container"}>
                        <div title="products-secction" className="management-menu-section" onClick={()=>navigate("/management/products")}> 
                                <h4>Productos</h4>
                                <div className="icon-management-section">
                                    <img src={ProductsManagement.src} alt="products" width="55px"/>
                                </div>
                        </div>
                        <div title="oferts-section" className="management-menu-section" onClick={()=>navigate("/management/categories")}>
                            <h4>Categorías</h4>
                            <div className="icon-management-section">
                                <img src={OfertsManagement.src} alt="oferts" width="55px"/> 
                            </div>
                        </div>
                        <div title="oferts-section" className="management-menu-section" onClick={()=>navigate("/management/oferts")}>
                            <h4>Ofertas</h4>
                            <div className="icon-management-section">
                                <img src={OfertsManagement.src} alt="oferts" width="55px"/> 
                            </div>
                        </div>
                        <div title="security-section" className="management-menu-section" onClick={()=>navigate("/management/security")}>
                            <h4>Seguridad</h4>
                            <div className="icon-management-section">
                                <img src={SecurityManagement.src} alt="security" width="55px"/>
                            </div>
                        </div>
                        <div title="contac-section" className="management-menu-section">
                            <h4>Contacto</h4>
                            <div className="icon-management-section" onClick={()=>navigate("/management/contact")}>
                                <img src={ContactsManagement.src} alt="contacts" width="48px"/>
                            </div>
                        </div>        
            </main>

        </section>
    )
}

export default ManagementMenu;
