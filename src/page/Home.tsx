import { FunctionComponent, memo } from "react"
import TagsBox from "../components/HomePage/Tags/TagsBox"
import PageSection from "../components/PageSection"
import LoadSpinner from "../components/Loader"
import { useGetPosts } from "../query/posts/useGetPostsQuery"
import InfinityListContainer from "../components/InfinityListContainer"
import PostList from "../components/PostList/PostList"
import FeaturedPostCart from "../components/ui/Post/FeaturedPostCart"

const HomePage: FunctionComponent = () => {
    
    const { fetchNextPage, isFetchingNextPage, data, hasNextPage } = useGetPosts()

    if(!data?.pages) return null

    const featuredPost = data.pages[0]
    const latestPost = data.pages.slice(1)

    return(
        <>
            <nav className="relative">
                <TagsBox />
            </nav>
            <PageSection sectionTitle='featured'>
                <FeaturedPostCart post={featuredPost} />
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