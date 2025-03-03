import { FaComment, FaThumbsUp } from "react-icons/fa"
import { IPostWithAuthor } from "../../../types/post"
import PostTags from "../../PostList/PostTags"
import { useCallback } from "react"
import UserImg from "../../ui/UserImg"
import { Link } from "react-router-dom"
import { useGetAuthUser } from "../../../query/auth/user"
import ManagePostControllContainer from "../ManagePostSection/ManagePostControllContainer"
import { useCommentsByPostId } from "../../../query/comments/useGetAllCommentsByPostId"
import { Stats as StatsContainer } from "../../ui/Post/PostContainer"
import { useLike } from "../../../hooks/useLike"
import classNames from "classnames"
import { useUpdatePost } from "../../../query/posts/useUpdatePost"
import { useCheckAuth } from "../../../hooks/useCheckAuth"

type PostHeaderDataProps = {
    postData: Omit<IPostWithAuthor, 'body'>
}

const PostHeaderData: React.FunctionComponent<PostHeaderDataProps> = ( { postData: post }) => {

    const {data: userData} = useGetAuthUser()
    const { data } = useCommentsByPostId(post.id)
    const { toggle, likes, isLiked } = useLike({ initValue: post.reactions.likes })
    const { mutate: updatePost } = useUpdatePost()


    const onClickCommentsBtn = useCallback(()=>{
        document.getElementById("post-preiew-comments-section")?.scrollIntoView({
            behavior: 'smooth'
        })
    }, [])

    const toggleLikeBtn = () => {
        const newLikes = toggle()
        updatePost({id: post.id, reactions: {likes: newLikes}}, {
            onError: ()=>{
                toggle()
            }
        })
        return
    }

    const onClickLike = useCheckAuth(toggleLikeBtn)


    if(!data?.pages) return 

    return (
        <>
            <div className="space-y-8 mb-10">
                <div>
                    <h1 className="first-letter:capitalize text-4xl font-bold">{post.title}</h1>
                </div>
                <div className="flex justify-between items-end rounded-md">
                    <Link to={`/profile/${post.userId}`} className="hover:underline inline-block group">
                        <div className="flex items-center gap-3">
                            <UserImg idUser={post.userId} className="size-12 group-hover:brightness-[80%] rounded-full border-2 border-stone-700" />
                            <span className="base font-semibold text-[18px]">{post.username}</span>
                        </div>
                    </Link>
                    {userData?.id === post.userId && <ManagePostControllContainer postId={post.id} />}
                </div>
                <div className="text-[18px] flex gap-6 border-t border-b py-3 px-2">
                    <button type="button" className={classNames( isLiked && userData?.id ? 'text-green-600  hover:text-green-700': 'text-stone-500 hover:text-stone-900' )} onClick={onClickLike}>
                        <StatsContainer className="flex gap-1 items-center" statsContent={{icon: <FaThumbsUp />, value: likes}} />
                    </button>
                    <button className="text-stone-500 hover:text-stone-900 transition" onClick={onClickCommentsBtn}>
                        <StatsContainer className="flex gap-1 items-center" statsContent={{icon: <FaComment />, value: data.pages[0].total}} />
                    </button>
                </div>
                <div className="space-x-2 text-base ">
                    <PostTags tags={post.tags} />
                </div>
            </div>
        </>
    )
}

export default PostHeaderData