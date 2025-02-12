import "./index.css";
import type { PromotionType } from "@/Types";
import ActionButtons from "../../ProductsManagementComponents/ProductsGrid/ActionButtons";
import { Checkbox } from "primereact/checkbox";

export default function PromotionsGrid({
  promotions,
  showCheckboxes,
  selectedPromotions,
  setSelectedPromotions,
  handleDeletePromotions
}: {
  promotions:PromotionType[];
  showCheckboxes: boolean;
  selectedPromotions: PromotionType[];
  setSelectedPromotions: (prev) => void;
  handleDeletePromotions: (promotions:PromotionType[]) => void
}) {

  function handleCheckPromotion({ checked, promotion }) {
    // Si el checkbox está marcado, agregar la promocion al array de seleccionados
    if (checked) {
      setSelectedPromotions((prev: PromotionType[]) => [...prev, promotion]);
    } else {
      // Si el checkbox no está marcado, quitar la promocion del array de seleccionados
      setSelectedPromotions((prev: PromotionType[]) =>
        prev.filter((item: PromotionType) => item.id !== promotion.id)
      );
    }
  }

  return (
    <main className="promotions-management-grid">
      {promotions.map((promo: PromotionType) => (
        <article key={promo.id} className="promotion-management-card">
          <header>
            {showCheckboxes ? (
              <Checkbox
                checked={selectedPromotions.some(
                  (promotion) => promotion.id == promo.id
                )}
                onChange={(e) =>
                  handleCheckPromotion({ checked: e.checked, promotion: promo })
                }
              />
            ) : null}
          </header>
          <aside>
            <img alt={promo.name} src={promo.img} />
          </aside>
          <section>
            <h1>{promo.name}</h1>
            <div>
              <span>{promo.discount_in_percent} %</span>
              <span>{promo.cantidad_products} Productos</span>
            </div>
            <div>
              <span>Especial: {promo.is_special ? "Si" : "No"}</span>
              <span>Activa: {promo.active ? "Si" : "No"}</span>
            </div>
          </section>
          <footer>
            <ActionButtons item = {promo} handleDelete = {handleDeletePromotions}/>
          </footer>
        </article>
      ))}
    </main>
  );
}
