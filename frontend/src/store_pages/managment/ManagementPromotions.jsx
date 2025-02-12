import { RemovePageLoader } from "@/components/RemovePageLoader";
import '../pagesStyles/ManagementPromotions.css'
import { ManagementProductsPageHeader } from "@/components/ManagmentComponents/ProductsManagementComponents/ManagmentProductsPageHeader";
import PromotionsGrid from "@/components/ManagmentComponents/PromotionsManagementComponents/PromotionsGrid";

export default function ManagementPromotions(){
  return(
    <article>
      <RemovePageLoader/>
      <ManagementProductsPageHeader title = "Administrar Promociones"/>
      <PromotionsGrid/>
    </article>
  )
}
