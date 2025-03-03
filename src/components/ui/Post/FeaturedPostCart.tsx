import { FC } from "react";
import * as Post from "./../../ui/Post/PostContainer"
import { PreviewPost } from "../../../types/post";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

type FeatuerdPostCartProps = {
    post: PreviewPost
}

const FeaturedPostCart: FC<FeatuerdPostCartProps> = ( { post } ) => {


    return (
        <Post.Container post={post} className="gap-1 grid-cols-10 border-gray-400 transition">
            <div className="col-span-10 self-stretch sm:col-span-6  overflow-hidden relative">
                <Link to={`/post/${post.id}`} className="border-image-fill-gradient-before group-hover:border-image-fill-gradient-before-hover">
                    <Post.Image placeholderImgDimemsion={{width: 200, height: 300}} imgDimemsion={{width: 800, height: 500}} className="w-full h-full object-cover group-hover:scale-110 transition" alt="feature_post_img" />
                </Link>
            </div>
            <div className="col-span-10 sm:col-span-4 flex flex-col justify-between gap-7 lg:pt-10 pt-2 pb-2 lg:pb-5 lg:px-8 px-3 border-l-[1px] border-black border-dashed">
                <Link to={`/post/${post.id}`}>
                    <Post.Title className="sm:text-xl lg:text-3xl text-xl md:text-2xl" />
                </Link>
                    <div className="flex justify-between items-end gap-5">
                        <Post.Stats className="flex items-center gap-1" statsContent={{value: post.views, icon: <FaEye />}} />
                        <Post.TagsContainer className="gap-x-2 inline-flex flex-wrap-reverse flex-row-reverse post-tags-container">
                            {
                                (tag)=><Post.Tag tag={tag} />
                            }
                        </Post.TagsContainer>
                    </div>
                </div>
        </Post.Container>
    )
}

export default FeaturedPostCart