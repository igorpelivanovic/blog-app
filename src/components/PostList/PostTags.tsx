import React, { useMemo } from "react"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

type PostTagsProps = {
    tags: string[]
    className?: string
    prefix?: string 
}

const defaultLinkClass: string = 'hover:underline tag-link'

const PostTags :React.FunctionComponent<PostTagsProps> = ({ tags, className }) =>{

    const styleOfLink: string = useMemo(()=>twMerge(defaultLinkClass, className), [className])

    return (
        <>
            {tags.map(tag=><Link key={tag} to={{ pathname: `/tag/${tag}` }} className={styleOfLink} >{tag}</Link>)}
        </>
    )
}

export default PostTags