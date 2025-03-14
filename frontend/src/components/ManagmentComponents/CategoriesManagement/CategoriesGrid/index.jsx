import ActionButtons from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsGrid/ActionButtons";
import { Checkbox } from "primereact/checkbox";
import React from "react";
import './index.css'

const CategoriesGrid = React.memo(function CategoriesGrid({
  categories,
  selectedCategories,
  showCheckboxes,
  setSelectedCategories,
  handleDeleteCategories,
  processUpdateCategory,
  processDetailCategory,
}) {
    function handleCheckCategory({checked, category}){
        // Si el checkbox está marcado, agregar la categoria al array de seleccionados
        if (checked) {
        setSelectedCategories((prev) => [...prev, category]);
        } else {
        // Si el checkbox no está marcado, quitar la categoria del array de seleccionados
        setSelectedCategories((prev) => prev.filter((item) => item.id !== category.id));
        }
    }
  return (
    <section className="categories-management-grid">
      {categories.map((category) => (
        <div key = {category.id}>
          <div
            className="categories-management-card"
            id={category.id}
            key={category.id}
          >
            <div className="img-container">
              <img
                src={category.img}
                alt={category.nombre}
              />
              <div className = "checkbox-container">
                {showCheckboxes?
                <Checkbox
                  checked={selectedCategories.some(
                    (selectedCategory) => category.id === selectedCategory.id
                  )}
                  onChange={(e) =>
                    handleCheckCategory({ checked: e.checked, category: category })
                  }
                />
                :null}
              </div>
            </div>
            <div className="namecontainer">
              <p className="category-card-name">{category.nombre}</p>
              <p className="category-card-name">Productos: {category.cantidad_products}</p>
            </div>
            <div className="action-buttons-container">
              <ActionButtons
                item={category}
                handleDelete={handleDeleteCategories}
                handleDetail={processDetailCategory}
                handleEdit={processUpdateCategory}
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
})

export default CategoriesGrid;
