import { ComponentProps, useMemo } from "react"
import { FieldPath, FieldValues, useFormContext } from "react-hook-form"
import FormErrorMsg from "./FormErrorMsg"
import classNames from "classnames"

type CustomTextAreaProps<T extends FieldValues> = ComponentProps<'textarea'> & {
    label?: string
    name: FieldPath<T>
    formId?: string 
    showError?: boolean
}


const CustomTextArea = <T extends FieldValues = any, > ( { showError = true, formId="", label, name, ...props }: CustomTextAreaProps<T>) => {

    const { register, formState: {errors} } = useFormContext<T>()

    const idElement = useMemo(()=>formId.concat(name), [formId, name])

    return (
        <label htmlFor={idElement} className="relative block">
            {label && <span className={classNames("capitalize mb-1 block text-sm", {'text-red-600': errors[name]?.message})} >{label}</span>}
            <textarea {...props} {...register(name)} id={idElement} className={classNames("w-full resize-none block h-52 border rounded-md outline-none p-2", errors[name]?.message ? "border-red-600" : "border-black")}></textarea>
            { errors[name]?.message && showError && <FormErrorMsg msg={errors[name].message.toString()} />}
        </label>
    )
}

export default CustomTextArea