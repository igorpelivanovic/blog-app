import { FC } from "react";
import { z } from "zod";
import { CommentsFormSchame } from "../../../validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextArea from "../../ui/Form/TextArea";
import { useCreateComment } from "../../../query/comments/useCreateComment";
import LoadSpinner from "../../Loader";
import CommentForm, { SubmitCommentFormFn } from "../../forms/commentForm";

type CommentFormType = z.infer<typeof CommentsFormSchame>

type NewCommentContainerProps = {
    postId: number
}

const NewCommentContainer: FC<NewCommentContainerProps> = ( {postId} ) => {

    
    const createComment = useCreateComment()

    const sumbitForm: SubmitCommentFormFn = (data, reset)=>{
        if(createComment?.isLoading) return 
        createComment?.mutate({...data, postId}, {
            onSuccess: ()=>reset()
        })
    }

    return (
        <div className="flex gap-4"> 
            <img src="https://avatar.iran.liara.run/public" className="size-11 rounded-full border-2 border-black" alt="user img" />
            <div className="flex-1">
                <CommentForm onSubmit={sumbitForm} className="w-full space-y-3" loadingInProgress={createComment?.isLoading}></CommentForm>
            </div>
        </div>
    )
}

export default NewCommentContainer