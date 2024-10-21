import { ComponentProps } from "react";
import { Control, FieldPath, FieldValues, Path, PathValue, useController } from "react-hook-form";

type RadioInputProps<T extends FieldValues> = {
    label?: string
    control: Control<T>
    name: FieldPath<T>
    value: PathValue<T, Path<T>>
} & Omit<ComponentProps<'input'>, 'type' | 'name' | 'value' >

const RadioInput = <T extends FieldValues>( { label, value, control, name, ...props }: RadioInputProps<T> ) => {

    const { field } = useController({control, name})

    return (
        <div>
            <label htmlFor={props.id} className="bg-red-500 py-1 px-4 block rounded-md cursor-pointer">
                <input type="radio" {...field} {...props} value={value} defaultChecked={field.value === value}   />
                {label && <span className="capitalize font-semibold text-sm">{label}</span>}
            </label>
        </div>
    )
}

export default RadioInput