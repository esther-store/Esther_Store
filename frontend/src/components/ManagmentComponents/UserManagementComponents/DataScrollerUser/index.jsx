import './index.css';
import { DataScroller } from "primereact/datascroller";
import { Checkbox } from "primereact/checkbox";
import DeactiveStatusIcon from "../../../assets/deactive-status-icon.svg";
import ActiveStatusIcon from "../../../assets/active-status-icon.svg";

function DataScrollerUsers({
  dataUsers,
  selectedUsers,
  setRowData,
  handleOnClickInfoButton,
  handleOnClickEditButton,
  searchChecked,
  handleOnChangeChecked,
  confirm2
}) {
  function usersItemTemplate(data) {
    return (
      <section className="users-template-container">
         <div style={{display:"flex",flexDirection:"row",alignItems:"left"}}>
          <div className="img-users-template-section">
            <Checkbox
              checked={searchChecked(selectedUsers, data.id)}
              onChange={() => handleOnChangeChecked(selectedUsers, data)}
            />
            <div className="img-template-container">
              <img src={data.img} alt={data.name} />
            </div>
          </div>
          <div className="details-users-template-section">
                <img src={data.active?ActiveStatusIcon:DeactiveStatusIcon} alt="" />
          </div>
          <div className='accion-users-container'> 
            <div className="discount-users-container">
              <p className="price">{`-${data.discount_in_percent}%`}</p>
            </div>
            <div className="accion-butotns-container">
              <button
                className="users-actions-table-button"
                onClick={() => {
                  setRowData(data);
                  handleOnClickEditButton();
                }}
              >
                <i className="pi pi-pencil icon-users-table"></i>
              </button>
              <button
                className="users-actions-table-button"
                onClick={() => {
                  setRowData(data);
                  handleOnClickInfoButton();
                }}
              >
                <i className="pi pi-eye icon-users-table"></i>
              </button>
              <button
                className="users-actions-table-button"
                onClick={() => {
                  confirm2(data.id);
                }}
              >
                <i className="pi pi-trash icon-users-table"></i>
              </button>
            </div>
            
          </div>
         </div>
        
          <p className="mame-users">{data.name}</p>
      </section>
    );
  }

  return (
    <DataScroller
      className="data-users-scroller"
      value={dataUsers}
      itemTemplate={usersItemTemplate}
      rows={dataUsers.length}
      inline
      header="Listado de Ofertas"
    />
  );
}

export default DataScrollerUsers;
