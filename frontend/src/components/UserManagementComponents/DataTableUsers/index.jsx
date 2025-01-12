import './index.css'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DeactiveStatusIcon from "../../../assets/deactive-status-icon.svg";
import ActiveStatusIcon from "../../../assets/active-status-icon.svg";

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
      <i className="pi pi-user"></i>
      <span>{data.name}</span>
    </div>
  );
};
const statusTamplate = (data) => {
  return (
    <div className="status-template-container">
        <img src={data.is_active?ActiveStatusIcon:DeactiveStatusIcon} alt="" />
    </div>
  );
};

function DataTableUsers({
  dataUsers,
  selectedUSers,
  setSelectedUSers,
  setRowData,
  handleOnClickEditButton,
  handleOnClickInfoButton,
  confirm2,
}) {
  const acciones = (data) => {
    return (
      <div className="acctions-users-table-container">
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
    );
  };

  return (
    <DataTable
      className="data-table-users"
      value={dataUsers}
      stripedRows

      tableStyle={{ minWidth: "50rem" }}
      checked={selectedUSers}
      selectionMode={"checkbox"}
      size="small"
      scrollable={true}
      onSelectionChange={(e) => {
        setSelectedUSers(e.value);
      }}
      selection={selectedUSers}
    >
      <Column
        className={"column-users-field"}
        selectionMode="multiple"
        headerStyle={{
          width: "3rem",
          backgroundColor: "#545454",
          borderRadius: "0px 0px 0px 5px",
        }}
      ></Column>
      <Column
        className={"column-users-field"}
        body={nameTamplate}
        header="Nombre"
        headerStyle={headerTableStyle}
      ></Column>
      <Column
        className={"column-users-field"}
        body={statusTamplate}
        header="Estado"
        headerStyle={headerTableStyle}
      ></Column>
      <Column
        className={"column-users-field"}
        field="username"
        header="Nombre de Usuario"
        headerStyle={headerTableStyle}
        sortable
      ></Column>
      <Column
        className={"column-users-field"}
        field="email"
        header="Correo"
        headerStyle={headerTableStyle}
        sortable
      ></Column>
      <Column
        className={"column-users-field"}
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

export default DataTableUsers;
