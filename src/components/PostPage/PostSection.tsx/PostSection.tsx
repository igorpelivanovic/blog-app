import PostHeaderImage from "./PostHeaderImage"
import PostHeaderData from "./PostHeaderData"
import PostBodyContent from "./PostBodyContent"
import { useParams } from "react-router-dom"
import { useGetPostWithAuthor } from "../../../query/combine/useGetPostWithAuthor"


const PostSection: React.FunctionComponent = () => {

    const { postId } = useParams<{postId: string}>()

    if( !postId ) return null

    const postData = useGetPostWithAuthor(Number(postId))

    if( !postData ) return null



    return (
        <section>
            {postData && (
                <>
                                <PostHeaderImage img={postData.image} imgUrlParam={postData.id} />
                <PostHeaderData postData={postData} />
                <PostBodyContent postContent={ postData.body } />
                </>

            )}
            
        </section>
    )
}

export default PostSection

