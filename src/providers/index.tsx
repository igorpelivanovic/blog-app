import { FunctionComponent } from "react";
import QueryClientProv from "./QueryClientProv";
import RouterProv from "./RouterProv";
import InterceptorProv from "./InterceptorProv";
import {  } from "react-query";

const AppProviders: FunctionComponent = () => {
    return (
        <>
            <QueryClientProv>
                <InterceptorProv> 
                    <RouterProv />
                </InterceptorProv>
            </QueryClientProv>
        </>
    )
}

export default AppProviders