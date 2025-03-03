import React, { ComponentProps, FC, forwardRef, ForwardRefExoticComponent, PropsWithChildren, ReactNode, RefAttributes, useMemo } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { twMerge } from "tailwind-merge"
import { PostContext, usePostContext } from "../../../context/postStore"
import { PreviewPost } from "../../../types/post"
import noImgUrl from "./../../../assets/images/no-image.png"
import { generatePostImgUrlFromID, ImgDimension } from "../../../utils/generateImgUrl"
import { Link } from "react-router-dom"
import { formatNumber } from "../../../utils/formatNumber"


// CONTAINER

type PostContainerProps = ComponentProps<'article'> & PropsWithChildren & {
    post: PreviewPost 
}

const defaultStylePostContainerArticle: string = "grid border rounded-lg overflow-hidden group hover:box-shadow-2"

const Container: ForwardRefExoticComponent<PostContainerProps & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, PostContainerProps>(( {post, className, children}, ref) => {
    return (
        <PostContext.Provider value={post}>
            <article ref={ref} className={twMerge(defaultStylePostContainerArticle, className)}>
                {children}
            </article>
        </PostContext.Provider>

    )
})


// IMAGE

type ImageProps = ComponentProps<'img'> & Partial<Record<"placeholderImgDimemsion" | "imgDimemsion", undefined | ImgDimension>>


const defaultStyleImage: string= "object-cover w-full h-full group-hover:scale-105 -z-[1] relative transition"

const Image: FC<ImageProps> = ({className, imgDimemsion, placeholderImgDimemsion, ...props}) => {

    const post: PreviewPost = usePostContext()

    const imgUrl = useMemo(
        () => generatePostImgUrlFromID(post.id, imgDimemsion),
        [post.id]
      );
    
      const placeholderImgUrl = useMemo(
        () => generatePostImgUrlFromID(post.id, {...placeholderImgDimemsion, width: 50, height: 50}),
        [post.id]
      );

    return (
        <LazyLoadImage {...props} alt={'post '+post.id+' img'}  width="100%" height="100%" loading="lazy" onError={(e:React.SyntheticEvent<HTMLImageElement>)=>e.currentTarget.src=noImgUrl} placeholderSrc={placeholderImgUrl}  src={imgUrl}  className={twMerge(defaultStyleImage, className)} />
    )
}


// TITLE


const Title: FC<ComponentProps<'h3'>> = ( props ) => {

    const post: PreviewPost = usePostContext()

    return (
        <p {...props}>
            {post.title}
        </p>
    )
}

// TAGS CONTAINER

type TagsContainerProps = Omit<ComponentProps<'div'>, 'children'> & {
    children: (tag: string)=>ReactNode
}

const TagsContainer: FC<TagsContainerProps> = ( { children, ...props} ) => {

    const post: PreviewPost = usePostContext()

    const sortedTags = useMemo(()=>post.tags.sort(), [post.tags])

    return (
        <div {...props}>
            {sortedTags.map(el=><React.Fragment key={el} >{children(el)}</React.Fragment>)}
        </div>
    )
}



// TAG

type TagProps = ComponentProps<'a'> & {
    tag: string
}
const defaultStyleTag: string = 'hover:underline tag-link'

const Tag: FC<TagProps> = ({ tag, className, ...props }) => {
    return <Link key={tag} to={{ pathname: `/tag/${tag}`}} {...props} className={twMerge(defaultStyleTag, className)} >{tag}</Link>
}

type StatsProps = ComponentProps<'div'> & {
   statsContent: StatsContent
}

type StatsContent = {
    icon: ReactNode,
    value: number
}


// STATS

const Stats :FC<StatsProps> = ( { statsContent: { icon, value}, ...props} ) =>{
    
    const formatValue = useMemo(()=>formatNumber(value), [value])
    
    return (
        <div {...props}>
            <span>
                {icon}
              </span>
              <span className="block overflow-hidden text-ellipsis">
                {formatValue}
              </span>
        </div>
    )
}

export { Container, Title, TagsContainer, Tag, Stats, Image }