import { memo, useCallback } from "react"
import { createSearchParams, NavigateFunction, useNavigate } from "react-router-dom"
import { useGetPostsBySearch, useSearchQuery } from "../../../query/posts/useSearchQuery"
import PostList from "../../PostList/PostList"


const SearchResultsContent: React.FunctionComponent< { searchValue: string}> = ({ searchValue }) => {
    console.log(searchValue)
    const { data } = useGetPostsBySearch({q: searchValue})
    const navigate: NavigateFunction = useNavigate()
    const clickBtn = useCallback(()=>{
        navigate(
            {
                'pathname': "/search",
                'search': createSearchParams({q: searchValue}).toString()
            }
        )
    }, [])

    if(!data){
        return null
    }

    return(
        <>
            { data.pages.length > 0  ? 
                <>
                    <div>
                        <p className="text-center font-semibold text-lg first-letter:capitalize">results for: '{searchValue}'</p>
                    </div>
                    <div className="overflow-auto">
                        <PostList posts={data.pages} className="grid-cols-3 "></PostList>
                    </div>
                    {/* {data.pages.total > data.posts.length+data.skip &&
                        <div className="text-center">
                            <button onClick={clickBtn} type="button" className="bg-red-600 px-4 py-1 rounded-lg capitalize font-semibold">
                                more
                            </button>
                        </div>
                    } */}
                </> :
                <p className="text-center py-4 first-letter:capitalize">not found any post with: <span className="font-semibold">'{searchValue}'</span></p>
            }
            
        </>
    )
} 


export default memo( SearchResultsContent )