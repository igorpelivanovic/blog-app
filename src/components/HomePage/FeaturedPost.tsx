import { FaEye } from "react-icons/fa";
import { PreviewPost } from "../../types/post";
import { memo, useMemo } from "react";
import { generatePostImgUrlFromID } from "../../utils/generateImgUrl";
import { formatNumber } from "../../utils/formatNumber";
import TagLink from "../PostList/PostTags";

type FeaturedPostProps = {
    post: PreviewPost
}
const FeaturedPost: React.FunctionComponent<FeaturedPostProps> = ( { post } ) => {
    
    const imgUrl = useMemo(()=>generatePostImgUrlFromID(post.id, { width: 800, height: 500}), [post.id])
    const formatNumberOfView = useMemo(()=>formatNumber(post.views), [post.views])

    return(
        <article className="grid gap-1 grid-cols-10 overflow-hidden rounded-lg border border-gray-400 cursor-pointer group transition hover:box-shadow-2">
            <div className="col-span-6 aspect-5/3 overflow-hidden">
                <img src={imgUrl} className="w-full h-full object-cover group-hover:scale-110 transition" alt="feature_post_img" />
            </div>
            <div className="col-span-4 flex flex-col justify-between gap-7 pt-10 pb-5 px-8 border-l-[1px] border-black border-dashed">
                <div className="mt-0 mb-auto">
                    <h3 className="text-3xl ">
                        {post.title}
                    </h3>
                </div>
                <div className="flex justify-between items-end gap-5">
                    <span className="inline-flex items-center gap-1"><FaEye />{formatNumberOfView}</span>
                    <div className="gap-x-2 inline-flex flex-wrap-reverse flex-row-reverse post-tags-container">
                        <TagLink tags={post.tags} />
                    </div>
                </div>
            </div>
        </article>
    )
}


export default memo(FeaturedPost)