import { FaComment, FaThumbsUp } from "react-icons/fa"
import { PostWithAuthor } from "../../../types/post"
import PostTags from "../../PostList/PostTags"
import { useCallback } from "react"
import UserImg from "../../ui/UserImg"
import { Link } from "react-router-dom"
import { useGetAuthUser } from "../../../query/auth/user"
import ManagePostControllContainer from "../ManagePostSection/ManagePostControllContainer"

type PostHeaderDataProps = {
    postData: Omit<PostWithAuthor, 'body'>
}

const PostHeaderData: React.FunctionComponent<PostHeaderDataProps> = ( { postData: post }) => {

    const userData = useGetAuthUser()

    const onClickCommentsBtn = useCallback(()=>{
        document.getElementById("post-preiew-comments-section")?.scrollIntoView({
            behavior: 'smooth'
        })
    }, [])

    return (
        <>
            <div className="space-y-8 mb-10">
                <div>
                    <h2 className="first-letter:capitalize text-4xl font-bold">{post.title}</h2>
                </div>
                <div className="flex justify-between items-end rounded-md">
                    <Link to={`/profile/${post.userId}`} className="hover:underline inline-block group">
                        <div className="flex items-center gap-3">
                            <UserImg className="size-12 group-hover:brightness-[80%] rounded-full border-2 border-black" />
                            <span className="base font-semibold text-[18px]">{post.username}</span>
                        </div>
                    </Link>
                    {userData.data?.id === post.userId && <ManagePostControllContainer postId={post.id} />}
                </div>
                <div className="text-[18px] flex gap-6 border-t border-b py-3 px-2">
                    <button className="flex gap-1 items-center text-stone-500 hover:text-stone-900 transition">
                        <FaThumbsUp />
                        {post.reactions.likes}
                    </button>
                    <button className="flex gap-1 items-center text-stone-500 hover:text-stone-900 transition" onClick={onClickCommentsBtn}>
                        <FaComment />
                        2
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