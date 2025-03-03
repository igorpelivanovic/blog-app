import { ComponentProps, ReactNode } from "react";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { IoMdCheckboxOutline } from "react-icons/io";
import { IoMdSquareOutline } from "react-icons/io";

type CheckBoxProps<T extends FieldValues> = ComponentProps<'input'> & {
    formId?: string
    name: FieldPath<T>
    label?: string
}

const CustomCheckBox = <T extends FieldValues = any,>( {  name, formId = '', label }: CheckBoxProps<T> ): ReactNode => {
    
    const { register, watch } = useFormContext<T>()
    
    return (
        <label htmlFor={formId.concat(name)} className="cursor-pointer w-fit mb-5">
            <input type="checkbox" className="hidden" /* defaultChecked={field.value} */ {...register(name)} id={formId.concat(name)} />
            <div className="flex items-center gap-2">
                <div>
                    <span className="flex text-[18px]">
                        {watch(name) ? <IoMdCheckboxOutline />: <IoMdSquareOutline />}
                    </span>
                </div>
                {label && (
                    <div>
                        <p className="text-base first-letter:capitalize">{label}</p>
                    </div>
                )}
            </div>
        </label>
    )
}

export default CustomCheckBox