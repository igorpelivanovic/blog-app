import { useEffect, useRef } from "react";

type Props = {
    clickOutSideFn: (e: Event)=>void
    clickInSideFn?: (e: Event)=>void
}



function useOutsideClick({clickOutSideFn, clickInSideFn}: Props){
    const countainerRef = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        const handleClickFn = (e:MouseEvent) => {
            if(e.target instanceof Node && !countainerRef.current?.contains(e.target) && clickOutSideFn){ 
                clickOutSideFn(e)
                return
            }
            if(clickInSideFn) clickInSideFn(e)
        }
        document.addEventListener('mousedown', handleClickFn)
        return ()=>{
            document.removeEventListener('mousedown', handleClickFn)
        }
    }, [ clickOutSideFn, clickInSideFn ])
    return {ref: countainerRef}
}

export { useOutsideClick }