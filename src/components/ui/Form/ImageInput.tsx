import { Control, FieldPath, FieldValues, useController, UseFormResetField } from "react-hook-form"
import { ComponentProps, PropsWithChildren, ReactNode, useState } from "react"
import { twMerge } from "tailwind-merge"
import noUserImg from '../../../assets/images/no-user-img.png';

type ImageInputProps<T extends FieldValues> = {
    control: Control<T>
    name: FieldPath<T>
    formId: string
    accept?: string
    resetField: UseFormResetField<T>
    className?: string
    imgSrc?: string
    placeHolderImg?: string 
    label?: string
    children?: (imgUrl: string) => React.ReactNode
}

const defaultStyleContainer: string = "mb-5 flex gap-4"


const ImageInput =<T extends FieldValues = any,> ({resetField, control, name, formId, label, className, placeHolderImg = noUserImg, imgSrc, children }: ImageInputProps<T>) => {

    const { field: { value, ...otherField }, formState } = useController({control, name})

    const [fileUrl, setFileUrl] = useState<string>(imgSrc || placeHolderImg)

    const onClickRemoveBtn = () => {
        resetField(name)
        setFileUrl(placeHolderImg)
        return
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void=>{
        if(e.target.files) setFileUrl( URL.createObjectURL(e.target.files?.[0]));
        otherField.onChange(e.target.files)
        return
    }

    return (
        <div className={twMerge(defaultStyleContainer, className)}>
            <label htmlFor={formId.concat(name)} className="cursor-pointer w-full block">
                {children ? children(fileUrl): <p>{fileUrl}</p>}
                {/* <div className="size-20 rounded-full border-4 border-black overflow-hidden flex justify-center items-center">
                    <img src={fileUrl} alt="user_img" />
                </div> */}
                <input type="file" className={twMerge('hidden')} {...otherField} onChange={onChangeInput} id={formId.concat(name)} />
            </label>
            {formState.defaultValues?.[name] }
            <div>
                <button type="button" onClick={onClickRemoveBtn}>remove</button>
                {label && <p className="text-sm">{label}</p>}
            </div>
        </div>
    )
}

export default ImageInput
