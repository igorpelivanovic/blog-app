import { ReactNode } from "react"
import { FieldValues, useFormContext, UseFormReturn } from "react-hook-form"

type ActionContainerProps<T extends FieldValues> = {
    children: (param: UseFormReturn<T>)=>ReactNode
}

const ActionContainer = <T extends FieldValues = any,> ( { children }: ActionContainerProps<T> ) => {

    const formInstance: UseFormReturn<T> = useFormContext()

    return children(formInstance)
}

export default ActionContainer