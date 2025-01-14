import "./pagesStyles/Home.css";
import useWindowSize from "../hooks/useWindowSize";
import Oferts from "../components/Oferts";
import { useNavigate } from "react-router-dom";
import { useGetPromotions } from "../hooks/useGetPromotionsFromProducts";
import { useGetRecommendedProducts } from "@/hooks/useGetRecommendedProducts";
import { useGetProducts } from "@/hooks/useGetProducts";

function Home() {
  const responsive = useWindowSize("max", 800);
  const navigate = useNavigate();
  const { promotions, loadingPromotions } = useGetPromotions();
  const {recommendedProducts, loadingRecommendedProducts} = useGetRecommendedProducts()
  const {products: lastAddedProducts, loading: loadingLastAddedProducts} = useGetProducts({searchParams:'ordering=-updated_at', setNumOfProducts:() => {}})

  return (
    <section className="home-container">
        <section className="hero-section">
          <article
            className={
              responsive
                ? "background-image responsive-font-14px"
                : "background-image "
            }
          >
            <summary>
              <h1>
                ! Bienvenido a nuestra tienda en línea !
              </h1>
              <p>
                En B&M company, nos enorgullece ofrecer una amplia selección de 
                productos de alta calidad a precios. 
                <br/>
                Tenemos todo lo que necesitas para satisfacer tus necesidades.  
              </p>
            </summary>
          </article>
          <article
            className={
              responsive
                ? "home-description-container responsive-font-11px"
                : "home-description-container"
            }
          >
            <summary className="home-descriptions-container">
              <p>
                Explora nuestro sitio web para descubrir nuestras ultimas ofertas 
                y promociones y no dudes en ponerte en
                contacto con nosotros si 
                <br />
                necesitas ayuda 
                para encontrar lo que
                buscas.
                !Gracias por visitarnos!
              </p>
              <button
                className="home-description-button"
                onClick={() => navigate("/store")}
              >
                Ver productos
              </button>
            </summary>
          </article>
        </section>
        <section className="main-content">
          <Oferts
            load1={loadingLastAddedProducts}
            load2={loadingRecommendedProducts}
            recomendedProducts={recommendedProducts}
            lastAded={lastAddedProducts}
            promotions={promotions}
            loadingPromotions={loadingPromotions}
          />
        </section>
    </section>
  );
}

export default Home;
