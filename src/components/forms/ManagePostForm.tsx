import { FC, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useGetTags } from "../../query/tags/useAllTagsQuery";
import FormContainer from "../ui/Form/FormContainer";
import CustomMultiSelect from "../ui/Form/CustomMultiSelect";
import CustomInput from "../ui/Form/CustomInput";
import CustomTextArea from "../ui/Form/CustomTextArea";
import CustomImageInput from "../ui/Form/CustomImageInput";
import ActionContainer from "../ui/Form/ActionContainer";
import { MenagePostFormSchema } from "../../validation";
import { filterChangeFormFields } from "../../utils/filterChangeFormFields";
import { FaCamera } from "react-icons/fa";
import { FaRotate, FaTrashCan } from "react-icons/fa6";
import classNames from "classnames";


export type ManageFormT = z.infer<typeof MenagePostFormSchema>

const defaultValues: ManageFormT = {
    body: '',
    tags: [],
    image: new DataTransfer().files,
    title: ''
}

export type DefaultValueFormProps = Omit<ManageFormT, 'image'> & {
    image?: string | null
}

export type ManagePostFormSubmitData = Omit<DefaultValueFormProps, 'image'> & {
    image: File | undefined
}

type ManagePostFormBaseProps = {
    defaultValue?: DefaultValueFormProps;
    submitBtnLabel?: string;
};

type DirtyFieldsSubmit  ={
    onlyDirtySubmit: true
    onSubmit: (data: Partial<ManageFormT>) => void
}
type AllFieldsSubmit  ={
    onlyDirtySubmit?: false
    onSubmit: (data: ManageFormT) => void
}



type ManagePostFormProps = ManagePostFormBaseProps & ( | AllFieldsSubmit | DirtyFieldsSubmit)


const ManagePostForm: FC<ManagePostFormProps> = ( { defaultValue, onSubmit, onlyDirtySubmit, submitBtnLabel = 'create' }) => {

    const { data: tags} = useGetTags()

    if(!tags) return


    const formatTags = useMemo(()=>tags.sort(), tags)

    const onSub = (data: ManageFormT , formInstance: UseFormReturn<ManageFormT>)=>{
        if (onlyDirtySubmit) {
            onSubmit(filterChangeFormFields(data, formInstance.formState.dirtyFields));
        } else {
        onSubmit(data);
        }       
        return
    }

    const {image, defValue} = useMemo(()=>{
        if(defaultValue){
            return (({image, ...other})=>({image: image ?? undefined, defValue: other}))(defaultValue)
        }
        return { image: undefined, defValue: {} }
    }, [JSON.stringify(defaultValue)])


    return (
            <FormContainer<ManageFormT> className="flex flex-1 flex-col lg:flex-row w-full gap-9 mb-10" onSubmit={onSub} formParams={{validation: MenagePostFormSchema, defaultValues: {...defaultValues, ...defValue}}} > 
                <div className="basis-8/12 flex-shrink-0 flex flex-col">
                    <CustomInput name="title" label="title" />
                    <CustomTextArea name="body" label="description" />
                </div>
                <div className="flex-grow flex flex-col ">
                    <div>
                        <CustomImageInput initImg={image} accept="" name="image" >
                            {
                                ({img, add, remove, error})=>(
                                    <>
                                        <div className={classNames("w-full aspect-5/3  relative group  border rounded-md overflow-hidden", error ? ' border-red-600' : 'bg border-black' )}>
                                            {img && <img src={img} className={classNames("absolute top-0 left-0 w-full h-full object-contain  -z-10", error ? 'bg-red-100' : 'bg-stone-400')} />}
                                            <div className={classNames("flex items-stretch h-full text-2xl bg-stone-300 bg-opacity-50 ", {"opacity-0 group-hover:opacity-100 transition-opacity": img})}>
                                                <button type="button" className="flex-1 flex items-center justify-center hover:bg-stone-500 hover:bg-opacity-50 transition-colors" onClick={add}>
                                                    {img ? <FaRotate /> : <FaCamera />} 
                                                </button>
                                                {
                                                    img && 
                                                    <button type="button" className="flex-1 flex items-center justify-center hover:bg-stone-500 hover:bg-opacity-50 transition-colors" onClick={remove}>
                                                        <FaTrashCan />
                                                    </button>
                                                }
                                                
                                            </div>
                                        </div>
                                    </>
                                    
                                )
                            }
                        </CustomImageInput>
                        <CustomMultiSelect<ManageFormT>  label={'tags'} name={'tags'} options={formatTags} />
                        </div>
                    <div className="mt-auto mb-0 sm:justify-end justify-center space-x-3 flex items-end fixed lg:static bottom-0 left-0 w-full lg:bg-transparent lg:border-0 bg-white py-3 border-t px-5 lg:p-0">
                        <ActionContainer>
                            {
                                ({reset, formState: { dirtyFields, isValid }})=>(
                                    <>
                                        <button type="button" onClick={()=>reset()} className=" text-base py-1 px-3 capitalize rounded-lg">
                                            reset
                                        </button>
                                        <button type="submit" disabled={ Object.keys(dirtyFields).length  === 0 || !isValid} className="bg-stone-400 not:disabeld:hover:bg-stone-500 transition-colors text-base lg:text-xl py-2 px-5 capitalize rounded-lg disabled:opacity-70">
                                            { submitBtnLabel }
                                        </button>
                                    </>
                                )
                            }
                        </ActionContainer>
                    </div>
                </div>
            </FormContainer>
    )
}

export default ManagePostForm


