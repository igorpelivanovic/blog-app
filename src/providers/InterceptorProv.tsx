import { FC, PropsWithChildren } from "react";
import { useTokenExpiredInterception } from "../hooks/useAuthTokenExpiredInterception";

const InterceptorProv: FC<PropsWithChildren> = ({children}) => {

    const isInit = useTokenExpiredInterception()

    return (
        <>
            { isInit && children}
        </>
    )
}

export default InterceptorProv