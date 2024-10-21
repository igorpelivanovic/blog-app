import { ComponentProps, FunctionComponent, ReactNode, useMemo, useState } from "react";
import { Control, useController, UseFormResetField } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import FormErrorMsg from "./FormErrorMsg";

type InputProps = ComponentProps<'input'> & {
    formId: string
    icon?: ReactNode
    control: Control<any>
    name: string
    label?: string 
    resetField: UseFormResetField<any>
}

const inputStyleDefault: string = "w-full outline-none border-none placeholder:capitalize"

const Input: FunctionComponent<InputProps> = ( { formId, icon, control, label, name, type='text', resetField, className, ...props } ) => {

    const { formState: {errors}, field } = useController({name, control})

    const [ showPassword, setShowPassword ] = useState<boolean>(false)

    const inputStyle = useMemo(()=>twMerge(inputStyleDefault, className), [className])

    return( 
        <label htmlFor={formId.concat(name)} className="cursor-pointer relative mb-8">
            {label && <span className="capitalize mb-1 block text-sm">{label}</span>}
            <div className="flex gap-2 items-center rounded-md border border-black py-1 px-[10px] "> 
                {icon && <span className="pr-2 py-1 border-r-2 border-black">{icon}</span>}
                <input type={showPassword ? 'text' : type} {...props} {...control.register(name)} id={formId.concat(name)} className={inputStyle} />
                {type === "password" && field.value?.toString() && (
                    <button type="button" onClick={()=>setShowPassword(val => !val)}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                )}
                {field.value?.toString() && (
                    <button type="button" onClick={()=>resetField(name)}>
                        <FaXmark />
                    </button>
                )}
            </div>
            { errors[name]?.message && <FormErrorMsg msg={errors[name].message.toString()} />}
        </label>
    )
}

export default Input