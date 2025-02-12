import { useGetPromotionsToManage } from "@/hooks/managementHooks/useGetPromotionsToManage";
import "./index.css";
import type { PromotionIdType, PromotionType } from "@/Types";
import ActionButtons from "../../ProductsManagementComponents/ProductsGrid/ActionButtons";
import { Checkbox } from "primereact/checkbox";

export default function PromotionsGrid({showCheckboxes, selectedPromotions}:{showCheckboxes:boolean, selectedPromotions:PromotionIdType[]}) {
  const { promotions } = useGetPromotionsToManage();

  return (
    <main className="promotions-management-grid">
      {promotions.map((promo: PromotionType) => (
        <article key = {promo.id} className="promotion-management-card">
            <header>
                {showCheckboxes?
                    <Checkbox checked = {selectedPromotions.some(promoId => promoId == promo.id)}/>
                :null}
            </header>
            <aside>
                <img alt = {promo.name} src = {promo.img}/>
            </aside>
            <section>
                <h1>{promo.name}</h1>
                <div>
                    <span>{promo.discount_in_percent} %</span>
                    <span>{promo.cantidad_products} Productos</span>
                </div>
                <div>
                    <span>Especial: {promo.is_special?'Si':'No'}</span>
                    <span>Activa: {promo.active?'Si':'No'}</span>
                </div>
            </section>
            <footer>
                <ActionButtons/>
            </footer>
        </article>
      ))}
    </main>
  );
}
