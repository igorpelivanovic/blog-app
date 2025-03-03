import { memo } from "react"
import { useAuthModalStore } from "../../state/authPopUpStore"
import { FaUser, FaUserPlus } from "react-icons/fa"

const AuthBtns = () =>{

    const renderModal = useAuthModalStore(state=>state.show)

    return(
        <div className="flex gap-6 text-base font-semibold">
            <button onClick={()=>renderModal({isLogin: true})} className="p-1 capitalize flex gap-1 items-center">
                <span>
                    <FaUser />
                </span>
                    login
            </button>
            <button onClick={()=>renderModal({isLogin: false})} className="bg-neutral-400 transition-colors hover:bg-neutral-500 text-white py-1 px-4 capitalize rounded-md flex gap-1 items-center">
                <span>
                    <FaUserPlus />
                </span>
                    register
            </button>
        </div>
    )
}

export default memo(AuthBtns)