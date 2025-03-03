import { FunctionComponent, memo } from "react";
import { useGetPostsByUserId } from "../../../query/posts/useGetPostsByUserIdPagination";
import RecomendedPostSection, { RecomendedPostSectionLinkProps } from "./RecomendedSection";
import { useParams } from "react-router-dom";
import { useGetPostWithAuthor } from "../../../query/combine/useGetPostWithAuthor";

/* type MoreFromUserPostsSectionProps = {
    userId: number
    username: string
} */

const numberOfPostsForList: number = 4

const MoreFromUserPostsSection: FunctionComponent = ( ) => {

    const { postId } = useParams<{postId: string}>()

    if(!postId) return null

    const data = useGetPostWithAuthor((Number(postId)))

    if(!data) return null

    const { data: responseData } = useGetPostsByUserId(data.userId)

    if(!responseData?.pages || !postId) return null

    const link: RecomendedPostSectionLinkProps = {
        to: "",
        title: ""
    }

    const filterData = responseData.pages.filter(data=>data.id!==Number(postId))

    const sliceData = filterData.slice(0, numberOfPostsForList)

    return (
        <>
            {sliceData.length > 0 &&
            <RecomendedPostSection posts={sliceData} title={"see more from "+data.username} link={link} haveMore={filterData.length > sliceData.length} />}
        </>
    )
} 


export default memo(MoreFromUserPostsSection)
