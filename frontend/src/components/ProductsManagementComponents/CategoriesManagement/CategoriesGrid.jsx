import ActionButtons from "../ProductList/ActionButtons";
import { Checkbox } from "primereact/checkbox";

function CategoriesGrid({
  categories,
  selectedCategories,
  setSelectedCategories,
  handleDeleteCategory,
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
                loading="lazy"
                src={category.img}
                alt={category.nombre}
              />
            </div>
            <div className="namecontainer">
              <p className="category-card-name">{category.nombre}</p>
            </div>
            <div className="action-buttons-container">
              <ActionButtons
                item={category}
                handleDelete={handleDeleteCategory}
                handleDetil={processDetailCategory}
                handleEdit={processUpdateCategory}
              />
              <Checkbox
                checked={selectedCategories.some(
                  (selectedCategory) => category.id === selectedCategory.id
                )}
                onChange={(e) =>
                  handleCheckCategory({ checked: e.checked, category: category })
                }
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default CategoriesGrid;
