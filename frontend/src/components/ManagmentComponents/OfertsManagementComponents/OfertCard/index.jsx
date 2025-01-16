import "./index.css";
import { Checkbox } from "primereact/checkbox";

function OfertCard({
  data,
  searchChecked,
  selectedOferts,
  handleOnClickInfoButton,
  handleOnChangeChecked,
  setRowData,
  handleOnClickEditButton,
  deleteConfirm,
}) {
  return (
    <section className="promotion-card-container grid-promotion-card-container">
      <div className="img-promotion-card-section img-grid-card-promotion">
        <div className="img-promotion-container">
          <img src={data.img} alt={data.name} />
        </div>
       
        <div className="details-prmotion-card-section details-grid-prmotion">
          <p className="mame-promotion p-grid-card-promotion">{data.name}</p>
          <p className="total-products-promotion">{`Productos: ${data.cantidad_products}`}</p>
        </div>
        <Checkbox
          checked={searchChecked(selectedOferts, data.id)}
          onChange={() => handleOnChangeChecked(selectedOferts, data)}
        />
      </div>
      <div className="discount-promotion-container discount-grid-container">
              <p className="price">{`-${data.discount_in_percent}%`}</p>
      </div>
      <div className="accion-promotion-card-section grid-accion-prmotion" >
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
            deleteConfirm(data.id);
          }}
        >
          <i className="pi pi-trash icon-oferts-table"></i>
        </button>

      </div>
    </section>
  );
}

export default OfertCard;
