import { memo, useMemo } from "react"
import PageSection from "../components/PageSection"
import LoadSpinner from "../components/Loader"
import PostInifinityList from "../components/PostList/PostInfinityList"
import { useSearchValue } from "../hooks/useSearchFromValue"
import { useLocation, useNavigate } from "react-router-dom"
import { useGetPostsBySearch } from "../query/posts/useSearchQuery"

const sectionTitlePrefix: string = 'results for search'

const SearchPage = () => {
    
    const searchParam = useSearchValue()
    const { key } = useLocation()
    const navigate = useNavigate()

    if(searchParam === null || searchParam === undefined){
        navigate("")
        return
    } 

    const { data: posts, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetPostsBySearch({q: searchParam, key})

    const sectionTitle = useMemo(()=>`${sectionTitlePrefix}: "${searchParam}"`, [searchParam])

    if(!posts?.pages) return null

    return(
        <> 
            <PageSection sectionTitle={sectionTitle}>
                <PostInifinityList fetchNextPage={fetchNextPage} isLoading={isFetchingNextPage} hasMore={hasNextPage} posts={posts.pages} loader={<LoadSpinner/>} />
            </PageSection>
        </>
    )
}

export default memo(SearchPage)