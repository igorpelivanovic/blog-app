import { memo, useCallback, useState } from "react"
import TagsContainer from "./TagsContainer"
import { AnimatePresence } from "framer-motion"
import { useOutsideClick } from "../../../hooks/useOutsideClick"
import { useGetTags } from "../../../query/tags/useAllTagsQuery"
import PostTags from "../../PostList/PostTags"

const TagsBox = () => {

    const { data: tags } = useGetTags()

    const [ renderContainer, setRenderContainer ] = useState<boolean>(false)

    const onClickHideContainerHandle = useCallback(() => {
        if(renderContainer) setRenderContainer(prev => !prev)
        return
    }, [ renderContainer ])

    const { ref: refContainer } = useOutsideClick({clickOutSideFn: onClickHideContainerHandle})

    const onClickShowContainerHandle = () => {
        if(!renderContainer) setRenderContainer(prev => !prev)
        return
    }

    if(!tags) return null

    return(
        <>
            <div className="max-w-half overflow-hidden">
                <div className="flex text-sm">
                    <PostTags className="hover:no-underline" tags={tags}></PostTags>
                </div>
            </div>
            <div ref={refContainer} className="ml-0 mr-auto">
                <button onClick={onClickShowContainerHandle} >more</button>
                <AnimatePresence>
                    {renderContainer && <TagsContainer tags={tags} onClick={onClickHideContainerHandle} />}
                </AnimatePresence>
            </div>
        </>

    )
}


//<a href="" className="bg-black block mx-1 text-white px-5 py-1 text-sm capitalize rounded-[4px] border-[1px] border-gray">{el.slug}</a>

export default memo(TagsBox)