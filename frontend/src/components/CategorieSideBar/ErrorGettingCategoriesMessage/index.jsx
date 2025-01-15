import './index.css'
import React from 'react';

const ErrorGettingCategoriesMessage = React.memo(function ErrorGettingCategoriesMessage({refetchCategories}){
    return ( 
        <div className="categories-list-message-error">
          Error al obtener las categorías
          <button onClick = {refetchCategories}>Reintentar</button>
        </div>
     );
})

export default ErrorGettingCategoriesMessage;