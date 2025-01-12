import './index.css' 
import React, {useState, useEffect, useContext} from 'react'
import SearchIcon from '../../../assets/search-icon.svg'

function SearchProducts({onHandleChange,search}) {
    const [mounted, setMounted] = useState(false)
    const [searchInput,setSearchInput] = useState(search)

    useEffect(() => {
        if(mounted){
            let timeOut = setTimeout(() => onHandleChange(searchInput), 500)
            return () => clearTimeout(timeOut)
        }
        else{
            setMounted(true)
        }
    },[searchInput])


    return (
        <form onSubmit={(e) => e.preventDefault()} className = "search-form">
        <img src={SearchIcon.src} />
        <input
            placeholder="Buscar"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            style={{ color: "black" }}
        />
        </form>
    );
}

export default SearchProducts;
