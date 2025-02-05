import {useState, useEffect} from 'react'
import './index.css'
import {LeftChevronIcon} from '@/icons/LeftChevronIcon'

export default function ButtonGoTop(){
    const [showButton, setShowButton] = useState(false)
    const [showHideAnimation, setShowHideAnimation] = useState(false)
    const scrollTrigger = 100

    //function that focus on the start of the page
    function goTop(){
        window.scrollTo({top:0, left:0, behavior:"smooth"})
    }

    //function that detect when scroll is higher than x and show the button go top
    function showOrHideButton(){
        if(window.scrollY >= scrollTrigger){
            setShowHideAnimation(false)
            setShowButton(true)
        }
        else{
            setShowHideAnimation(true)
        }
    }

    useEffect(() => {
        //first check to show the button on page reload, when still the user hasn't made any scroll
        window.scrollY >= scrollTrigger? setShowButton(true): setShowButton(false)
        window.addEventListener("scroll", showOrHideButton)
        return () => {
            window.removeEventListener("scroll", showOrHideButton)
        }
    },[])

    return(showButton?
        <div>
            <button id = "button-scroll-top" className = {`button-scroll-top ${showHideAnimation?'hide':''}`} onClick={() => goTop()}>
                <LeftChevronIcon color = "#D9658F" width={30} height={30}/>
            </button>
        </div>:null
    )
}