import { FC, ReactElement, useMemo } from "react";
import { ErrorBoundaryHttpHandleContent } from "../types/httpResponse";
import axios from "axios";
import { Link, useRouteError } from "react-router-dom";

type HttpErrorBounderyProps = {
    hanlder: ErrorBoundaryHttpHandleContent
}

type ErrorContent = Record<'message', string> & Partial<Record<'icon', ReactElement>>

const HttpErrorBounderyPage: FC<HttpErrorBounderyProps> = ( { hanlder }) => {

    const error = useRouteError()

    const errorContent: ErrorContent = useMemo(()=>{
        if(axios.isAxiosError(error) && error.status){
            return {
                message: hanlder[error.status].title,
                icon: hanlder[error.status].icon
            }
        }
        return {
            message: hanlder['default'].title,
        }
    }, [JSON.stringify(error)])




    return (
        <div className="w-full m-auto text-center ">
            {errorContent.icon && <span className="inline-flex justify-center items-center size-28 text-neutral-600 rounded-full overflow-hidden bg-neutral-200 border-neutral-500  border-4 text-5xl">{errorContent.icon}</span>}
            <p className="text-2xl mt-4 first-letter:capitalize">{errorContent.message}</p>
            <Link to='/' className="mt-10 inline-block py-1 px-5 rounded-lg text-lg first-letter:capitalize bg-neutral-300 transition-colors hover:bg-neutral-400 w-fit">go home</Link>
        </div>

    )


} 

export default HttpErrorBounderyPage
