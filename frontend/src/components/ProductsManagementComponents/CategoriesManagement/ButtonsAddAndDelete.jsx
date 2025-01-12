import AddProductIcon from "../../../assets/add-product-icon.svg";
import RemoveProductIcon from "../../../assets/remove-product-icon.svg";

function ButtonsAddAndDelete({setShowConfirmDialog, setCategoryFormProperties}) {
    return ( 
        <div className="buttons-add-delete-container">
            <div className="add-product-button-container">
              <button
                className="products-management-filters-bar-button btn-general-styles category-management-buttons"
                onClick={() => {
                  setCategoryFormProperties(prev => ({
                    ...prev,
                    show:true,
                    creatingMode:true
                  }))
                }}
              >
                <img src={AddProductIcon.src} />
                <span>Agregar</span>
              </button>
            </div>
            <div className="remove-product-button-container">
              <button
                className="products-management-filters-bar-button btn-general-styles category-management-buttons"
                onClick={() => setShowConfirmDialog(true)}
              >
                <img src={RemoveProductIcon.src} />
                <span>Eliminar</span>
              </button>
            </div>
          </div>
     );
}

export default ButtonsAddAndDelete;