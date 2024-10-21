import { FaThumbsUp } from "react-icons/fa"
import { memo, RefObject, useCallback, useState } from "react"
import { IComment } from "../../../types/comment"
import { useUpdateComment } from "../../../query/comments/useUpdateComment"
import { useGetAuthUser } from "../../../query/auth/user"
import { useAuthModalStore } from "../../../state/authPopUpStore"
import classNames from 'classnames';
import { Link } from "react-router-dom"
import { MdDelete, MdEdit } from "react-icons/md";
import CommentForm, { SubmitCommentFormFn } from "../../forms/commentForm"


type CommentPreviewProps = {
    comment: IComment
    elRef?: RefObject<HTMLDivElement>
}


const CommentPreview: React.FunctionComponent<CommentPreviewProps> = ( { comment, elRef } ) => {

    const [likes, setLikes] = useState<number>(comment.likes)

    const [isLiked, setIsLiked] = useState<boolean>(false)

    const [ editComment, setEditComment ] = useState<boolean>(false)

    const updateComment = useUpdateComment()

    const { data: userData } = useGetAuthUser()
    const showAuthModal = useAuthModalStore((state)=> state.show)

    const handleLike = useCallback(()=>{
        if(isLiked){
            setIsLiked(false)
            setLikes(val=>--val)}
        else {
            setIsLiked(true)
            setLikes(val=>++val)
        }
    }, [isLiked])

    const onClickLike = () => {
        if(!userData) {
            showAuthModal()
            return
        }
        handleLike()
        updateComment.mutate({id: comment.id, likes}, {
            onError: ()=>{
                handleLike()
            }
        })
        return
    }

    const onSubmitEditForm: SubmitCommentFormFn = (data, reset) => {
        console.log(data)
    }

    return (
        <div ref={elRef} className="pb-3 border-b border-zinc-300 flex gap-3 items-start">
            <Link to={`/profile/${comment.user.id}`} className="rounded-full overflow-hidden">
                <img src="https://avatar.iran.liara.run/public" className="size-11 rounded-full border-2 border-black" alt="user img" />
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
                            <button type="button" className={classNames("flex gap-1 items-center text-stone-500 hover:text-stone-900 transition", {'text-green-600': isLiked})} onClick={onClickLike}>
                                <FaThumbsUp />
                                {likes}
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