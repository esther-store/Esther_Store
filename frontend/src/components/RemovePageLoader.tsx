import { pageLoaderId } from "@/constants"
import {useEffect} from "react"

export function RemovePageLoader(){
    useEffect(() => {
        const pageLoader = document.getElementById(pageLoaderId)
        pageLoader.style.display = 'none'
        return () => {
            pageLoader.style.display = 'flex'
        }
    },[])

    return null
}