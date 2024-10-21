import { useEffect } from "react"
import { useInView } from "../../hooks/useInView"
import PostList, { PostListPropsBasic } from "./PostList"

type PostInifinityListProps = {
    fetchNextPage: Function
    hasMore: boolean | undefined
    isLoading: boolean
    loader: React.ReactNode
} & PostListPropsBasic


const PostInifinityList: React.FunctionComponent<PostInifinityListProps> = ( { fetchNextPage, hasMore, posts, isLoading, loader } ) =>{

    const { elRef: lastElRef, isVisible } = useInView<HTMLElement>()

    useEffect(()=>{
        if(isVisible && hasMore && !isLoading){
            fetchNextPage()
        }
    }, [isVisible])

    return <>
        <PostList posts={posts} lastElRef={lastElRef} />
        {isLoading && loader}
    </>
}

export default PostInifinityList