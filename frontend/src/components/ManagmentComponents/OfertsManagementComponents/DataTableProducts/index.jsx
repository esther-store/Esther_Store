import './index.css';
import { DataScroller } from "primereact/datascroller";
import { Checkbox } from "primereact/checkbox";
import { getProductsOfert } from '../../../../services/ManagePromotions/getProductsOfert';
import React, { useState,useEffect,useRef } from 'react';
import { Image } from "primereact/image";
import { Button } from 'primereact/button';
import { applyDiscount } from '../../../../utils/applyDiscount';



function DataTableProducts({
  OfertID,
  editable,
  mobileSize,
  productsOFerts,
  setProductsOferts,
  searchChecked,
  handleOnChangeChecked
}) {
    
    const tableProductsRef = useRef(null)
    const [page, setPage] = useState(1);
    const [loadMore,setLoadMore] = useState(false);


    useEffect(() =>{ 
      getProductsOfert(OfertID,page).then(products =>{
        if(productsOFerts.length>0){
          setProductsOferts(productsOFerts.concat(products.results));
        }
        else{
          setProductsOferts(products.results);
        }
        if(products.next !== null) {setLoadMore(true)}else{setLoadMore(false)}
      })
 

    },[OfertID,page])

  
    
    const footer = <Button type="text" style={{height:"40px",backgroundColor:" #545454"}} icon="pi pi-plus"  
    onClick={(e) => {
      e.preventDefault();
      setPage(page + 1);
    }} 
    />;

  function ProductItemTemplate(data) {
    return (
      <section  className={mobileSize?"promotion-product-card-container promotion-product-card-container-mobileSize":"promotion-product-card-container"}>
        <div className="img-promotion-product-card-section">
          { editable &&
          <Checkbox
              checked={searchChecked(data.id)}
              onChange={() => handleOnChangeChecked(data)}
            />
          }
          <div className="img-promotion-product-card-container">
            <Image src={data.product_img1} alt={data.product_name} preview/>
          </div>

        </div>
        <div className="details-prmotion-product-card-section">
          <p className="mame-promotion-product-card">{data.product_name}</p>
          <p className="category-product-card-promotion">{`Categoría: ${data.categoria!=null?data.categoria_full_info.nombre:undefined}`}</p>
        </div>
        {data.promotion || data.descuento > 0 ? (
          <p className="card-text price price-with-discount" style={{display:"flex",flexDirection:"column",}}>
            <span className="original-price" style={{marginRight:"0px"}}>${data.precio.toFixed(2)}</span>
            <span className="new-price">
              $
              {applyDiscount({
                price: data.precio,
                promotion: data.promotion_full_info,
                discount: data.descuento,
              }).toFixed(2)}
            </span>
          </p>
        ) : (
          <p className="card-text price">${data.precio.toFixed(2)}</p>
        )}
      </section>
    );
  }

  return (
    <DataScroller
      ref={tableProductsRef}
      className="data-products-ofert-scroller"
      value={productsOFerts}
      itemTemplate={ProductItemTemplate}
      rows={1000}
      inline
      scrollHeight="300px"
      footer={loadMore?footer:undefined}
      />
  );
}

export default DataTableProducts;
