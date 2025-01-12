import ReactPaginate from 'react-paginate';
import RightArrow from '../../assets/chevron-right-24.svg'
import LeftArrow from '../../assets/chevron-left-24.svg'
import './index.css'

function Paginator({numOfProducts, setFilter, getActiveFilter, products}) {
    return ( 
        <ReactPaginate
          className = {products.length > 0?"paginator":"paginator-invisible"}
          activeClassName = {"page-active"}
          pageClassName = {"page"}
          nextLinkClassName = {"next-page-button"}
          previousLinkClassName = {"previous-page-button"}
          breakClassName = {'page'}
          pageCount = {Math.ceil(numOfProducts/14)}
          pageRangeDisplayed = {3}
          previousLabel = {<img src = {LeftArrow.src}/>}
          nextLabel = {<img src = {RightArrow.src}/>}
          breakLabel = {"..."}
          marginPagesDisplayed = {1}
          onPageChange={(page) => {
            document.querySelector("body").scrollIntoView({top:0
            })
            setFilter({name:"page", value:page.selected + 1})
          }}
          disableInitialCallback = {true}
          initialPage={parseInt(getActiveFilter("page")) - 1}
        />    
     );
}

export default Paginator;