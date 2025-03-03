import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { useAuthModalStore } from "../state/authPopUpStore";
import AuthModal from "../components/Auth/AuthModal";
import AlertsContainer from "../components/alerts/AlertsContainer";

const AppLayout: FunctionComponent = () => {
    
    const isRenderAuth: boolean = useAuthModalStore((state)=>state.isRender)

    return (
        <> 
            <Outlet />
            <AlertsContainer />
            {isRenderAuth && <AuthModal />}
        </>
    )
}

export default AppLayout