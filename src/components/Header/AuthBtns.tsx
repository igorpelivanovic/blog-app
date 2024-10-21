import { memo } from "react"
import { useAuthModalStore } from "../../state/authPopUpStore"

const AuthBtns = () =>{

    const renderModal = useAuthModalStore(state=>state.show)

    return(
        <div className="flex gap-6 text-base font-semibold">
            <button onClick={()=>renderModal({isLogin: true})} className="p-1 capitalize">login</button>
            <button onClick={()=>renderModal({isLogin: false})} className="bg-black text-white py-1 px-5 capitalize rounded-md">register</button>
        </div>
    )
}

export default memo(AuthBtns)