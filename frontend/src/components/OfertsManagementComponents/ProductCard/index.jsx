import './index.css'
import { Checkbox } from "primereact/checkbox";
import InOffertIcon from "@/assets/icons/in-offert-icon.svg";
import { applyDiscount } from "@/utils/applyDiscount";


function ProductCardForOfertManagement({data,handleOnChangeChecked,searchChecked}){
    return(
       <div className="product-card" id = {data.id} style={{width:"240px"}}>
        <div className = 'img-container'>
            <img loading = "lazy" src={data.product_img1}  alt={data.product_name}/>
        </div>
        {data.promotion ? (
        <abbr title="En oferta">
          <img className="in-offert-icon" src={InOffertIcon.src} alt="En Oferta" />
        </abbr>
      ) : null}
        <div className = "name-and-price-container">
          <Checkbox  
                    checked={searchChecked(data.id)} 
                    onChange={()=>handleOnChangeChecked(data)}  
            />
          <p className="product-card-name">{data.product_name}</p>
          {data.promotion || data.descuento > 0 ? (
          <p className="card-text price price-with-discount">
            <span className="original-price">${data.precio.toFixed(2)}</span>
            <span className="new-price">
              $
              {applyDiscount({
                price: data.precio,
                promotionDiscountInPercent: data.promotion_full_info?.discount_in_percent,
                discount: data.descuento,
              }).toFixed(2)}
            </span>
          </p>
        ) : (
          <p className="card-text price">${data.precio.toFixed(2)}</p>
        )}
        </div>
       </div>

    )
}

export default ProductCardForOfertManagement
