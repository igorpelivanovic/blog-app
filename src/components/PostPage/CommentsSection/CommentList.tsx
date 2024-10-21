import { FunctionComponent, RefObject } from "react"
import CommentPreview from "./CommentPreview"
import { twMerge } from "tailwind-merge"
import { IComment } from "../../../types/comment"
import LoadSpinner from "../../Loader"

type CommentListProps = {
    comments: IComment[]
    lastElRef?: RefObject<HTMLDivElement>
    clasName?: string
    fetchNextPage: Function
    hasMore: boolean | undefined
    isLoading: boolean
}

const defaultListClass: string = 'space-y-5'

const CommentList: FunctionComponent<CommentListProps> = ( {comments, clasName, fetchNextPage, hasMore, isLoading} ) => {

    return( 
        <>
        <div>
            <div className={twMerge(defaultListClass, clasName)}>
                {   
                    comments.length < 1 ? 
                    <p className="text-center first-letter:capitalize text-[18px] py-4 text-neutral-500">don't have comment yet</p> :
                    comments.map((comment)=><CommentPreview key={comment.id} comment={comment} />)
                }
            </div>
            <div className="text-center py-5">
            {
                hasMore && !isLoading && 
                <button type="button" className="bg-slate-800 py-2 px-4 rounded-lg first-letter:uppercase" onClick={()=>fetchNextPage()}>
                    more comments
                </button>
            }
            {
                isLoading && <LoadSpinner />
            }
            </div>
        </div>
            
        </>
    )
}

export default CommentList