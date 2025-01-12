import "./pagesStyles/Home.css";
import useWindowSize from "../hooks/useWindowSize";
import Oferts from "../components/Oferts";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getLastProducts from "../services/getLastProducts";
import getRecommendedProducts from "../services/getRecommendedProducts";
import { useGetPromotions } from "../hooks/useGetPromotionsFromProducts";

function Home() {
  const responsive = useWindowSize("max", 800);
  const navigate = useNavigate();
  const [lastAded, setLastAded] = useState([]);
  const [recomendedProducts, setRecomendedProducts] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const { promotions, loadingPromotions } = useGetPromotions();

  useEffect(() => {
    setLoading1(true);
    setLoading2(true);
    getLastProducts().then((products) => {
      setLastAded(products.results);
      setLoading1(false);
    });
    getRecommendedProducts().then((products) => {
      setRecomendedProducts(products.results);
      setLoading2(false);
    });
  }, []);

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
            load1={loading1}
            load2={loading2}
            recomendedProducts={recomendedProducts}
            lastAded={lastAded}
            promotions={promotions}
            loadingPromotions={loadingPromotions}
          />
        </section>
    </section>
  );
}

export default Home;
