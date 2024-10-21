import { FaEye } from "react-icons/fa";
import { PreviewPost } from "../../types/post";
import { memo, RefObject, useMemo } from "react";
import { formatNumber } from "../../utils/formatNumber";
import { FaThumbsUp } from "react-icons/fa6";
import { generatePostImgUrlFromID } from "../../utils/generateImgUrl";
import PostTags from "./PostTags";
import { Link } from "react-router-dom";

type PostElementProps = {
  post: PreviewPost;
  elRef?: RefObject<HTMLElement>
};

const PostElement: React.FunctionComponent<PostElementProps> = ({ post, elRef }) => {

  const imgUrl = useMemo(
    () => generatePostImgUrlFromID(post.id),
    [post.id]
  );
  const formatNumberOfViews = useMemo(
    () => formatNumber(post.views),
    [post.views]
  );
  const formatNumberOfLikes = useMemo(
    () => formatNumber(post.reactions.likes),
    [post.reactions.likes]
  );

  return (
    <article ref={elRef} className="grid grid-rows-subgrid row-span-2 gap-0 border border-gray-500 rounded-lg overflow-hidden group transition-shadow hover:box-shadow-2">
      <div className="aspect-square relative overflow-hidden">
        <Link to={`/post/${post.id}`} className="border-image-fill-gradient-before group-hover:border-image-fill-gradient-before-hover">
          <img
            src={imgUrl}
            className="object-cover w-full h-full group-hover:scale-105 -z-[1] relative transition"
          />
          <div className="absolute top-full group-hover:-translate-y-full left-0 flex gap-2 justify-between w-full transition py-1 px-2">
            <p className="inline-flex items-center gap-1 flex-grow-0 flex-shrink basis-1/2 overflow-hidden">
              <span>
                <FaThumbsUp />
              </span>
              <span className="block overflow-hidden text-ellipsis">
                {formatNumberOfLikes}
              </span>
            </p>
            <p className="inline-flex items-center gap-1 flex-grow-0 flex-shrink basis-1/2 overflow-hidden justify-end">
              <span>
                <FaEye />
              </span>
              <span className="block overflow-hidden text-ellipsis">
                {formatNumberOfViews}
              </span>
            </p>
          </div>
        </Link>
        
      </div>
      <div className="p-2 gap-2 flex flex-col justify-between overflow-hidden">
      <Link to={`/post/${post.id}`} className="font-semibold text-lg">
        {post.title}
      </Link>
        <div className="text-sm font-semibold text-gray-500 space-x-2 overflow-hidden text-end text-ellipsis post-tags-container">
          <PostTags tags={post.tags} />
        </div>
      </div>
    </article>
  );
};

export default memo(PostElement);
