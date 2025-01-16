
import "./styles/infoUserSecurity.css"
import React, { useState,useEffect } from "react";
import { Dialog } from 'primereact/dialog';


function InfoUserSecurity({visible,onHide,data,editable,heaerTitle,onHide2}){
    const [infoData,setInfoData] = useState({})
    

    useEffect(()=>{
        setInfoData(data);
        
    },[data])

    const handleOnchange = ( value,campo ) => {
        var InfoDataCopy = {...infoData};

        InfoDataCopy[campo] = value;
       setInfoData(InfoDataCopy);
       
    }

    return(
        <section className = "info-security-user-container">
           <Dialog visible={visible} className="info-dialog" header={heaerTitle} onHide={()=>onHide()}>
                <form onSubmit={(event)=>event.preventDefault()} className="info-dialog-form">
                     {  editable && <>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container">
                                <p>Nombre:</p>
                            </div>
                            <div  className="input-dialog-container">
                               <input defaultValue={infoData.name} type="text" onChange={(e)=>handleOnchange(e.target.value,"name")}/> 
                            </div> 
                        </div>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container" >
                                <p>Correo:</p>
                            </div>
                            <div className="input-dialog-container">
                               <input  defaultValue={infoData.email} type="email" onChange={(e)=>handleOnchange(e.target.value,"email")}/> 
                            </div> 
                        </div>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container" >
                                <p>Teléfono:</p>
                            </div>
                            <div className="input-dialog-container">
                               <input defaultValue={infoData.phone} type="text" onChange={(e)=>handleOnchange(e.target.value,"phone")}/> 
                            </div> 
                        </div>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container">
                                <p>Contraseña:</p>
                            </div>
                            <div className="input-dialog-container">
                               <input defaultValue="password" type="password" onChange={(e)=>handleOnchange(e.target.value,"passowrd")}/> 
                            </div> 
                        </div>
                        </> }

                        {  !editable && <>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container">
                                <p>Nombre:</p>
                            </div>
                            <div  className="input-dialog-container">
                               <input value={infoData.name} type="text" /> 
                            </div> 
                        </div>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container">
                                <p>Correo:</p>
                            </div>
                            <div className="input-dialog-container">
                               <input  value={infoData.email} type="text" /> 
                            </div> 
                        </div>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container" >
                                <p>Teléfono:</p>
                            </div>
                            <div className="input-dialog-container">
                               <input value={infoData.phone} type="text" /> 
                            </div> 
                        </div>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container">
                                <p>Contraseña:</p>
                            </div>
                            <div className="input-dialog-container">
                               <input value="password"  /> 
                            </div> 
                        </div>
                        </> }

                    {
                        editable && 
                        <div className="buttons-user-info-container">
                            <button className="buttons-user-info"
                                      onClick={()=>{
                                        onHide()
                                    }}
                            >
                                Guardar
                            </button>
                            <button className="buttons-user-info" 
                                onClick={()=>{
                                    onHide()
                                    setInfoData(data)
                                }}
                            >   
                                Cancelar
                            </button>
                        </div>
                    
                    
                    }
                </form>
           </Dialog>

        </section>
    )
}





export default InfoUserSecurity;
