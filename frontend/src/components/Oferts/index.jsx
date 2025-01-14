import "./index.css";
import ProductCard from "../ProductCard";
import React, { useState } from "react";
import "primeicons/primeicons.css";
import useWindowSize from "@/hooks/useWindowSize";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";
import PromotionCard from "../PromotionsModal/PromotionCard";


function Oferts({
  lastAded,
  recomendedProducts,
  load1,
  load2,
  promotions,
  loadingPromotions,
}) {
  const [showAll1, setShowAll1] = useState(false);
  const [showAll2, setShowAll2] = useState(false);
  const [showAll3, setShowAll3] = useState(false);
  const navigate = useNavigate();
  const mobileSize = useWindowSize("max", 600);


  const handdleOnClickButton1 = () => {
    setShowAll1(!showAll1);
  };
  const handdleOnClickButton2 = () => {
    setShowAll2(!showAll2);
  };

  const handdleOnClickButton3 = () => {
    setShowAll3(!showAll3);
  };

  return (
    <section title="Seccion de ofertas" className="oferts-conteiner">
      <div className="divider-conteiner">
        <h3 style={{ display: "inline" }}>Promociones</h3>
        <hr className="divider" />
      </div>

      <article title="Promociones">
        <div className={showAll1 ? "oferts expanded" : "oferts"}>
          {!loadingPromotions ? (
            promotions.map((promotion, index) => (
              <PromotionCard
                key = {promotion.id}
                id={promotions.id}
                promotion={promotion}
                location={mobileSize ? "home-mobile" : "home"}
                handleOnclick={()=>navigate(`store?promotion=${promotion.id}`)}
              />
            ))
          ) : (
            <>
              <Skeleton width="250px" height="200px" />
              <Skeleton width="250px" height="200px" />
              <Skeleton width="250px" height="200px" />
              <Skeleton width="250px" height="200px" />
            </>
          )}
        </div>

        {!load2 ? (
          <div className="button-container">
            <button
              title={showAll1 ? "Ver menos" : "Ver mas"}
              onClick={handdleOnClickButton1}
              className={
                showAll1 ? "showAll-button button-active2" : "showAll-button"
              }
            >
              <i
                className={showAll1 ? "pi pi-chevron-up" : "pi pi-chevron-down"}
                style={{ fontSize: "1.2rem" }}
              ></i>
            </button>
          </div>
        ) : undefined}
      </article>

      <div className="divider-conteiner">
        <h3 style={{ display: "inline" }}>Productos Recomendados</h3>
        <hr className="divider" />
      </div>

      <article title="Productos Recomendados">
        <div className={showAll2 ? "oferts expanded" : "oferts"}>
          {!load1 ? (
            recomendedProducts.map((product, index) => (
              <ProductCard
                key = {product.id}
                className={"item"}
                product = {product}
                onClick={() =>
                  navigate(`/store?search=${product.product_name}`)
                }
                isInStore={true}
                location={mobileSize?"home-mobile":"home"}
              />
            ))
          ) : (
            <>
              <Skeleton width="250px" height="200px" />
              <Skeleton width="250px" height="200px" />
              <Skeleton width="250px" height="200px" />
              <Skeleton width="250px" height="200px" />
            </>
          )}
        </div>
        {!load1 ? (
          <div className="button-container">
            <button
              title={showAll2 ? "Ver menos" : "Ver mas"}
              onClick={handdleOnClickButton2}
              className={
                showAll2 ? "showAll-button button-active" : "showAll-button"
              }
            >
              <i
                className={showAll2 ? "pi pi-chevron-up" : "pi pi-chevron-down"}
                style={{ fontSize: "1.3rem" }}
              ></i>
            </button>
          </div>
        ) : undefined}
      </article>

      <div className="divider-conteiner">
        <h3 style={{ display: "inline" }}>Últimos Añadidos</h3>
        <hr className="divider" />
      </div>

      <article title="Últimos Añadidos">
        <div className={showAll3 ? "oferts expanded" : "oferts"}>
          {!load2 ? (
            lastAded.map((product, index) => (
              <ProductCard
                key = {product.id}
                product = {product}
                onClick={() =>
                  navigate(`/store?search=${product.product_name}`)
                }
                location={mobileSize?"home-mobile":"home"}
              />
            ))
          ) : (
            <>
              <Skeleton width="250px" height="200px" />
              <Skeleton width="250px" height="200px" />
              <Skeleton width="250px" height="200px" />
              <Skeleton width="250px" height="200px" />
            </>
          )}
        </div>

        {!load2 ? (
          <div className="button-container">
            <button
              title={showAll3 ? "oferts expanded" : "oferts"}
              onClick={handdleOnClickButton3}
              className={
                showAll3 ? "showAll-button button-active2" : "showAll-button"
              }
            >
              <i
                className={showAll3 ? "pi pi-chevron-up" : "pi pi-chevron-down"}
                style={{ fontSize: "1.2rem" }}
              ></i>
            </button>
          </div>
        ) : undefined}
      </article>
    </section>
  );
}

export default Oferts;
