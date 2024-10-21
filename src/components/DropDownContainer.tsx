import { HTMLMotionProps, motion } from "framer-motion"
import React, { forwardRef, memo, useMemo } from "react"
import { twMerge } from "tailwind-merge"


const animateConfigData: HTMLMotionProps<'div'> = {
    variants: {
        fadeOut: {
            opacity: 0,
            maxHeight: 0,
            transition: {
                duration: .4,
                ease: 'easeInOut',
                opacity: {
                    duration: .2,
                    ease: 'easeInOut'
                }
            }
        },
        fadeIn: {
            opacity: 1,
            maxHeight: "560px",
            transition: {
                duration: .4,
                ease: 'easeInOut',
                opacity: {
                    duration: .4,
                    ease: 'easeInOut'
                }
            }
        }
    },
    initial: 'fadeOut',
    animate: 'fadeIn',
    exit: 'fadeOut'
}

const motionContainerDefaultStyleData : string = "absolute top-0 overflow-hidden left-1/2 -translate-x-1/2 w-3/5 bg-white rounded-b-lg px-5 flex flex-col justify-end gap-8 box-shadow-1 z-10"

type DrowDownContainerPropDefault = {
    motionData: HTMLMotionProps<'div'>
}

const DrowDownContainerPropDefault: DrowDownContainerPropDefault = {
    motionData: animateConfigData,
}

type ForwardRefProp = {
    children: React.ReactNode
    className?: string 
} & Partial<DrowDownContainerPropDefault>

type DropDownContainerProps = ForwardRefProp 

type ForwardRefType = HTMLDivElement


const DropDownContainer = forwardRef<ForwardRefType, ForwardRefProp >(({ children, motionData = DrowDownContainerPropDefault.motionData, className }: DropDownContainerProps , ref ) => {
    const mergeStyleClass = useMemo(()=> twMerge(motionContainerDefaultStyleData, className), [className])

    return(
        <motion.div layout ref={ref} className={mergeStyleClass} {...motionData} >
            {children}
        </motion.div>
    )
})

export default memo(DropDownContainer)

