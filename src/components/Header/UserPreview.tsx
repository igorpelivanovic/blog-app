import { memo, useCallback, useState } from "react"
import { useOutsideClick } from "../../hooks/useOutsideClick"
import UserMenu from "./UserMenu"
import { AnimatePresence } from "framer-motion"
import { useGetAuthUser } from "../../query/auth/user"
import UserImg from "../ui/UserImg"

const UserPreview = () => {

    const [ renderUserMenu, setRenderUserMenu ] = useState<boolean>(false)

    const { data: userData } = useGetAuthUser()


    const onClickoutSideHandle = useCallback(()=>{
        if(renderUserMenu) setRenderUserMenu(prev=>!prev)
        return
    }, [renderUserMenu])
    
    const { ref } = useOutsideClick({clickOutSideFn: onClickoutSideHandle})

    if(!userData) return null

    const onClickButtonHandle = ()=>{
        setRenderUserMenu(prev=>!prev)
        return
    }


    return(
        <div className="relative self-stretch content-center" ref={ref}>
            <button type="button" onClick={onClickButtonHandle} className="sm:flex gap-3 items-center hover:bg-stone-300 hover:bg-opacity-40 py-1 sm:pl-3 pl-1 pr-1 rounded-full">
                <span className="font-semibold hidden sm:block text-text">{userData.username}</span>
                <UserImg idUser={userData.id} className="flex justify-center items-centerbg-black rounded-full size-9 border-2 border-stone-600" />
            </button>
            <AnimatePresence>
                {renderUserMenu && <UserMenu closeMenuFn={onClickoutSideHandle} />}
            </AnimatePresence>
        </div>
    )
}

export default memo(UserPreview)