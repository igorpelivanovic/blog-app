import { FunctionComponent } from "react";
import { FaXmark } from "react-icons/fa6";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import SingInContainer from "./singin/SingInContainer";
import { useAuthModalStore } from "../../state/authPopUpStore";
import SingUpContainer from "./singup/SingUpContainer";


const AuthContainer: FunctionComponent = () => {

    const hideAuthPopUpContainer = useAuthModalStore((state)=>state.hide)
    
    const {ref: refContainer} = useOutsideClick({clickOutSideFn: hideAuthPopUpContainer})

    return(
        <div className="fixed bg-black inset-0 z-50 pop-up-container content-center">
            <div className="bg-white w-[500px] max-h-[600px] h-full mx-auto rounded-md relative content-center p-8" ref={refContainer}>
                <button type="button" className="absolute right-3 top-3 text-xl p-1" >
                    <FaXmark />
                </button>
                <div className="space-y-10 w-3/4 mx-auto">
                    <SingInContainer />
                    <SingUpContainer />
                </div>
            </div>
        </div>
    )
}

export default AuthContainer

//context ima vrednost za render close btn