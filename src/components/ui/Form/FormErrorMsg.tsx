import { FunctionComponent, memo } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

type FormErrorMsgProps = {
    msg: string
    className?: string
}

const defaultContainerStyle: string = "absolute top-full mt-1"

const FormErrorMsg: FunctionComponent<FormErrorMsgProps> = ( { msg, className } ) => {

    const styleContainer = twMerge(defaultContainerStyle, className)

    return(
        <div className={styleContainer}>
            <p className="inline-flex items-center gap-1 pl-1 ">
                <FaCircleExclamation /><span className="first-letter:capitalize">{msg}</span>
            </p>
        </div>
    )
}

export default memo(FormErrorMsg)