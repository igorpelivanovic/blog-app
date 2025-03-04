import { ChangeEventHandler, ComponentProps, ReactNode, useEffect, useRef, useState } from "react"
import { FieldPath, FieldValues, useFormContext } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import FormErrorMsg from "./FormErrorMsg";
import classNames from "classnames";

type ChildrenPropsFnArgs = {
    img: string | undefined, 
    add: ()=>void
    remove: ()=>void
    error: string | undefined
}

type ChildrenPropsFn = (props: ChildrenPropsFnArgs)=>ReactNode | undefined

type CustomImageInputProps<T extends FieldValues> = Omit<ComponentProps<'input'>, 'children'> & {
    formId?: string 
    name: FieldPath<T>
    children?: ChildrenPropsFn
    label?: string
    placeholderImg?: string
    initImg?: string
    acceptFiles?: string
}

const defaultStyleContainer: string = "mb-8 flex gap-4 relative"

const CustomImageInput = <T extends FieldValues = any,> ({children, acceptFiles, className, formId = "", name, initImg}: CustomImageInputProps<T>) => {

    const { register, resetField, getValues, formState: { errors, isDirty }, setValue } = useFormContext<T>()
    const [ fileUrl, setFileUrl] = useState<string | undefined>( initImg )

    const {onChange, ref, ...registerProps} = register(name)

    const inputRef = useRef<HTMLInputElement>()

    useEffect(()=>{
       if(getValues(name).length == 0) remove()
       return
    }, [getValues(name)])

    useEffect(()=>{
        setFileUrl(initImg)
        return
    }, [])

    const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e)=>{
        if(e.target.files) setFileUrl(()=> e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : undefined)
        onChange(e)
        return
    }

    const add = (): void=>{
        inputRef.current?.click()
        return
    }

    const remove = (): void=>{
        if(isDirty){
            resetField(name)
        }else{
            setValue(name, null as any)
        }
        setFileUrl(undefined)
        return
    }

    return (
        <div className={twMerge(defaultStyleContainer, className)}>
            <div className={classNames("cursor-pointer w-full block")}>
                {children && children({img: fileUrl, add, remove, error: errors[name]?.message?.toString()} )}
                <input accept={acceptFiles} type="file" className={twMerge('hidden')} {...registerProps} ref={(e)=>{
                    ref(e)
                    inputRef.current = e as HTMLInputElement
                }} onChange={onChangeInput} id={formId.concat(name)} />
            </div>
            { errors[name]?.message && <FormErrorMsg className="left-0" msg={errors[name].message.toString()} />}
        </div>
    )
}

export default CustomImageInput