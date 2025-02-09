import { pageLoaderId } from "@/constants"
import {useEffect} from "react"

export function RemovePageLoader(){
    useEffect(() => {
        const pageLoader = document.getElementById(pageLoaderId)
        if(pageLoader) pageLoader.style.display = 'none'
        return () => {
            if(pageLoader) pageLoader.style.display = 'flex'
        }
    },[])

    return null
}