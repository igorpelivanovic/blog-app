import { FC } from "react";
import { useGetAuthUser } from "../query/auth/user";
import { Navigate, Outlet } from "react-router-dom";

const NotSingGuard: FC = () => {
    
    const { data } = useGetAuthUser()

    return (
        <>
            { data ? <Navigate to={'/'} replace={true} /> : <Outlet /> }
        </>
    )
}

export default NotSingGuard