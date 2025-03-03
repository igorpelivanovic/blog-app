import CommentList from "./CommentList"
import NewCommentContainer from "./NewCommentContainer"
import { useCommentsByPostId } from "../../../query/comments/useGetAllCommentsByPostId"
import { useParams } from "react-router-dom"
import { useGetAuthUser } from "../../../query/auth/user"
import { useCounterLoader } from "../../../hooks/useCounterLoader"


const CommentsSection: React.FunctionComponent = () => {
    const { postId } = useParams<{postId: string}>()
    
    const { data: user } = useGetAuthUser()

    if( !postId ) return null

    const { data, fetchNextPage, hasNextPage, isFetching } = useCommentsByPostId(Number(postId))

    if(!data?.pages) return null
 
    const { ref, counter } = useCounterLoader<HTMLSpanElement>({initValue: 0, endValue: data.pages[0].total, duration: 500})

    return (
        <section className="space-y-7 scroll-my-16" id="post-preiew-comments-section">
            <div className="border-b-[3px] pt-2 pb-5"> 
                <h3 className="first-letter:uppercase font-semibold">
                    <span ref={ref} className="block text-5xl">{counter}</span>
                    <span className="block text-xl text-zinc-500">comments</span>
                </h3>
            </div>
            {user && <NewCommentContainer postId={Number(postId)} />}
            <CommentList comments={data.pages.flatMap(page=>page.comments)} fetchNextPage={fetchNextPage} hasMore={hasNextPage} isLoading={isFetching}  />
        </section>
    )
}

export default CommentsSection