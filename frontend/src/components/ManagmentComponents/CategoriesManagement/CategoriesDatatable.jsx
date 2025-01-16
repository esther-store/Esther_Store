import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import BoxIcon from "@/assets/icons/box-icon.svg";
import ActionButtons from "../ProductsManagementComponents/ProductList/ActionButtons";
import React from "react";

const CategoriesDatatable = React.memo(function CategoriesDatatable({categories, selectedCategories, setSelectedCategories, handleDeleteCategory, processUpdateCategory, processDetailCategory}) {
    return ( 
        <DataTable
            value={categories}
            selectionMode={"checkbox"}
            selection={selectedCategories}
            onSelectionChange={(e) => setSelectedCategories(e.value)}
            dataKey="id"
          >
            <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
            <Column
              field="nombre"
              header="Nombre"
              body={(category) => {
                return (
                  <div className="table-product-field-container">
                    <img src={BoxIcon.src} />
                    <span>{category.nombre}</span>
                  </div>
                );
              }}
            />
            <Column
              field="img"
              header="Imagen"
              body={(category) => {
                return (
                  <img
                    className="data-table-product-image"
                    src={category.img}
                  />
                );
              }}
            />
            <Column
              header="Acciones"
              body={(category) => {
                return (
                  <ActionButtons
                    item={category}
                    handleDelete={handleDeleteCategory}
                    handleEdit={processUpdateCategory}
                    handleDetil={processDetailCategory}
                  />
                );
              }}
            />
          </DataTable>
     );
})

export default CategoriesDatatable;