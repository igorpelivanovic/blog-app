import { FunctionComponent } from "react";
import { PreviewPost } from "../../../types/post";
import PostList from "../../PostList/PostList";
import { Link } from "react-router-dom";

type RecomendedPostSectionProps = {
    posts: PreviewPost[]
    title: string
    link: RecomendedPostSectionLinkProps
    haveMore?: boolean
}

export type RecomendedPostSectionLinkProps = Record< "title" | "to",string>

const RecomendedPostSection: FunctionComponent<RecomendedPostSectionProps> = ( { title, posts, link: { to, title: linkTitle}, haveMore = true} ) => {
    return (
        <div>
            <div className="mb-6">
                <p className="capitalize font-semibold text-xl">{title}</p>
            </div>
            <PostList posts={posts} />
            {haveMore && 
            (
                <div className="border-t border-stone-300 py-4 mt-12">
                    <Link to={to} className="py-[5px] px-5 rounded-full block first-letter:capitalize w-fit text-[14px] border border-gray-600">{linkTitle}</Link>
                </div>
            )}
        </div>
    )
}

export default RecomendedPostSection