import { useGetPromotionsToManage } from "@/hooks/managementHooks/useGetPromotionsToManage";
import "./index.css";
import type { PromotionType } from "@/Types";
import ActionButtons from "../../ProductsManagementComponents/ProductsGrid/ActionButtons";
import { Checkbox } from "primereact/checkbox";

export default function PromotionsGrid() {
  const { promotions } = useGetPromotionsToManage();

  return (
    <main className="promotions-management-grid">
      {promotions.map((promo: PromotionType) => (
        <article className="promotion-management-card">
            <header>
                <Checkbox checked = {false}/>
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
