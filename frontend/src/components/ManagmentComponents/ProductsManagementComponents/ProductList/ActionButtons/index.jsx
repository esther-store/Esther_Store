import './index.css'
import TrashIcon from '@/assets/icons/trash-icon.svg'
import EyeIcon from '@/assets/icons/eye-icon.svg'
import EditIcon from '@/assets/icons/edit-icon.svg'
import { ConfirmDialog } from 'primereact/confirmdialog';
import React, { useState } from 'react'

const ActionButtons = React.memo(function ActionButtons({item, handleDelete, handleEdit = () => {}, handleDetil = () => {}}) {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    console.log('action-buttons')
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
            <button className = "btn-general-styles" onClick={() => handleEdit(item)}><img src = {EditIcon.src}/></button>
            <button className = "btn-general-styles" onClick={() => handleDetil(item)}><img src = {EyeIcon.src}/></button>
            <button className = "btn-general-styles" onClick={() => setShowConfirmDialog(true)}><img src = {TrashIcon.src}/></button>
        </section>
     );
})

export default ActionButtons;