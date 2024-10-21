import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useId, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../ui/Form/Input";
import TextArea from "../ui/Form/TextArea";
import MultiSelectInput from "../ui/Form/MultiSelectInput";
import { useGetTags } from "../../query/tags/useAllTagsQuery";
import ImageInput from "../ui/Form/ImageInput";
import { filterChangeFormFields } from "../../utils/filterChangeFormFields";
const ACCEPTED_IMAGE_TYPES: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp',]
const MAX_FILE_SIZE = 5000000

const ManagePostFormSchema = z.object({
    title: z.string(),
    body: z.string(),
    image: z.custom<File[]>().refine(file=> file?.length > 0 ? ACCEPTED_IMAGE_TYPES.includes(file[0].type) : true, {message: 'prva'}).refine(file=>file?.length ? file[0].size <= MAX_FILE_SIZE : true),
    tags: z.array(z.object({
        tag: z.string()
    }))
})  

export type ManageForm = z.infer<typeof ManagePostFormSchema>

export type DefaultValueFormProps = Omit<ManageForm, 'image' | 'tags'> & {
    image?: string
    tags: string[]
}

export type ManagePostFormSubmitData = Omit<DefaultValueFormProps, 'image'> & {
    image: File | undefined
}



type ManagePostFormProps = {
    defaultValue?: DefaultValueFormProps
    onlyDirtySubmit?: boolean
    onSubmit: (data: ManagePostFormSubmitData)=>void
}

const ManagePostForm: FC<ManagePostFormProps> = ( { defaultValue, onSubmit, onlyDirtySubmit = false }) => {

    const { data: tags} = useGetTags()

    if(!tags) return

    const formatOptionsTags: ManageForm['tags'] = useMemo(()=>tags.map(el=>({tag: el})), [JSON.stringify(tags)])

    const formatDefaultTags: ManageForm['tags'] = useMemo(()=>formatOptionsTags.filter(opt=>defaultValue?.tags.includes(opt.tag)), [JSON.stringify([...formatOptionsTags, defaultValue?.tags])])

    const { handleSubmit, control, resetField, formState: {errors, dirtyFields} } = useForm<ManageForm>({
        defaultValues: {...defaultValue, image: undefined, tags: formatDefaultTags},
        resolver: zodResolver(ManagePostFormSchema)
    })

    const formId = useId();

    const onSubmitForm: SubmitHandler<ManageForm> = (data) => {
        const filterData = onlyDirtySubmit ? filterChangeFormFields(data, dirtyFields) : data
        const formatData = {...filterData, tags: filterData.tags?.map(el=>el.tag) || [], image: data.image?.[0]}
        onSubmit(formatData)
    }

 
    return (
        <div>
            {JSON.stringify(errors)}
            <form onSubmit={handleSubmit(onSubmitForm)} className="flex w-full gap-5" >
                <div className="basis-8/12 flex-shrink-0">
                    <Input control={control} name="title" formId={formId} resetField={resetField} />
                    <TextArea<ManageForm> control={control} name="body" formId={formId} />
                </div>
                <div className="flex-grow ">
                    <div>
                        <ImageInput imgSrc={defaultValue?.image} control={control} className="flex-col" name="image" formId={formId} resetField={resetField} >
                            {(imgUrl)=>(
                                <div className="w-full aspect-5/3">
                                    <img src={imgUrl} className="object-cover w-full h-full" />
                                </div>
                            )}
                        </ImageInput>
                        <MultiSelectInput<ManageForm> control={control} name="tags" options={formatOptionsTags} searchField={'tag'} />
                    </div>
                    <div>
                        <button type="submit">
                            create
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ManagePostForm