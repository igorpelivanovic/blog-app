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

    const onClickButtonHandle = ()=>{
        setRenderUserMenu(prev=>!prev)
        return
    }

    return(
        <div className="relative self-stretch content-center" ref={ref}>
            <button type="button" onClick={onClickButtonHandle} className="flex gap-3 items-center hover:bg-gray-200 py-1 pl-3 pr-1 rounded-full">
                <span className="font-semibold">{userData?.username}</span>
                <UserImg className="bg-black rounded-full size-9 border-2 border-black" />
            </button>
            <AnimatePresence>
                {renderUserMenu && <UserMenu closeMenuFn={onClickoutSideHandle} />}
            </AnimatePresence>
        </div>
    )
}

export default memo(UserPreview)