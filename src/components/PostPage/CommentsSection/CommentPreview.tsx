import { FaThumbsUp } from "react-icons/fa"
import { memo, RefObject, useState } from "react"
import { IComment } from "../../../types/comment"
import { useUpdateComment } from "../../../query/comments/useUpdateComment"
import { useGetAuthUser } from "../../../query/auth/user"
import classNames from 'classnames';
import { Link } from "react-router-dom"
import { MdDelete, MdEdit } from "react-icons/md";
import CommentForm, { SubmitCommentFormFn } from "../../forms/CommentForm"
import { useLike } from "../../../hooks/useLike"
import { Stats as StatsContainer } from "../../ui/Post/PostContainer"
import { useCheckAuth } from "../../../hooks/useCheckAuth"
import { AlertType, useAlertStore } from "../../../state/alertsStore"
import { ALERTS_MESSAGE_COMMENTS } from "../../../constants/alertMessage"
import UserImg from "../../ui/UserImg"


type CommentPreviewProps = {
    comment: IComment
    elRef?: RefObject<HTMLDivElement>
}


const CommentPreview: React.FunctionComponent<CommentPreviewProps> = ( { comment, elRef } ) => {

    const {toggle, likes, isLiked} = useLike({initValue: comment.likes})
    const [ editComment, setEditComment ] = useState<boolean>(false)
    const updateComment = useUpdateComment()
    const addAlert = useAlertStore((state)=>state.addAlert)
    const { data: userData } = useGetAuthUser()

    const toggleLike = () => {
        const newLikes = toggle()
        updateComment.mutate({id: comment.id, likes: newLikes}, {
            onError: ()=>{
                toggle()
            },
            onSuccess: ()=>{
                addAlert({text: ALERTS_MESSAGE_COMMENTS.get('update') || '', type: AlertType.success})
            }
        })
        return
    }

    const onClickLikeBtn = useCheckAuth(toggleLike)


    const onSubmitEditForm: SubmitCommentFormFn = (data) => {
        console.log(data)
    }

    return (
        <div ref={elRef} className="pb-3 border-b border-zinc-300 flex gap-3 items-start">
            <Link to={`/profile/${comment.user.id}`} className="rounded-full overflow-hidden">
                <UserImg idUser={comment.user.id} className="size-11 rounded-full border-2 border-stone-700" />
            </Link>
            <div className="space-y-3 flex-grow">
                <div className="flex justify-between items-start">
                    <Link to={`/profile/${comment.user.id}`} className="font-semibold text-[18px] hover:underline">
                        {comment.user.username}
                    </Link>
                    {userData?.id === comment.user.id && (
                        <div className="space-x-2">
                            <button type="button" className="p-1 text-xl bg-slate-500" onClick={()=>setEditComment(val=>!val)}>
                                <span>
                                    <MdEdit />
                                </span>
                            </button>
                            <button type="button" className="p-1 text-xl bg-slate-500">
                                <span>
                                    <MdDelete />
                                </span>
                            </button>
                        </div>
                    )}
                </div>
                {editComment ? 
                    <CommentForm className="space-y-2" onSubmit={onSubmitEditForm} commentData={{body: comment.body}}></CommentForm>
                : 
                (
                    <div className="space-y-2">
                        <p>{comment.body}</p>
                        <div>
                            <button type="button" className={classNames("flex gap-1 items-center transition", isLiked && userData?.id ? 'text-green-600  hover:text-green-700': 'text-stone-500 hover:text-stone-900' )} onClick={onClickLikeBtn}>
                                <StatsContainer className="flex gap-1 items-center" statsContent={{icon: <FaThumbsUp />, value: likes}} />
                            </button>
                        </div>
                    </div>
                )
                }
                
            </div>
        </div>
    )
}

export default memo(CommentPreview)