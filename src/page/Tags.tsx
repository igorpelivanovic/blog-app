import { useMemo } from "react"
import LoadSpinner from "../components/Loader"
import PageSection from "../components/PageSection"
import PostInifinityList from "../components/PostList/PostInfinityList"
import { useLocation, useParams } from "react-router-dom"
import { useGetPostsByTag } from "../query/posts/useGetPostsByTagQuery"

const sectionTitlePrefix: string = 'results for tag'

const TagPage = () => {

    const { tagId } = useParams()
    const { key } = useLocation()
    
    if(!tagId) return null

    const {data, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetPostsByTag({ tagId, key})

    const sectionTitle = useMemo(()=>`${sectionTitlePrefix}: "${tagId}"`, [tagId])

    if(!data?.pages) return null

    return <> 
        <PageSection sectionTitle={sectionTitle}>
            <PostInifinityList fetchNextPage={fetchNextPage} isLoading={isFetchingNextPage} hasMore={hasNextPage} posts={data.pages} loader={<LoadSpinner/>} />
        </PageSection>
    </>
}

export default TagPage