import { ComponentProps } from "react"
import PostList, { PostListPropsBasic } from "./PostList"
import InfinityListContainer from "../InfinityListContainer"

type PostInifinityListProps = Omit<ComponentProps<typeof InfinityListContainer>, 'children'> & PostListPropsBasic


const PostInifinityList: React.FunctionComponent<PostInifinityListProps> = ( { posts, className, noData, ...props } ) =>{

    return <InfinityListContainer {...props} >
        {
            (lastElRef)=><PostList className={className} noData={noData} posts={posts} lastElRef={lastElRef} />
        } 
    </InfinityListContainer>
}

export default PostInifinityList

