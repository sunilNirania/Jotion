import { useState, useEffect } from "react";

export const UseScrollTop = (threshold = 10) => {
    const[scrolled,setScrolled] = useState(false)

    function handleScroll(){
        if(window.scrollY>threshold)
            setScrolled(true)
        else    
            setScrolled(false)
        }
        
    useEffect(() => {
        window.addEventListener("scroll",handleScroll)
        return () => window.addEventListener("scroll",handleScroll)
    },[threshold])

    return scrolled
}