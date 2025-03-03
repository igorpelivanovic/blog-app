import DropDownContainer from "../../DropDownContainer"
import PostTags from "../../PostList/PostTags"

type TagsDropDownContainerProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>)=>void
    tags: string[]
}

const TagsDropDownContainer:React.FunctionComponent<TagsDropDownContainerProps> = ({ onClick, tags }) => {
    return(
      <DropDownContainer className="w-4/5">
          <div className="mt-5">
              <p className="first-letter:capitalize text-2xl font-semibold">all tags</p>
          </div>
          <div className="mt-2 overflow-auto flex flex-wrap justify-center gap-x-3 gap-y-5 capitalize px-5">
              <PostTags tags={tags} className="bg-stone-300 hover:bg-stone-500 hover:text-stone-50 py-1 px-3 rounded-[4px] hover:no-underline" />
          </div>
          <div className="text-end mb-5">
              <button type="button" onClick={onClick} className="capitalize bg-stone-700 text-stone-50 py-1 px-4 rounded-md font" >close</button>
          </div>
      </DropDownContainer>
    )
}

export default TagsDropDownContainer