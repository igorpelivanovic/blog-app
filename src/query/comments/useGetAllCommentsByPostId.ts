import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query"
import { COMMENTS, POSTS } from "../../constants/queryKey"
import { getCommentsByPostId, IResponseData } from "../../api/comments"
import { IComment } from "../../types/comment"
import { HttpResponseHeaderForArrayData } from "../../types/httpResponse"


type UseCommentsByPostId = (postId: number) => UseInfiniteQueryResult<Test, Error>

type Test = {
    comments: IComment[]
    total: number
}

const useCommentsByPostId: UseCommentsByPostId = (postId: number) => {
    return useInfiniteQuery<HttpResponseHeaderForArrayData<IResponseData>, Error, Test, [string, string, number]>({
        queryKey: [COMMENTS, POSTS, postId],
        queryFn: (({ pageParam })=>getCommentsByPostId(postId, pageParam).then(res=>res.data)),
        select: (response=>(
            {...response, 
                pages: response.pages.flatMap(page=>((({ comments, total })=>({comments, total}))(page)))}
        )),
        getNextPageParam: (response)=>{
            const currentLenghtData: number = response.skip+response.comments.length 
            return response.total > currentLenghtData ? currentLenghtData : undefined
        },
    })
}

export { useCommentsByPostId }