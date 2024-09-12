import { useEffect, useRef } from "react";

type Props = {
    fn: (e:MouseEvent)=>void
}

function useOutsideClick({fn}: Props){
    const countainerRef = useRef<HTMLInputElement>(null)
    useEffect(()=>{
        const handleClickFn = (e:MouseEvent) => {
            if(e.target instanceof Node && !countainerRef.current?.contains(e.target)){ fn(e)}
        }
        document.addEventListener('click', handleClickFn)
        return ()=>{
            document.removeEventListener('click', handleClickFn)
        }
    }, [ fn ])
    return {ref: countainerRef}
}

export { useOutsideClick }