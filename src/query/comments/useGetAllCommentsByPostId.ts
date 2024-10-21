import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query"
import { COMMENTS, POSTS } from "../../constants/queryKey"
import { getCommentsByPostId, IResponseData } from "../../api/comments"
import { IComment } from "../../types/comment"
import { HttpResponseHeaderForArrayData } from "../../types/httpResponse"


type UseCommentsByPostId = (postId: number) => UseInfiniteQueryResult<IComment, Error>

const useCommentsByPostId: UseCommentsByPostId = (postId: number) => {
    return useInfiniteQuery<HttpResponseHeaderForArrayData<IResponseData>, Error, IComment, [string, string, number]>({
        queryKey: [COMMENTS, POSTS, postId],
        queryFn: (({ pageParam })=>getCommentsByPostId(postId, pageParam).then(res=>res.data)),
        select: (response=>(
            {...response, 
                pages: response.pages.flatMap(page=>page.comments)}
        )),
        getNextPageParam: (response)=>{
            const currentLenghtData: number = response.skip+response.comments.length 
            console.log(response.total > currentLenghtData)

            return response.total > currentLenghtData ? currentLenghtData : undefined
        },
    })
}

export { useCommentsByPostId }