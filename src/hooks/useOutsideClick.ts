import { useEffect, useRef } from "react";

type Props = {
    fn: (e: Event)=>void
}

function useOutsideClick({fn}: Props){
    const countainerRef = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        const handleClickFn = (e:MouseEvent) => {
            if(e.target instanceof Node && !countainerRef.current?.contains(e.target)){ fn(e)}
        }
        document.addEventListener('mousedown', handleClickFn)
        return ()=>{
            document.removeEventListener('mousedown', handleClickFn)
        }
    }, [ fn ])
    return {ref: countainerRef}
}

export { useOutsideClick }