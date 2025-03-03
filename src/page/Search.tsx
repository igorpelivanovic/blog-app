import { FC, memo, useMemo } from "react"
import PageSection from "../components/PageSection"
import LoadSpinner from "../components/Loader"
import PostInifinityList from "../components/PostList/PostInfinityList"
import { useSearchValue } from "../hooks/useSearchFromValue"
import { useLocation } from "react-router-dom"
import { useGetPostsBySearch } from "../query/posts/useSearchQuery"
import { LuSearchX } from "react-icons/lu";


const sectionTitlePrefix: string = 'results for search'

const SearchPage = () => {
    
    const searchParam = useSearchValue()
    const { key } = useLocation()

    const { data: posts, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetPostsBySearch({q: searchParam, key})

    const sectionTitle = useMemo(()=>`${sectionTitlePrefix}: "${searchParam}"`, [searchParam])

    return(
        <> 
            <PageSection sectionTitle={sectionTitle}>
                <PostInifinityList noData={<NoResults></NoResults>} fetchNextPage={fetchNextPage} isLoading={isFetchingNextPage} hasMore={hasNextPage} posts={posts?.pages || []} loader={<LoadSpinner/>} />
            </PageSection>
        </>
    )
}

const NoResults: FC = () => {
    return (
        <div className="flex flex-col items-center gap-5 mt-36">
            <LuSearchX className="text-6xl" />
            <p className="text-center text-xl">No results found</p>
        </div>
    )
}

export default memo(SearchPage)