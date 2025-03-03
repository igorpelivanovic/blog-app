import { FC, PropsWithChildren } from "react";
import { useAuthInterception } from "../interceptors/useAuthInterceptor";


const InterceptorProv: FC<PropsWithChildren> = ({children}) => {

    const isInitAuthinterceptor = useAuthInterception()

    return (
        <>
            { isInitAuthinterceptor && children}
        </>
    )
}

export default InterceptorProv