import { POSTS, TAG } from "../../constants/queryKey"
import { fetchPostsByTag } from "../../api/posts"
import { useInfiniteQuery } from "react-query"
import { configOptions } from "./config/infinityQueryPosts"

type UseGetPostsByTagParams = {
    tagId: string,
    key?: string | string []
}

const useGetPostsByTag = ({ tagId, key: userQueryKey }: UseGetPostsByTagParams) =>{
    return useInfiniteQuery({
        ...configOptions,
        queryKey: [...[POSTS, TAG], userQueryKey].flat().filter(el=>el != undefined),
        queryFn: ({ pageParam: skip }) =>fetchPostsByTag({tagId, params: { skip }}).then(res=>res.data),
    })
}

export { useGetPostsByTag }