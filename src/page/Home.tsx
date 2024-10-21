import { FunctionComponent, memo } from "react"
import FeaturedPost from "../components/HomePage/FeaturedPost"
import TagsBox from "../components/HomePage/Tags/TagsBox"
import PageSection from "../components/PageSection"
import LoadSpinner from "../components/Loader"
import { useGetPosts } from "../query/posts/useGetPostsQuery"
import InfinityListContainer from "../components/InfinityListContainer"
import PostList from "../components/PostList/PostList"

const HomePage: FunctionComponent = () => {
    
    const { fetchNextPage, isFetchingNextPage, data, hasNextPage } = useGetPosts()

    if(!data?.pages) return null

    const featuredPost = data.pages[0]
    const latestPost = data.pages.slice(1)

    return(
        <>
            <nav className="flex justify-between relative h-10 items-center">
                <TagsBox></TagsBox>
            </nav>
            <PageSection sectionTitle='featured'>
                <FeaturedPost post={featuredPost} />
            </PageSection>
            <PageSection sectionTitle='latests'>
                <InfinityListContainer fetchNextPage={fetchNextPage} isLoading={isFetchingNextPage} hasMore={hasNextPage} loader={<LoadSpinner/>}>
                    {(elRef)=><PostList posts={latestPost} lastElRef={elRef} />}
                </InfinityListContainer>
            </PageSection>
        </>
    )
}

export default memo(HomePage)