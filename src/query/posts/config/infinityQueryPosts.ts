import { UseInfiniteQueryOptions } from "react-query"
import { IPostsResponse } from "../../../api/posts"
import { HttpResponseHeaderForArrayData } from "../../../types/httpResponse"
import { PreviewPost } from "../../../types/post"

type ConfigOptions = Omit<UseInfiniteQueryOptions<
HttpResponseHeaderForArrayData<IPostsResponse>, 
unknown,
PreviewPost,
HttpResponseHeaderForArrayData<IPostsResponse>,
any[]
>, 'queryKey' | 'queryFn'>


const halfHourInMilisecond: number = 30 * 60 * 1000

const configOptions: ConfigOptions = {
    getNextPageParam: (response) => {
        const curentLenghtData = response.skip + response.posts.length
        return response.total > curentLenghtData ? curentLenghtData : undefined
    },
    select: (data)=>{
        const dataPost = data.pages.flatMap((curentPage)=>curentPage.posts)
        return {
            pages: dataPost,
            pageParams: data.pageParams
        }
    },
    cacheTime: 0,
    staleTime: halfHourInMilisecond
}

export { configOptions }