import React, { useMemo } from "react"
import { twMerge } from "tailwind-merge"
import { Tag } from "../ui/Post/PostContainer"

type TagsContainerProps = {
    tags: string[]
    className?: string
    prefix?: string 
}

const defaultLinkClass: string = 'hover:underline inline-block'

const TagsContainer :React.FunctionComponent<TagsContainerProps> = ({ tags, className }) =>{

    const styleOfLink: string = useMemo(()=>twMerge(defaultLinkClass, className), [className])

    return (
        <>
            { tags.map(tag=><Tag key={tag} tag={tag} className={styleOfLink} />) }
        </>
    )
}

export default TagsContainer