import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react'
import { PreviewPost } from '../../../types/post'
import * as Post from './PostContainer'
import { Link } from 'react-router-dom'
import { FaEye, FaThumbsUp } from 'react-icons/fa'

type PostCartProps = {
    post: PreviewPost
}

const PostCart: ForwardRefExoticComponent<PostCartProps & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, PostCartProps>(( { post }, ref ) =>{
    return(
        <Post.Container ref={ref} post={post} className='grid-rows-subgrid gap-0 row-span-2 border-gray-500 transition-shadow'>
            <div className="aspect-square relative overflow-hidden">
                <Link to={`/post/${post.id}`} className="border-image-fill-gradient-before group-hover:border-image-fill-gradient-before-hover">
                    <Post.Image />
                    <div className="absolute top-full group-hover:-translate-y-full left-0 flex gap-2 justify-between w-full transition py-1 px-2">
                        <Post.Stats className='inline-flex items-center gap-1 flex-grow-0 flex-shrink basis-1/2 overflow-hidden'  statsContent={{value: post.reactions.likes, icon: <FaThumbsUp />}}></Post.Stats>
                        <Post.Stats className='inline-flex items-center gap-1 flex-grow-0 flex-shrink basis-1/2 overflow-hidden justify-end'  statsContent={{value: post.views, icon: <FaEye />}}></Post.Stats>
                    </div>
                </Link>
            </div>
            <div className="p-2 gap-2 flex flex-col justify-between overflow-hidden">
            <Link to={`/post/${post.id}`} className="font-semibold text-lg">
                <Post.Title className='font-semibold text-lg' />
            </Link>
            <Post.TagsContainer className='text-sm font-semibold text-gray-500 space-x-2 overflow-hidden text-end text-ellipsis post-tags-container'>
                {
                    (tag)=><Post.Tag tag={tag} />
                }
            </Post.TagsContainer>
            </div>
        </Post.Container>
    )
})

export default PostCart