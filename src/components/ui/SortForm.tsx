import { FC, memo, useCallback, useEffect } from "react";
import RadioInput from "./Form/RadioInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { sortByValues } from "../../api/posts";
import { zodResolver } from "@hookform/resolvers/zod";

const sortByOptions: Record<typeof sortByValues[number], Record<'label', string>> = {
    views: {
        label: "popular"
    },
    id: {
        label: "default"
    }
}

const formValidate = z.object({
    sortBy: z.enum(sortByValues)
})

export type FormT = z.infer<typeof formValidate>

type SortFormProps = {
    onChange: (data: FormT) => void 
    defaultValue?: FormT
}

const defaultValueForm: FormT = {
    sortBy: sortByValues[0]
}

const SortForm: FC<SortFormProps> = ({ onChange, defaultValue = defaultValueForm }) => {

    const { control, handleSubmit, watch } = useForm<FormT>({
        defaultValues: defaultValue,
        resolver: zodResolver(formValidate)
    })

    useEffect(()=>{
        onChange(watch())
    }, [JSON.stringify(watch())])


    const onSubmitForm: SubmitHandler<FormT> = useCallback((data) => {
        onChange(data)
        return
    }, [onChange])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <div className="flex gap-2">
                    {sortByValues.map((val)=><RadioInput<FormT> key={val} className="hidden" name="sortBy" label={sortByOptions[val].label} control={control} value={val}/>)}
                </div>
            </form>
        </div>
    )
}

export default memo(SortForm)