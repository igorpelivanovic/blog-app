import { FaSearch } from "react-icons/fa";
import SearchBox from "./SearchBox";
import { useCallback, useState } from "react";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { AnimatePresence } from "framer-motion";


const SearchContainer = () => {

    const [ renderSearchBox, setRenderSearchBox ] = useState<boolean>(false)

    const onToggleRenderSearchBox = ()=>{
        setRenderSearchBox(prev => !prev)
    }

    const onHideSearchBox = useCallback(()=>{
        if(renderSearchBox) setRenderSearchBox(prev => !prev)
        return
    }, [renderSearchBox])

    const { ref } = useOutsideClick({fn: onHideSearchBox})

    return(
        <>
            <div ref={ref}>
                <button type="button" onClick={onToggleRenderSearchBox} className="flex bg-black size-[30px] text-white justify-center items-center border-[1px] border-gray rounded-[4px]"><FaSearch /></button>
                <AnimatePresence mode="popLayout">
                    { renderSearchBox && <SearchBox />}
                </AnimatePresence>
            </div>
            
        </>
    )
}

export default SearchContainer