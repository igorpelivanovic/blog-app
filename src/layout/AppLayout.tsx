import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { useAuthModalStore } from "../state/authPopUpStore";
import AuthModal from "../components/Auth/AuthModal";

const AppLayout: FunctionComponent = () => {
    

    const isRenderAuth: boolean = useAuthModalStore((state)=>state.isRender)

    return (
        <> 
            <Outlet />
            {isRenderAuth && <AuthModal />}
        </>
    )
}

export default AppLayout