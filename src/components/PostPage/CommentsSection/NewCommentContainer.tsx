import { FC } from "react";
import { useCreateComment } from "../../../query/comments/useCreateComment";
import CommentForm, { SubmitCommentFormFn } from "../../forms/CommentForm";
import { ALERTS_MESSAGE_COMMENTS } from "../../../constants/alertMessage";
import { AlertType, useAlertStore } from "../../../state/alertsStore";
import UserImg from "../../ui/UserImg";
import { useGetAuthUser } from "../../../query/auth/user";


type NewCommentContainerProps = {
    postId: number
}

const NewCommentContainer: FC<NewCommentContainerProps> = ( {postId} ) => {

    
    const createComment = useCreateComment()
    const { data: userData } = useGetAuthUser()
    const addAlert = useAlertStore((state)=>state.addAlert)


    const sumbitForm: SubmitCommentFormFn = (data, reset)=>{
        if(createComment?.isLoading) return 
        createComment?.mutate({...data, postId}, {
            onSuccess: ()=>{
                reset();
                addAlert({text: ALERTS_MESSAGE_COMMENTS.get('add') || '', type: AlertType.success});
                return
            }
        })
    }

    if(!userData) return

    return (
        <div className="flex gap-4"> 
            <UserImg idUser={userData.id} className="size-11 rounded-full border-2 border-stone-700" />
            <div className="flex-1">
                <CommentForm onSubmit={sumbitForm} className="w-full space-y-3" loadingInProgress={createComment?.isLoading} />
            </div>
        </div>
    )
}

export default NewCommentContainer