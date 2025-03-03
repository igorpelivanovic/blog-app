import { useCallback, useMemo, useState } from "react"
import { ArrayPath, FieldArray, FieldArrayPath, FieldPath, FieldValues, useFieldArray, useFormContext } from "react-hook-form"
import { FaCircleXmark } from "react-icons/fa6"
import { useOutsideClick } from "../../../hooks/useOutsideClick"
import classNames from "classnames"
import FormErrorMsg from "./FormErrorMsg"

type CustomMiltiSelectProps<T extends FieldValues = any> = {
    name: FieldPath<T>
    label?: string
    placeholder?: string
    options: FieldArray<T, ArrayPath<T>>[]
}

const searchValueInit: string = ""

const CustomMultiSelect = <T extends FieldValues = any, > ( { name, options, label, placeholder }: CustomMiltiSelectProps<T> ) => {

    const { control, watch, formState: {errors} } = useFormContext<T>()

    const key = name as FieldArrayPath<T>

    const { fields, remove, append } = useFieldArray<T>({control, name: key })

    const [showOptionsContainer, setShowOptionsContainer] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>(searchValueInit)

    const watchFieldArray = watch(name)
    const checkedOptions = useMemo(()=>fields.map((_, index)=>watchFieldArray[index]).sort(), [fields, watchFieldArray]) 

    const activeOptions = useMemo(()=>options.filter(el=>!checkedOptions.includes(el)), [options, checkedOptions])

    const removeCheckedOpt = async (index: number)=>{
        remove(index)
        return
    }

    const clearSearchValue = useCallback(()=>{
        setSearchValue(searchValueInit)
        return
    }, [])

    const addCheckedOpt = async (opt: FieldArray<T, ArrayPath<T>>) => {
        append(opt)
        clickOutSideFn();
        clearSearchValue();
        return
    }

    const clickOutSideFn = useCallback((): void=>{
        setShowOptionsContainer(false)
        return
    }, [])
    
    const { ref } = useOutsideClick({clickOutSideFn})

    return(
        
        <div className="relative mb-8">
            {label && <label htmlFor={key} className={classNames("capitalize mb-1 block text-sm", {'text-red-600': errors[name]?.message})}>{label}</label>}
            <div className={classNames("flex gap-2 flex-wrap items-center border  p-1", showOptionsContainer ? 'rounded-t-md' : 'rounded-md',  errors[name]?.message ? 'border-red-600' : 'border-black')}>
                {checkedOptions.length > 0 && <div className="flex gap-2 flex-wrap max-h-60 overflow-auto">
                    {checkedOptions.map((field, index)=>(
                        <div key={field} className="inline-flex items-center gap-1 bg-stone-300 py-1 px-2 rounded text-sm">
                            <span className="title capitalize">{field}</span>
                            <button type='button' onClick={()=>removeCheckedOpt(index)} className="icon">
                                <FaCircleXmark />
                            </button>
                        </div>
                    ))}
                </div>}
                <div ref={ref} className="flex-1 basis-20">
                    <label htmlFor={key} className="flex  px-1 basis-40 flex-grow-1">
                        <input placeholder={placeholder} onFocus={()=>setShowOptionsContainer(true)} type="text" id={key} autoComplete="off" value={searchValue} onChange={e=>setSearchValue(e.target.value)} className="outline-none w-full block border-none bg-transparent" />
                        {searchValue.length > 0 && <button type="button" onClick={clearSearchValue}>
                            <FaCircleXmark />
                        </button>}
                        { errors[name]?.message && <FormErrorMsg className="left-0" msg={errors[name].message.toString()} />}
                    </label>
                    {showOptionsContainer && (
                        <div className="border border-black  overflow-hidden rounded-b-md pb-2 left-0 w-full border-t-0 fixed top-0 h-full z-50 py-5 px-3 bg-stone-400 bg-opacity-50
                                        lg:absolute lg:top-full lg:max-h-15 lg:h-auto lg:bg-white lg:p-0" >
                            <div className="h-full bg-white overflow-auto lg:max-h-32 flex flex-col gap-5 px-2 py-4 lg:p-0 border border-black rounded-lg lg:border-none  lg:block">
                                <div className="lg:hidden">
                                    <p className="text-center first-letter:capitalize text-xl">select tags</p>
                                </div>
                                <ul className="overflow-auto">
                                    {activeOptions.map(opt=>(
                                        <li key={opt?.toString()} onClick={()=>addCheckedOpt(opt)} className="px-1 cursor-pointer hover:bg-stone-200 transition-colors border-b py-1">
                                            <span className="first-letter:capitalize inline-block">{opt?.toString()}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="text-center lg:hidden">
                                    <button type="button" className="text-xl first-letter:capitalize bg-red-500 py-1 px-5 rounded-2xl" onClick={clickOutSideFn}>close</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        
    )
}

export default CustomMultiSelect
