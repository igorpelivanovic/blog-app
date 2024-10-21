import { useCallback, useMemo, useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { ArrayPath, Control, FieldArray, FieldArrayPath, FieldValues, useFieldArray } from "react-hook-form";


type MultiSelectInputProps<T extends FieldValues = any> = {
    control: Control<T>
    name:  FieldArrayPath<T>
    options: FieldArray<T, ArrayPath<T>>[]
    searchField: keyof FieldArray<T, ArrayPath<T>>
}

const MultiSelectInput = <T extends FieldValues = any,> ({ control, name, options, searchField }: MultiSelectInputProps<T> ) => {

    const { fields, append, remove } = useFieldArray({control, name})

    const [ searchValue, setSearchValue ] = useState<string>("")
    const [ showOptionsContianer, setShowOptionsContainer ] = useState<boolean>(false)

    const activeOptions: FieldArray<T, ArrayPath<T>>[] = useMemo(()=>{
        let arrayOfOptions: FieldArray<T, ArrayPath<T>>[] = options
        if(searchValue.length > 0){
            arrayOfOptions = arrayOfOptions.filter(opt=>opt[searchField]?.toString().startsWith(searchValue))
        }
        return arrayOfOptions.filter(opt=>!fields.some(el=>el[searchField] === opt[searchField]))
    }, [JSON.stringify([...options, ...fields, searchValue])])

    const clickOutSideFn = useCallback((): void=>{
        setShowOptionsContainer(false)
        return
    }, [])

    const addSelectedOption = useCallback((opt: FieldArray<T, ArrayPath<T>>)=>{
        append(opt)
        clickOutSideFn();
        clearSearchValue();
        return
    }, [])

    const clearSearchValue = useCallback(()=>setSearchValue(""), [])

    const removeSelectOption = useCallback((index: number)=>{
        remove(index)
        return
    }, [])

    const { ref } = useOutsideClick({clickOutSideFn})

    return(
            <div className="relative">
                <div className="flex gap-2 flex-wrap border border-black">
                    <div className="flex gap-2 flex-wrap max-h-60 overflow-auto">
                    {fields.sort().map((field, index)=>(
                        <div key={field.id} className="inline-flex items-center gap-1 bg-gray-500 py-1 px-2 rounded">
                            <span className="title capitalize">{field[searchField]?.toString()}</span>
                            <button type='button' onClick={()=>removeSelectOption(index)} className="icon">
                                <FaCircleXmark />
                            </button>
                        </div>
                    ))}
                    </div>
                    <div ref={ref}>
                        <label htmlFor="test" className="flex border border-black px-1 basis-40 flex-grow-1">
                            <input onFocus={()=>setShowOptionsContainer(true)} type="text" id='test' autoComplete="off" value={searchValue} onChange={e=>setSearchValue(e.target.value)} className="outline-none w-full block" />
                            {searchValue.length > 0 && <button type="button" onClick={clearSearchValue}>
                                <FaCircleXmark />
                            </button>}
                        </label>
                        {showOptionsContianer && (
                            <div className="border border-black absolute top-full left-0 w-full border-t-0 max-h-32 overflow-auto">
                                <ul>
                                    {activeOptions.sort().map(opt=>(
                                        <li key={opt[searchField]?.toString()} onClick={()=>addSelectedOption(opt)}>
                                            <span>{opt[searchField]?.toString()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
    )

}

export default MultiSelectInput