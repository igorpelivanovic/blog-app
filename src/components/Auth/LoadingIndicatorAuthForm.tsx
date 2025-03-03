import { FC, memo } from "react";
import LoadSpinner from "../Loader";

const LoadingIndicatorAuthForm: FC = ()=>{
    return (
        <div className="absolute w-full h-full content-center bg-black bg-opacity-40 top-0 left-0 z-50">
                <LoadSpinner className="text-4xl" />
        </div>
    )
}

export default memo(LoadingIndicatorAuthForm)