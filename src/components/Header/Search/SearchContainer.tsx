import { useForm } from "react-hook-form"
import DropDownContainer from "../../DropDownContainer"
import SearchResultsContainer from "./SearchResultsContainer"
import { z } from "zod"
import { SearchFormSchema } from "../../../validation/searchForm"
import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useOutsideClick } from "../../../hooks/useOutsideClick"
import { useSearchValue } from "../../../hooks/useSearchFromValue"
import SearchForm from "./SearchForm"

type FormSearch = z.infer<typeof SearchFormSchema>

const SearchContainer = () => {

    const searchValue = useSearchValue() || ""

    const form = useForm<FormSearch>({
        defaultValues: {
            search: searchValue
        },
        resolver: zodResolver(SearchFormSchema),
        mode: "onChange"
    })

    useEffect(()=>{
        if(form.formState.isDirty) clickInSideHandle()
    }, [form.watch('search'), form.formState.isDirty])


    const [ searchContainerInFocus, setSearchContainerInFocus ] = useState<boolean>(false) 

     const renderDropDown = useMemo(()=>{
        return searchContainerInFocus && form.formState.isValid
    }, [searchContainerInFocus, form.formState.isValid]) 

    const clickOutSideHandle = useCallback(():void=>{
       setSearchContainerInFocus(false)
        return
    }, [])

    const clickInSideHandle = useCallback(():void=>{
        setSearchContainerInFocus(true)
        return
    }, [])

    const { ref } = useOutsideClick({clickOutSideFn: clickOutSideHandle})

    return(
        <div ref={ref} className="w-4/5 max-w-xl relative self-stretch content-center">
            <SearchForm form={form} onSubmitHandle={clickOutSideHandle}  />
            {renderDropDown &&
                <DropDownContainer className="top-full left-0 rounded-md w-full translate-x-0 gap-3 py-2">
                    <SearchResultsContainer searchValue={form.watch('search')}  />
                </DropDownContainer>
            }
        </div>
    )
}

export default memo(SearchContainer)