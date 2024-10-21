import { ComponentProps, useMemo } from "react"
import { Control,FieldPath,FieldValues, useController } from "react-hook-form"
import FormErrorMsg from "./FormErrorMsg"

type TextAreaProps<T extends FieldValues> = ComponentProps<'textarea'> & {
    control: Control<T>
    name: FieldPath<T>
    label?: string
    renderError?: boolean
    formId?: string 
}

const TextArea = <T extends FieldValues,> ( {control, name, value, label, formId="", renderError = true, ...props}: TextAreaProps<T> ) => {

    const idElement = useMemo(()=>formId.concat(name), [formId, name])

    const { field, formState: {errors} } = useController({control, name})

    return (
        <label htmlFor={idElement}>
            {label && <span className="capitalize mb-1 block text-sm">{label}</span>}
            <textarea {...props} {...field} id={idElement}></textarea>
            { errors[name]?.message && renderError && <FormErrorMsg msg={errors[name].message.toString()} />}
        </label>
    )
}

export default TextArea