import { useCallback, useState } from "react"
import { useOutsideClick } from "../../hooks/useOutsideClick"
import UserMenu from "./UserMenu"
import { AnimatePresence } from "framer-motion"

const UserPreview = () => {

    const [ renderUserMenu, setRenderUserMenu ] = useState<boolean>(false)

    const onClickoutSideHandle = useCallback(()=>{
        if(renderUserMenu) setRenderUserMenu(prev=>!prev)
        return
    }, [renderUserMenu])
    
    const { ref } = useOutsideClick({fn: onClickoutSideHandle})

    const onClickButtonHandle = ()=>{
        setRenderUserMenu(prev=>!prev)
        return
    }

    return(
        <div className="relative self-stretch content-center" ref={ref}>
            <button type="button" onClick={onClickButtonHandle} className="flex gap-3 items-center hover:bg-gray-200 py-1 pl-3 pr-1 rounded-full">
                <span className="font-semibold">nickname</span>
                <img className="bg-black rounded-full size-9 border-2 border-black" src="https://avatar.iran.liara.run/public" alt="user_avatar" />
            </button>
            <AnimatePresence>
                {renderUserMenu && <UserMenu  />}
            </AnimatePresence>
        </div>
    )
}

export default UserPreview