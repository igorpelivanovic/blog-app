import { ComponentProps, FC, memo, RefObject } from "react"
import { twMerge } from "tailwind-merge"
import { PreviewPost } from "../../types/post"
import PostCart from "../ui/Post/PostCart"
import ListContainer from "../ui/List/ListContainer"

export type PostListPropsBasic = Pick<ComponentProps<typeof ListContainer>, 'noData'> & {
    posts: PreviewPost[],
    className?: string
}

export type PostListProps = {
    lastElRef?: RefObject<HTMLDivElement> 
} & PostListPropsBasic


const defaultPostListClass: string = 'grid gap-x-8 gap-y-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'

const PostList: FC<PostListProps> = ({ className, posts, lastElRef , ...props })=>{
    return(
        <ListContainer {...props} data={posts} className={twMerge(defaultPostListClass, className)} >
            {
                (post, index)=><PostCart post={post} ref={index+1 === posts.length ? lastElRef : undefined} />
            }
        </ListContainer>
    )
}
export default memo(PostList)

