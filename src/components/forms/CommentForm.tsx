import { FC, memo, useCallback } from "react";
import LoadSpinner from "../Loader";
import TextArea from "../ui/Form/TextArea";
import { SubmitHandler, useForm, UseFormReset } from "react-hook-form";
import { z } from "zod";
import { CommentsFormSchame } from "../../validation";
import { zodResolver } from "@hookform/resolvers/zod";

type FormAction = 'create' | 'edit'

export type SubmitCommentFormFn = (data: CommentFormType, resetFormFn: UseFormReset<CommentFormType>) => void

type CommentFormProps = {
    className?: string
    action?: FormAction
    commentData?: CommentFormType
    loadingInProgress?: boolean
    onSubmit: SubmitCommentFormFn
}

type CommentFormType = z.infer<typeof CommentsFormSchame>

const defaultFormValue: CommentFormType = {
    body: ""
}

const CommentForm: FC<CommentFormProps> = ( { className, commentData = defaultFormValue, loadingInProgress, onSubmit } ) => {

    const { handleSubmit, control, formState, reset } = useForm<CommentFormType>({
        defaultValues: commentData,
        resolver: zodResolver(CommentsFormSchame)
    })

    const onSubmitForm: SubmitHandler<CommentFormType> = useCallback((data)=>{
        onSubmit(data, reset)
    }, [onSubmit])

    return (
        <form className={className} onSubmit={handleSubmit(onSubmitForm)}>
            <TextArea<CommentFormType> control={control} name="body" className="block w-full h-32 outline-none resize-none border border-stone-300 p-2 rounded-md focus:border-green-500" placeholder="Enter your comment" />
            <div className="flex justify-end gap-2">
                {formState.isDirty && <button type="reset" className="py-1 px-4 bg-neutral-300 capitalize rounded-lg" onClick={()=>reset()}>reset</button>}
                <button type="submit" disabled={!formState.isValid || loadingInProgress} className="py-1 px-4 bg-green-500 capitalize rounded-lg disabled:opacity-50 inline-flex items-center space-x-1">
                    <span>publish</span>
                    {loadingInProgress && <LoadSpinner className="text-base" />}
                </button>
            </div>
        </form>
    )
}

export default memo(CommentForm)