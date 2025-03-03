import { memo, useCallback, useMemo, useState } from "react"
import TagsDropDownContainer from "./TagsContainer"
import { AnimatePresence } from "framer-motion"
import { useOutsideClick } from "../../../hooks/useOutsideClick"
import { useGetTags } from "../../../query/tags/useAllTagsQuery"
import PostTags from "../../PostList/PostTags"
import { FaTag } from "react-icons/fa"

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

    const sortedTags = useMemo(()=>tags.sort(), [tags])

    return(
        <>
            <div className="flex justify-between items-center mt-3 gap-3 md:max-w-3/4 overflow-hidden">
                <div className="hidden sm:block">
                    <div className="text-sm space-x-2">
                        <PostTags className="hover:underline capitalize text-base" tags={sortedTags.slice(0,5)} />
                    </div>
                </div>
                <div ref={refContainer} className="ml-0 md:mr-auto">
                    <button onClick={onClickShowContainerHandle} className="flex items-center gap-1 bg-stone-400 py-1 px-2 rounded hover:bg-stone-500 hover:text-stone-50">
                        <FaTag />
                        <span className="first-letter:capitalize">all tags</span></button>
                    <AnimatePresence>
                        {renderContainer && <TagsDropDownContainer tags={sortedTags} onClick={onClickHideContainerHandle} />}
                    </AnimatePresence>
                </div>
            </div>
        </>

    )
}


//<a href="" className="bg-black block mx-1 text-white px-5 py-1 text-sm capitalize rounded-[4px] border-[1px] border-gray">{el.slug}</a>

export default memo(TagsBox)