import { FC, memo, useCallback } from "react";
import LoadSpinner from "../Loader";
import { UseFormReset, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { CommentsFormSchame } from "../../validation";
import FormContainer from "../ui/Form/FormContainer";
import CustomTextArea from "../ui/Form/CustomTextArea";
import ActionContainer from "../ui/Form/ActionContainer";


export type SubmitCommentFormFn = (data: CommentFormType, resetFormFn: UseFormReset<CommentFormType>) => void

type CommentFormProps = {
    className?: string
    commentData?: CommentFormType
    loadingInProgress?: boolean
    onSubmit: SubmitCommentFormFn
}



type CommentFormType = z.infer<typeof CommentsFormSchame>

const defaultFormValue: CommentFormType = {
    body: ""
}

const CommentForm: FC<CommentFormProps> = ( { className, commentData = defaultFormValue, loadingInProgress, onSubmit } ) => {

    const onSubmitForm = useCallback((data: CommentFormType, { reset }: UseFormReturn<CommentFormType>)=>{
        onSubmit(data, reset)
    }, [onSubmit])

    return (
        <FormContainer<CommentFormType> formParams={{defaultValues: commentData, validation: CommentsFormSchame}} className={className} onSubmit={onSubmitForm}>
            <CustomTextArea<CommentFormType> name="body" className="block w-full h-32 outline-none resize-none border border-stone-300 p-2 rounded-md focus:border-green-500" placeholder="Enter your comment" />
            <ActionContainer>
                {
                    ({ formState: {isValid, isDirty}, reset})=>(
                        <div className="flex justify-end gap-2">
                            {isDirty && <button type="reset" className="py-1 px-4 bg-neutral-300 capitalize rounded-lg" onClick={()=>reset()}>reset</button>}
                            <button type="submit" disabled={ !isValid || loadingInProgress} className="py-1 px-4 bg-stone-500 text-stone-50 hover:enabled:bg-stone-600 capitalize rounded-lg disabled:opacity-50 inline-flex items-center space-x-1">
                                <span>publish</span>
                                {loadingInProgress && <LoadSpinner className="text-base"/>}
                            </button>
                        </div>
                    )
                }
            </ActionContainer>
        </FormContainer>
    )
}

export default memo(CommentForm)
