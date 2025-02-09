import { CompanyLogo } from "@/components/NavBar/CompanyLogo";
import "./pagesStyles/Page404.css";
import "primeicons/primeicons.css";
import { useNavigate } from "react-router-dom";
import { RemovePageLoader } from "@/components/RemovePageLoader";

export default function Page404() {
  const navigate = useNavigate();
  return (
    <section className="page-404">
      <RemovePageLoader/>
      <section className="message-container">
        <i className="pi pi-exclamation-triangle"></i>
        <span>Página no encontrada !</span>
      </section>
        <button onClick={() => navigate("/")}>Volver</button>
    </section>
  );
}
