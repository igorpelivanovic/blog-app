import { FunctionComponent, memo } from "react";
import { useGetPostsByTag } from "../../../query/posts/useGetPostsByTagQuery";
import { useParams } from "react-router-dom";
import RecomendedPostSection, { RecomendedPostSectionLinkProps } from "./RecomendedSection";
import { useGetPostById } from "../../../query/posts/useGetPostByIdQuery";

const numberOfPostsForList: number = 4

const MoreFromTagPostSection: FunctionComponent = () => {

    const { postId } = useParams<{postId: string}>()

    if(!postId) return null

    const { data: postData } = useGetPostById(Number(postId))
    
    if(!postData) return null

    const tagLabel: string = postData.tags[0]


    const { data: posts } = useGetPostsByTag({tagId: tagLabel})

    if(!posts?.pages) return null

    const filterData = posts.pages.filter(data=>data.id!==Number(postId))

    const sliceData = filterData.slice(0, numberOfPostsForList)
 
    const link: RecomendedPostSectionLinkProps = {
        to: `/tag/${tagLabel}`,
        title: `see more from ${tagLabel}`
    }

    return (
        <>
            {sliceData.length > 0 &&
            <RecomendedPostSection posts={sliceData} title={"recomended from "+tagLabel+" tag"} link={link} haveMore={filterData.length > sliceData.length} />}
        </>
    )
}

export default memo(MoreFromTagPostSection)