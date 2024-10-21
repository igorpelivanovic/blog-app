import { ComponentProps, FC, ReactNode } from "react";
import { Control, FieldPath, FieldValue, FieldValues, useController } from "react-hook-form";
import { IoMdCheckboxOutline } from "react-icons/io";
import { IoMdSquareOutline } from "react-icons/io";

type CheckBoxProps<T extends FieldValues> = ComponentProps<'input'> & {
    control: Control<T>
    formId: string
    name: FieldPath<T>
    label?: string
}

const CheckBox = <T extends FieldValues = any,>( { control, name, formId, label }: CheckBoxProps<T> ): ReactNode => {
    
    const { field } = useController({
        control,
        name
    })
    
    return (
        <label htmlFor={formId.concat(name)} className="cursor-pointer w-fit mb-5">
            <input type="checkbox" className="hidden" defaultChecked={field.value} {...field} id={formId.concat(name)} />
            <div className="flex items-center gap-2">
                <div>
                    <span className="flex text-[18px]">
                        {field.value ? <IoMdCheckboxOutline />: <IoMdSquareOutline />}
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

export default CheckBox