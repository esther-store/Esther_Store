import "@/store_pages/pagesStyles/ManagementOfertsAndSecurity.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { getPromotions } from "@/services/ManagePromotions/getPromotions";
import InfoPromotion from "@/components/ManagmentComponents/OfertsManagementComponents/InfoDialogComponent/infoPromotion";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { deletePromotions } from "@/services/ManagePromotions/deletePrmotion";
import { Toast } from "primereact/toast";
import { useGetPromotions } from "@/hooks/useGetPromotions";
import OfertsGrid from "@/components/ManagmentComponents/OfertsManagementComponents/OfertsGrid";
import PageLoader from "@/components/PageLoader";
import DataTableOferts from "@/components/ManagmentComponents/OfertsManagementComponents/DataTableOferts";
import SearchOferts from "@/components/ManagmentComponents/OfertsManagementComponents/SearchOfertsComponent";
import DataScrollerOferts from "@/components/ManagmentComponents/OfertsManagementComponents/DataScrollerOferts";
import QueryFiltersContext from "@/context/filtersContext";
import AuthenticationContext from "@/context/authenticationContext";
import { useNavigate } from "react-router-dom";

const heaerTitle =(info) => {
  return(
    <div style={{display:"flex", alignItems:"center",gap:"10px"}}> 
      <i className="pi pi-tag "></i>
      <p style={{marginBlock:"0px",fontSize:"1rem"}}>{info}</p>
    </div>
  )
}

//Management Ofert Component
function ManagementOferts() {
  const [selectedOferts, setSelectedOferts] = useState([]);
  const mobileView = useWindowSize("max", 800);
  const [dataOferts, setDataOferts] = useState([]);
  const responsive = useWindowSize("max", 600);
  const [infoDialogStatus, setInfoDialogStatus] = useState(false);
  const [infoDialogEdit, setInfoDialogEdit] = useState(false);
  const [infoDialogCreate, setInfoDialogCreate] = useState(false);
  const [rowData, setRowData] = useState({});
  const toast = useRef(null);
  const [mounted, setMounted] = useState(false)
  const [viewMode,setViewMode] = useState("table")
  const [numOfOferts, setNumOferts] = useState(0) 
  const {searchParams, setFilter, getActiveFilter} = useContext(QueryFiltersContext)
  const [search,setSearch] = useState(getActiveFilter("search"))
  // Useeffect hook for getting ofert data from server
  const { loading,setLoading } = useGetPromotions({searchParams:searchParams,promotions:dataOferts,setPromotions:setDataOferts,setNumOfPromotions:setNumOferts})
  const {auth} = useContext(AuthenticationContext)
  const navigate = useNavigate();

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

  const handleOnChangeChecked = (oferts,data) =>{
       var copyOferts = [] 
        if(oferts.length > 0){
        for(let i = 0; i < oferts.length; i++) {
            if(oferts[i] !== data){
                copyOferts.push(oferts[i]);
            }
        }
            if(copyOferts.length == oferts.length){ 
                copyOferts.push(data);
            }
            setSelectedOferts(copyOferts);
        }else{
            copyOferts.push(data)
            setSelectedOferts(copyOferts);
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
      message: "Esta seguro que desea eliminar esta promoción?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        setLoading(true);
        deletePromotions({ promotions: [id],token:auth.token }).then(() => {
          getPromotions("",auth.token,).then((result) => {
            setDataOferts(result);
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
        deletePromotions({ promotions: dataId,token:auth.token}).then(() => {
          getPromotions("",auth.token).then((result) => {
            setDataOferts(result);
            show("Eliminación completada","success");
          });
          setSelectedOferts([])
        }); 
      },
      reject: () => {},
    });
  };

  const handleOnChangeData = () => {
    getPromotions("",auth.token).then((promotions) => {
      setDataOferts(promotions);
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
      <InfoPromotion
        editable={false}
        heaerTitle={heaerTitle("Información de promoción")}
        data={rowData}
        visible={infoDialogStatus}
        onHide={handleOnClickInfoButton}
        setPageLoad={setLoading}
        mobileSize={responsive}
      />
      <InfoPromotion
        accion={"update"}
        editable={true}
        onSave={handleOnChangeData}
        heaerTitle={heaerTitle("Editar información de promoción")}
        data={rowData}
        visible={infoDialogEdit}
        onHide={handleOnClickEditButton}
        setPageLoad={setLoading}
        show={show}
        mobileSize={responsive}
      />
      <InfoPromotion
        accion={"create"}
        editable={true}
        onSave={handleOnChangeData}
        heaerTitle={heaerTitle("Agregar promoción")}
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
        <h1>Gestión de Ofertas</h1>
      </header>
      {/* Seccion de la barra de busqueda */}
      <SearchOferts
        confirmAll={confirmAll}
        handelOnChangeView={handelOnChangeView}
        handleOnClickCreateButton={handleOnClickCreateButton}
        selectedOferts={selectedOferts}
        setSearch={setSearch}
        show={show}
        responsive={responsive}
        search={search}
        viewMode={viewMode}
      />
      {/* Tabla de ofertas */}
      <section className={viewMode=="table"?"table-oferts-container":"table-oferts-container not-overfllow-x"}>
        {!mobileView && viewMode !=="grid"? (
          <DataTableOferts
            dataOferts={dataOferts}
            selectedOferts={selectedOferts}
            setSelectedOferts={setSelectedOferts}
            confirm2={confirm2}
            handleOnClickEditButton={handleOnClickEditButton}
            setRowData={setRowData}
            handleOnClickInfoButton={handleOnClickInfoButton}
          />
        ) : viewMode =="grid"?
          <OfertsGrid 
            deleteConfirm={confirm2} 
            handleOnChangeChecked={handleOnChangeChecked}
            handleOnClickEditButton={handleOnClickEditButton}
            handleOnClickInfoButton={handleOnClickInfoButton}
            searchChecked={searchChecked}
            setRowData={setRowData}
            selectedOferts={selectedOferts}
            oferts={dataOferts}
            numOfOferts={numOfOferts}
          />
        :(
          <DataScrollerOferts
            dataOferts={dataOferts}
            confirm2={confirm2}
            handleOnChangeChecked={handleOnChangeChecked}
            handleOnClickEditButton={handleOnClickEditButton}
            handleOnClickInfoButton={handleOnClickInfoButton}
            searchChecked={searchChecked}
            selectedOferts={selectedOferts}
            setRowData={setRowData}
          />
        )}
      </section>
    </section>
  );
}

export default ManagementOferts;
