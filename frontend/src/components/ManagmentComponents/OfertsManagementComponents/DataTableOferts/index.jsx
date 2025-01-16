import './index.css'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DeactiveStatusIcon from "@/assets/icons/deactive-status-icon.svg";
import ActiveStatusIcon from "@/assets/icons/active-status-icon.svg";

const headerTableStyle = {
  backgroundColor: "#545454",
  color: "#FFF",
  textAlign: "center",
  fontFamily: "Noto Sans",
  lineHeight: "137%",
  fontVariant: "small-caps",
  letterSpacing: "-0.8px",
};

const nameTamplate = (data) => {
  return (
    <div className="name-template-container">
      <i className="pi pi-tag"></i>
      <span>{data.name}</span>
    </div>
  );
};
const statusTamplate = (data) => {
  return (
    <div className="status-template-container">
        <img src={data.active?ActiveStatusIcon.src:DeactiveStatusIcon.src} alt="" />
    </div>
  );
};

function DataTableOferts({
  dataOferts,
  selectedOferts,
  setSelectedOferts,
  setRowData,
  handleOnClickEditButton,
  handleOnClickInfoButton,
  confirm2,
}) {
  const acciones = (data) => {
    return (
      <div className="acctions-oferts-table-container">
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
    );
  };

  return (
    <DataTable
      className="data-table-oferts"
      value={dataOferts}
      stripedRows

      tableStyle={{ minWidth: "50rem" }}
      checked={selectedOferts}
      selectionMode={"checkbox"}
      size="small"
      scrollable={true}
      onSelectionChange={(e) => {
        setSelectedOferts(e.value);
      }}
      selection={selectedOferts}
    >
      <Column
        className={"column-oferts-field"}
        selectionMode="multiple"
        headerStyle={{
          width: "3rem",
          backgroundColor: "#545454",
          borderRadius: "0px 0px 0px 5px",
        }}
      ></Column>
      <Column
        className={"column-oferts-field"}
        body={nameTamplate}
        header="Nombre"
        headerStyle={headerTableStyle}
      ></Column>
      <Column
        className={"column-oferts-field"}
        body={statusTamplate}
        field="active"
        header="Estado"
        headerStyle={headerTableStyle}
      ></Column>
      <Column
        className={"column-oferts-field"}
        field="cantidad_products"
        header="Cant. Producto"
        headerStyle={headerTableStyle}
        sortable
      ></Column>
      <Column
        className={"column-oferts-field"}
        field="discount_in_percent"
        header="Descuento"
        headerStyle={headerTableStyle}
        sortable
      ></Column>
      <Column
        className={"column-oferts-field"}
        field="acciones"
        header="Acciones"
        body={acciones}
        headerStyle={{
          borderRadius: "0px 0px 5px 0px",
          backgroundColor: "#545454",
          color: "#FFF",
          textAlign: "center",
          fontFamily: "Noto Sans",
          lineHeight: "137%",
          fontVariant: "small-caps",
          letterSpacing: "-0.8px",
          
        }}
      ></Column>
    </DataTable>
  );
}

export default DataTableOferts;
