import ReactPaginate from "react-paginate";
import RightArrow from "../../assets/chevron-right-24.svg";
import LeftArrow from "../../assets/chevron-left-24.svg";
import React from "react";
import "./index.css";

const Paginator = React.memo(function Paginator({
  count,
  itemsLength,
  getActiveFilter,
  setFilter,
  removeFilter
}) {
  
  const filterPageValue = getActiveFilter('page')
  const currentPage = filterPageValue === ''? 1 : parseInt(filterPageValue)

  return (
    <ReactPaginate
      className={itemsLength > 0 ? "paginator" : "paginator-invisible"}
      activeClassName={"page-active"}
      pageClassName={"page"}
      nextLinkClassName={"next-page-button"}
      previousLinkClassName={"previous-page-button"}
      breakClassName={"page"}
      pageCount={Math.ceil(count / 14)}
      pageRangeDisplayed={3}
      previousLabel={<img src={LeftArrow.src} />}
      nextLabel={<img src={RightArrow.src} />}
      breakLabel={"..."}
      marginPagesDisplayed={1}
      onPageChange={(page) => {
        document.querySelector("body").scrollIntoView({ top: 0 });
        if(page.selected === 0){
          removeFilter('page')
        }else{
          setFilter({ name: "page", value: page.selected + 1 });
        }
      }}
      disableInitialCallback={true}
      forcePage={currentPage - 1}
    />
  );
});

export default Paginator;
