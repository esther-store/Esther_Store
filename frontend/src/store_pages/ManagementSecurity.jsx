import "./pagesStyles/ManagementOfertsAndSecurity.css";
import React, { useState, useEffect, useRef,useContext } from "react";
import useWindowSize from "../hooks/useWindowSize";
import InfoUser from "../components/UserManagementComponents/InfoDialogComponent/infoUser";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { deleteUser } from "../services/ManageUser/deleteUser";
import { Toast } from "primereact/toast";
import UsersGrid from "../components/UserManagementComponents/UserGrid";
import PageLoader from "../components/PageLoader";
import SearchOferts from "../components/UserManagementComponents/SearchOfertsComponent";
import QueryFiltersContext from "../context/filtersContext";
import { useGetUsers } from "../hooks/useGetUsers";
import { getUsers } from "../services/ManageUser/getUsers";
import DataTableUsers from "../components/UserManagementComponents/DataTableUsers";
import AuthenticationContext from "../context/authenticationContext";

const heaerTitle =(info) => {
  return(
    <div style={{display:"flex", alignItems:"center",gap:"10px"}}> 
      <i className="pi pi-user "></i>
      <p style={{marginBlock:"0px",fontSize:"1rem"}}>{info}</p>
    </div>
  )
}

//Management Ofert Component
function ManagementSecurity() {
  const {auth} = useContext(AuthenticationContext)
  const [selectedUsers, setSelectedUsers] = useState([]);
  const mobileView = useWindowSize("max", 800);
  const [dataUsers, setDataUsers] = useState([]);
  const responsive = useWindowSize("max", 600);
  const [infoDialogStatus, setInfoDialogStatus] = useState(false);
  const [infoDialogEdit, setInfoDialogEdit] = useState(false);
  const [infoDialogCreate, setInfoDialogCreate] = useState(false);
  const [rowData, setRowData] = useState({});
  const toast = useRef(null);
  const [mounted, setMounted] = useState(false)
  const [viewMode,setViewMode] = useState("table")
  const {searchParams, setFilter, getActiveFilter} = useContext(QueryFiltersContext)
  const [search,setSearch] = useState(getActiveFilter("search"))
  // Useeffect hook for getting ofert data from server
  //const { loading,setLoading } = useGetPromotions({searchParams:searchParams,promotions:dataOferts,setPromotions:setDataOferts,setNumOfPromotions:setNumOferts})
  const {loading,setLoading} = useGetUsers({searchParams:searchParams,setUsers:setDataUsers})

  useEffect(() => {
    if(mounted){
        let timeOut = setTimeout(() => setFilter({name: "search", value:search}), 350)  
        return () => clearTimeout(timeOut)
    }
    else{
        setMounted(true)
    }
},[search]) 

  //Function for show delete messange when ofert is deleted
  const show = (detail,severity) => {
    toast.current.show({
      severity: severity,
      summary: "",
      detail: detail,
    });
  };

  //component to display manage icons in one of the table columns
  
  const searchChecked = (oferts,id) =>{
        for(let i = 0; i < oferts.length; i++) {
            if(oferts[i].id === id){
                return true;
            }
        }
        return false;
    };

  const handleOnChangeChecked = (users,data) =>{
    var copyUsers = []
        if(users.length > 0){
        for(let i = 0; i < users.length; i++) {
            if(users[i] !== data){
                copyUsers.push(users[i]);
            }
        }
            if(copyUsers.length == users.length){ 
              copyUsers.push(data);
            }
            setSelectedUsers(copyUsers);
        }else{
          copyUsers.push(data)
            setSelectedUsers(copyUsers);
        }
    };

    const handelOnChangeView = ()=>{
      if(viewMode =="table")
        setViewMode("grid")
      else
        setViewMode("table");
    };
  const confirm2 = (id) => {
    confirmDialog({
      message: "Esta seguro que desea eliminar este usuario?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        setLoading(true);
        deleteUser({ users:[id],token:auth.token }).then(() => {
          getUsers("",auth.token).then((users) => {
            setDataUsers(users.results);
            setLoading(false);
            show("Eliminación completada","success");
          });
        }).catch(err => {
          setLoading(false);
        });
      },
      reject: () => {},
    });
  };

  const confirmAll = (data) => {
    var dataId=[];
    for (var i = 0; i < data.length; i++) {
        dataId.push(data[i].id);
    } 
    confirmDialog({
      message: "Esta seguro que desea eliminar?",
      header: "Confirmar Eliminación",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        deleteUser({ users: dataId,token:auth.token }).then(() => {
          getUsers("",auth.token).then((result) => {
            setDataUsers(result.results);
            show("Eliminación completada","success");
          });
          setSelectedUsers([])
        }); 
      },
      reject: () => {},
    });
  };

  const handleOnChangeData = () => {
    getUsers("",auth.token).then((users) => {
      setDataUsers(users.results);
    });
  };
  const handleOnClickInfoButton = () => {
    setInfoDialogStatus(!infoDialogStatus);
  };
  const handleOnClickEditButton = () => {
    setInfoDialogEdit(!infoDialogEdit);
  };
  const handleOnClickCreateButton = () => {
    setInfoDialogCreate(!infoDialogCreate);
  };

  return (
    
    <section className="management-oferts-container">
      <PageLoader visible={loading} onHide={()=> null}/>
      <Toast ref={toast} position="bottom-center"/>
      <ConfirmDialog />
      <InfoUser
        editable={false}
        heaerTitle={heaerTitle("Información de usuario")}
        data={rowData}
        visible={infoDialogStatus}
        onHide={handleOnClickInfoButton}
        setPageLoad={setLoading}
        mobileSize={responsive}
      />
      <InfoUser
        accion={"update"}
        editable={true}
        onSave={handleOnChangeData}
        heaerTitle={heaerTitle("Editar información de usuario")}
        data={rowData}
        visible={infoDialogEdit}
        onHide={handleOnClickEditButton}
        setPageLoad={setLoading}
        show={show}
        mobileSize={responsive}
      />
      <InfoUser
        accion={"create"}
        editable={true}
        onSave={handleOnChangeData}
        heaerTitle={heaerTitle("Agregar usuario")}
        data={{}}
        visible={infoDialogCreate}
        onHide={handleOnClickCreateButton}
        setPageLoad={setLoading}
        show={show}
        mobileSize={responsive}
      />
      {/* Titulo de la pagina*/}
      <header>
        <button
          className="products-management-go-back-button btn-general-styles"
          onClick={() => history.back()}
        >
          <i className="pi pi-arrow-left" ></i>
        </button>
        <h1 className="management-user-title">Gestión de Usuarios</h1>
      </header>
      {/* Seccion de la barra de busqueda */}
      <SearchOferts
        confirmAll={confirmAll}
        handelOnChangeView={handelOnChangeView}
        handleOnClickCreateButton={handleOnClickCreateButton}
        selectedOferts={selectedUsers}
        setSearch={setSearch}
        show={show}
        responsive={responsive}
        search={search}
        viewMode={viewMode}
      />
      {/* Tabla de ofertas */}
      <section className={viewMode=="table"?"table-oferts-container":"table-oferts-container not-overfllow-x"}>
      {!mobileView && viewMode !=="grid"? (
          <DataTableUsers
            dataUsers={dataUsers}
            selectedUSers={selectedUsers}
            setelectedUSers={setDataUsers}
            confirm2={confirm2}
            handleOnClickEditButton={handleOnClickEditButton}
            setRowData={setRowData}
            handleOnClickInfoButton={handleOnClickInfoButton}
            setSelectedUSers={setSelectedUsers}
          />
        ) : viewMode =="grid"?
          <UsersGrid 
            deleteConfirm={confirm2} 
            handleOnChangeChecked={handleOnChangeChecked}
            handleOnClickEditButton={handleOnClickEditButton}
            handleOnClickInfoButton={handleOnClickInfoButton}
            searchChecked={searchChecked}
            setRowData={setRowData}
            selectedUsers={selectedUsers}
            users={dataUsers}
          />
        :(
          <UsersGrid 
            deleteConfirm={confirm2} 
            handleOnChangeChecked={handleOnChangeChecked}
            handleOnClickEditButton={handleOnClickEditButton}
            handleOnClickInfoButton={handleOnClickInfoButton}
            searchChecked={searchChecked}
            setRowData={setRowData}
            selectedUsers={selectedUsers}
            users={dataUsers}
          />
        )}
      </section>
    </section>
  );
}

export default ManagementSecurity;
