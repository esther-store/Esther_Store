import ViewToggleGrid from "@/assets/icons/view-toggle-grid.svg";
import ViewToggleList from "@/assets/icons/view-toggle-list.svg";
import React from "react";

const ViewToggle = React.memo(function ViewToggle({listView, setListView}) {
    return ( 
        <div className="view-toggle-container">
          <span>Vista:</span>
          <img
            src={listView ? ViewToggleGrid.src : ViewToggleList.src}
            onClick={() => setListView(!listView)}
          />
        </div>
     );
})

export default ViewToggle;