import SearchContainer from "./Search/SearchContainer"
import TagsBox from "./Tags/TagsBox"

const HomePageHeader = () => {
    return(
        <div className="flex justify-between relative">
            <TagsBox />
            <SearchContainer />
        </div>
    )
}

export default HomePageHeader