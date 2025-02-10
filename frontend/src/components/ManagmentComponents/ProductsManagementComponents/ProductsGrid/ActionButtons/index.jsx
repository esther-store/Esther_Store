import './index.css'
import {TrashIcon} from "@/icons/TrashIcon";
import {EyeIcon} from '@/icons/EyeIcon'
import {EditIcon} from '@/icons/EditIcon'
import { ConfirmDialog } from 'primereact/confirmdialog';
import React, { useState } from 'react'

const ActionButtons = React.memo(function ActionButtons({item, handleDelete, handleEdit, handleDetail}) {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    return ( 
        <section className = "action-buttons-container">
            <ConfirmDialog 
                visible={showConfirmDialog} 
                onHide={() => setShowConfirmDialog(false)} 
                acceptClassName='p-button-danger'
                acceptLabel='Aceptar'
                rejectLabel='Cancelar'
                message="Deseas continuar con la operación?" 
                header="Confirmación" 
                icon="pi pi-exclamation-triangle" 
                accept={() => handleDelete([item])} 
                draggable = {false}
                resizable = {false}
                style={{maxWidth:"90%"}}
                />
            <button title = "Editar Producto" className = "btn-general-styles" onClick={() => handleEdit(item)}><EditIcon width = {22} height={22} color = "rgba(0, 0, 0, 0.6)"/></button>
            <button title = "Detalle del Producto" className = "btn-general-styles" onClick={() => handleDetail(item)}><EyeIcon width = {23} height={23} color = "rgba(0, 0, 0, 0.6 )"/></button>
            <button title = "Eliminar Producto" className = "btn-general-styles" onClick={() => setShowConfirmDialog(true)}><TrashIcon width = {22} height={22} color = "rgba(0, 0, 0, 0.5)"/></button>
        </section>
     );
})

export default ActionButtons;