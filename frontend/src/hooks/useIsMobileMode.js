import React, { useState, useEffect } from "react";

export function useIsMobileMode({forceMobileMode = false, mobileWidth = 830}){
    const [mobileMode, setMobileMode] = useState(window.innerWidth > mobileWidth && forceMobileMode === false?false:true);
    //effect to capture the window's width
    useEffect(() => {
        if(forceMobileMode === false){
        const handleResize = () => {
            if(window.innerWidth <= mobileWidth && !mobileMode){
            setMobileMode(true);
            }
            if(window.innerWidth > mobileWidth && mobileMode){
            setMobileMode(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
        }
    });
    return ({mobileMode})
}