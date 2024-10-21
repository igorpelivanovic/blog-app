import { FC, memo, RefObject } from "react"
import { twMerge } from "tailwind-merge"
import PostElement from "./PostElement"
import { PreviewPost } from "../../types/post"

export type PostListPropsBasic = {
    posts: PreviewPost[],
    className?: string
}

export type PostListProps = {
    lastElRef?: RefObject<HTMLElement> 
} & PostListPropsBasic


const defaultPostListClass: string = 'grid gap-x-8 gap-y-10 grid-cols-4'

const PostList: FC<PostListProps> = ({ className, posts, lastElRef })=>{
    return(
        <div className={twMerge(defaultPostListClass, className)}>
            {posts.map((post, index)=><PostElement elRef={index+1 === posts.length ? lastElRef : undefined}  post={post} key={post.id} />)}
        </div>
    )
}

export default memo(PostList)