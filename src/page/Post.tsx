import PostSection from "../components/PostPage/PostSection.tsx/PostSection"
import CommentsSection from "../components/PostPage/CommentsSection/CommentsSection"
import MoreFromUserPostsSection from "../components/PostPage/RecomendedPostsSection/MoreFromUserPostsSection"
import MoreFromTagPostSection from "../components/PostPage/RecomendedPostsSection/MoreFromTagPostSection"

const PostPage: React.FunctionComponent = () => {
    return(
        
        <div className="post-page-container space-y-16">
            <PostSection />
            <CommentsSection />
            <MoreFromUserPostsSection />
            <MoreFromTagPostSection />
        </div>
    )
}

export default PostPage