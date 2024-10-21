import { useMemo } from "react"
import { RiLoader3Fill } from "react-icons/ri"
import { twMerge } from "tailwind-merge"

type LoadSpinnerProps = {
    className?: string
}

const loaderDefaultStyleClass: string = "mx-auto text-3xl animate-rotate-full-linear loading-spinner"

const LoadSpinner = ({ className }: LoadSpinnerProps)=>{

    const mergeStyleClass = useMemo(()=>twMerge(loaderDefaultStyleClass, className),[className])

    return(
        <>
            <RiLoader3Fill className={mergeStyleClass}/>
        </>
    )
}

export default LoadSpinner
