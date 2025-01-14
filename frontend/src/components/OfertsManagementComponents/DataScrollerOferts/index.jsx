import './index.css';
import { DataScroller } from "primereact/datascroller";
import { Checkbox } from "primereact/checkbox";
import DeactiveStatusIcon from "@/assets/icons/deactive-status-icon.svg";
import ActiveStatusIcon from "@/assets/icons/active-status-icon.svg";

function DataScrollerOferts({
  dataOferts,
  selectedOferts,
  setRowData,
  handleOnClickInfoButton,
  handleOnClickEditButton,
  searchChecked,
  handleOnChangeChecked,
  confirm2
}) {
  function PromotionItemTemplate(data) {
    return (
      <section className="promotion-template-container">
         <div style={{display:"flex",flexDirection:"row",alignItems:"left"}}>
          <div className="img-promotion-template-section">
            <Checkbox
              checked={searchChecked(selectedOferts, data.id)}
              onChange={() => handleOnChangeChecked(selectedOferts, data)}
            />
            <div className="img-template-container">
              <img src={data.img} alt={data.name} />
            </div>
          </div>
          <div className="details-prmotion-template-section">
                <img src={data.active?ActiveStatusIcon.src:DeactiveStatusIcon.src} alt="" />
          </div>
          <div className='accion-promotion-container'> 
            <div className="discount-promotion-container">
              <p className="price">{`-${data.discount_in_percent}%`}</p>
            </div>
            <div className="accion-butotns-container">
              <button
                className="oferts-actions-table-button"
                onClick={() => {
                  setRowData(data);
                  handleOnClickEditButton();
                }}
              >
                <i className="pi pi-pencil icon-oferts-table"></i>
              </button>
              <button
                className="oferts-actions-table-button"
                onClick={() => {
                  setRowData(data);
                  handleOnClickInfoButton();
                }}
              >
                <i className="pi pi-eye icon-oferts-table"></i>
              </button>
              <button
                className="oferts-actions-table-button"
                onClick={() => {
                  confirm2(data.id);
                }}
              >
                <i className="pi pi-trash icon-oferts-table"></i>
              </button>
            </div>
            
          </div>
         </div>
        
          <p className="mame-promotion">{data.name}</p>
      </section>
    );
  }

  return (
    <DataScroller
      className="data-oferts-scroller"
      value={dataOferts}
      itemTemplate={PromotionItemTemplate}
      rows={dataOferts.length}
      inline
      header="Listado de Ofertas"
    />
  );
}

export default DataScrollerOferts;
