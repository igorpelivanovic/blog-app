import { useInfiniteQuery, UseInfiniteQueryOptions } from "react-query"
import { POSTS, USERS } from "../../constants/queryKey"
import { defQueryParamsPreviewPosts, fetchPostsByUserId, IPostsResponse, PostsApiParams } from "../../api/posts"
import { configOptions } from "./config/infinityQueryPosts"
import { useMemo } from "react"
import { HttpResponseHeaderForArrayData } from "../../types/httpResponse"
import { PreviewPost } from "../../types/post"

const useGetPostsByUserId = (userId: number, params?: PostsApiParams, configQueryOptions?: Omit<UseInfiniteQueryOptions<
    HttpResponseHeaderForArrayData<IPostsResponse>, 
    unknown,
    PreviewPost,
    HttpResponseHeaderForArrayData<IPostsResponse>,
    any[]
    >, 'queryKey' | 'queryFn'>) => {
    
    const formatParams = useMemo(()=>({...defQueryParamsPreviewPosts, ...params}), [JSON.stringify(params)])

    return useInfiniteQuery(
        {
            ...configOptions,
            queryKey: [POSTS, USERS, userId.toString(), formatParams],
            queryFn: ({pageParam: skip})=>fetchPostsByUserId(userId, {...formatParams, ...(skip && skip)}).then(res=>res.data),
            cacheTime: 30 * 60 * 1000,
            ...configQueryOptions
        }
    )
}

export { useGetPostsByUserId }