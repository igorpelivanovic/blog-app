import { FunctionComponent } from "react"
import CommentPreview from "./CommentPreview"
import { twMerge } from "tailwind-merge"
import { IComment } from "../../../types/comment"
import LoadSpinner from "../../Loader"
import ListContainer from "../../ui/List/ListContainer"

type CommentListProps = {
    comments: IComment[]
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
            <ListContainer data={comments} className={twMerge(defaultListClass, clasName)} noData={<p className="text-center first-letter:capitalize text-[18px] py-4 text-neutral-500">don't have comment yet</p>}>
                {
                    (comment)=><CommentPreview key={comment.id} comment={comment} />
                }
            </ListContainer>
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