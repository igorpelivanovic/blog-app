import { ComponentProps, ReactNode, useState } from "react";
import { FieldPath, FieldValues, useFormContext, UseFormReturn } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import FormErrorMsg from "./FormErrorMsg";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

type CustomInputProps<T extends FieldValues> = ComponentProps<'input'> & {
    label?: string
    formId?: string
    name: FieldPath<T>
    icon?: ReactNode
    renderClearButton?: boolean 
}

const inputStyleDefault: string = "w-full outline-none border-none placeholder:capitalize";

const CustomInput = <T extends FieldValues = any, > ( { renderClearButton = true, label, formId="", name, icon, type, className, ...props }: CustomInputProps<T>) => {

    const { register, watch, setValue, formState: {errors} }: UseFormReturn<T> = useFormContext()

    const [ showPassword, setShowPassword] = useState<boolean>(false)

    return (
        <label htmlFor={formId.concat(name)} className="cursor-pointer relative mb-8">
            {label && <span className={classNames("capitalize mb-1 block text-sm", {'text-red-600': errors[name]?.message })}>{label}</span>}
            <div className={classNames("flex gap-2 items-center rounded-md border  py-1 px-[10px]", errors[name]?.message ? 'border-red-600' : 'border-black')}> 
                {icon && <span className="pr-2 py-1 border-r-2 border-black">{icon}</span>}
                <input type={showPassword ? 'text' : type} {...props} {...register(name)} id={formId.concat(name)} className={twMerge(inputStyleDefault, className)} />
                {type === "password" && watch(name) && (
                    <button type="button" onClick={()=>setShowPassword(val => !val)}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                )}
                {watch(name) && renderClearButton && (
                    <button type="button" onClick={()=>setValue(name, "" as any)}>
                        <FaXmark />
                    </button>
                )}
            </div>
            {errors[name]?.message && <FormErrorMsg msg={errors[name].message.toString()} />}
        </label>
    )
}

export default CustomInput