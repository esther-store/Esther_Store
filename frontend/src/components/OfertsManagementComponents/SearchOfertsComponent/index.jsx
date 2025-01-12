import './index.css';
import FilterIcon from "../../../assets/oferts-management-filter.svg";
import AddIcon from "../../../assets/oferts-management-add.svg";
import DeleteIcon from "../../../assets/oferts-management-delete.svg";
import SearchIcon from "../../../assets/search-icon.svg";

import { ToggleButton } from 'primereact/togglebutton';
import ViewToggleGrid from "../../../assets/view-toggle-grid.svg";
import ViewToggleList from "../../../assets/view-toggle-list.svg";
        
const options = [<i className='pi pi-table'></i>, <i className='pi pi-list'></i>]

function SearchOferts({
  setSearch,
  handleOnClickCreateButton,
  selectedOferts,
  confirmAll,
  show,
  handelOnChangeView,
  responsive,
  search,
  viewMode
}) {
  return (
    <search
      title="Sección de búsqueda"
      className={
        responsive
          ? "search-oferts-container -wrap600px"
          : "search-oferts-container"
      }
    >
      <form
        onSubmit={(event) => event.preventDefault()}
        className="search-oferts-form"
      >
        <img src={SearchIcon.src} width={"16px"} />
        <input
          placeholder="Buscar"
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </form>

      <div className="view-toggle-container-oferts">
        <img
          src={viewMode == 'table' ?ViewToggleGrid.src: ViewToggleList.src}
          onClick={handelOnChangeView}
        />
        </div>

      

      <button
        className="search-oferts-button"
        onClick={handleOnClickCreateButton}
      >
        <img src={AddIcon.src} alt="add" width={"13px"} />
        <p>Agregar</p>
      </button>

      <button
        className="search-oferts-button"
        onClick={() => {
          if (selectedOferts.length > 0) confirmAll(selectedOferts);
          else show("Debe seleccionar almenos un elemento", "warn");
        }}
      >
        <img src={DeleteIcon.src} alt="delete" width={"13px"} />
        <p>Eliminar</p>
      </button>
    </search>
  );
}

export default SearchOferts;
