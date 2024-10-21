import { FC } from "react";
import { useGetAuthUser } from "../query/auth/user";
import { Navigate, Outlet } from "react-router-dom";

const IsSingGuard: FC =  () => {

    const { data } = useGetAuthUser()

    return (
        <>
            { data ? <Outlet /> : <Navigate to={'/singin'} replace={true} />}
        </>
    )
}

export default IsSingGuard