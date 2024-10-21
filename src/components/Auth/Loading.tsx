import { FC, memo } from "react";
import LoadSpinner from "../Loader";

const LoadingIndicatorAuthForm: FC = ()=>{
    return (
        <span className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-50">
                <LoadSpinner className="text-4xl" />
        </span>
    )
}

export default memo(LoadingIndicatorAuthForm)