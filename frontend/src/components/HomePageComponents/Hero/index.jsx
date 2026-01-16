import "./index.css";
import Image1 from "@/assets/homepage-hero-image-1.webp";
import Image2 from "@/assets/homepage-hero-image-2.webp";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <article className="homepage-hero-section">
      <main>
        <h1>Descubre tu propio estilo</h1>
        <p>
          Nuestra tienda esta diseñada para ayudarte a encontrar todo lo que
          buscas.
        </p>
        <footer>
          <Link
            to="/store"
            style={{
              color: "#fff",
              fontSize: "16px",
              fontFamily: "Poppins-Medium",
            }}
          >
            Ver Productos
          </Link>
        </footer>
      </main>
      <aside>
        <div style={{ backgroundColor: "#FFB1CD" }}></div>
        <div>
          <img src={Image1.src} alt="Pretty Dress" />
        </div>
        <div>
          <img src={Image2.src} alt="Pretty Purse and Shoes" />
        </div>
        <div style={{ backgroundColor: "#DBCAB7" }}></div>
      </aside>
    </article>
  );
}
