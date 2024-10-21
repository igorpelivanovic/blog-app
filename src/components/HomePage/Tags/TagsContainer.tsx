import { HTMLMotionProps, motion } from "framer-motion"
import { forwardRef, LegacyRef, MouseEventHandler } from "react"
import DropDownContainer from "../../DropDownContainer"
import { Link } from "react-router-dom"
import PostTags from "../../PostList/PostTags"


const animateConfigData: HTMLMotionProps<'div'> = {
    initial: {
        opacity: 0,
        height: 0,
    },
    animate: {
        opacity: 1,
        height: "auto",

    },
    transition: {
        duration: .4,
        ease: 'easeInOut',
        opacity: {
            duration: .2,
            ease: 'easeInOut',
        }
    },
    exit: {
        opacity: 0,
        height: 0,
    }
}

type TagsContainerProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>)=>void
    tags: string[]
}

const TagsContainer:React.FunctionComponent<TagsContainerProps> = ({ onClick, tags }) => {
    return(
      <DropDownContainer>
          <div className="mt-5">
              <p className="first-letter:capitalize text-2xl font-semibold">all tags</p>
          </div>
          <div className="mt-2 overflow-auto flex flex-wrap justify-center gap-x-3 gap-y-5 capitalize px-5">
              <PostTags tags={tags} className="bg-red-500 py-1 px-3 rounded-[4px] hover:no-underline" />
          </div>
          <div className="text-end mb-5">
              <button type="button" onClick={onClick} className="capitalize bg-red-700 py-1 px-4 rounded-md font" >close</button>
          </div>
      </DropDownContainer>
    )
}

export default TagsContainer