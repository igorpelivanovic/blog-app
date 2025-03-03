import { memo, useEffect, useRef } from "react"
import { useGetPostsBySearch } from "../../../query/posts/useSearchQuery"
import PostList from "../../PostList/PostList"
import { Link, useLocation } from "react-router-dom"
import { useSearchPopUpContext } from "../../../context/searchPopUpStore"


const SearchResultsContent: React.FunctionComponent< { searchValue: string}> = ({ searchValue }) => {
    const { data, hasNextPage } = useGetPostsBySearch({q: searchValue})

    const { clickOutSide } = useSearchPopUpContext()

    const isInitRender = useRef<boolean>(true)

    const location = useLocation()

    if(!data){
        return null
    }

    useEffect(()=>{
        if(!isInitRender.current){
            clickOutSide()
            return
        }
        isInitRender.current = false
    }, [location])

    return(
        <>
            { data.pages.length > 0  ? 
                <>
                    <div>
                        <p className="text-center font-semibold text-lg first-letter:capitalize">results for: '{searchValue}'</p>
                    </div>
                    <div className="overflow-auto">
                        <PostList posts={data.pages} className=" grid-cols-2 lg:grid-cols-3"></PostList>
                    </div>
                    {hasNextPage &&
                        <div className="text-center">
                            <Link to={{pathname: '/search', 'search': `?q=${searchValue}`}} className="bg-stone-600 text-stone-50 px-4 py-1 rounded-lg capitalize font-semibold">
                                more
                            </Link>
                        </div>
                    }
                </> :
                <p className="text-center py-4 first-letter:capitalize">not found any post with: <span className="font-semibold">'{searchValue}'</span></p>
            }
            
        </>
    )
} 


export default memo( SearchResultsContent )