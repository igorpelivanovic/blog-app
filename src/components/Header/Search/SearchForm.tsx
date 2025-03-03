import { FC, memo, useCallback } from "react"
import { SubmitHandler, UseFormReturn, useWatch } from "react-hook-form"
import { FaSearch } from "react-icons/fa"
import { FaCircleXmark } from "react-icons/fa6"
import { createSearchParams, NavigateFunction, useNavigate } from "react-router-dom"
import { z } from "zod"
import { SearchFormSchema } from "../../../validation/searchForm"


type SearchFormProps = {
    form: UseFormReturn<z.infer<typeof SearchFormSchema>>
    onSubmitHandle?: SubmitHandler<z.infer<typeof SearchFormSchema>>
}


const SearchForm: FC<SearchFormProps> = ({form, onSubmitHandle})=>{

    const { control, register, setValue, handleSubmit } = form

    const searchValue: string = useWatch({control, name: 'search'})
    const navigate: NavigateFunction = useNavigate()

    const clearSearchInput = useCallback((): void=>{
        setValue('search', '', { shouldValidate: true})
        return
    }, [])

    const onSubmitForm: SubmitHandler<z.infer<typeof SearchFormSchema>> = useCallback((data)=>{
        onSubmitHandle && onSubmitHandle(data)
        navigate({
            pathname: "/search",
            search: createSearchParams({
                q: searchValue
            }).toString(),
        })
        return 
    }, [searchValue, onSubmitHandle])


    return(
        <form className="flex border-stone-300 bg-white group border rounded-3xl overflow-hidden" onSubmit={handleSubmit(onSubmitForm)}> 
            <label htmlFor="search" className="flex items-center w-full rounded-md gap-1 px-4 py-2">
                <input {...register('search')} autoComplete="off" type="search" id="search" name="search" placeholder="search post..." className=" flex-1 w-full outline-none placeholder:capitalize bg-transparent" />
                {searchValue.length > 0 && 
                    <button type="button" className="text-stone-500 rounded-full overflow-hidden" onClick={clearSearchInput}>
                        <FaCircleXmark />
                    </button>}
            </label>
            <button type="submit" className=" hover:bg-neutral-500 bg-neutral-400 text-background px-4 text-base">
                <FaSearch />
            </button>
        </form>
    )
}

export default memo(SearchForm)