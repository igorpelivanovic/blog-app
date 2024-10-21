import { useInfiniteQuery } from "react-query"
import { POSTS } from "../../constants/queryKey"
import { fetchPosts } from "../../api/posts"
import { configOptions } from "./config/infinityQueryPosts"

type UseGetPostsProps = {  
}

const useGetPosts = ({}: Partial<UseGetPostsProps> = {}) => {
    return useInfiniteQuery({
        ...configOptions,
        queryKey: [POSTS],
        queryFn: ({pageParam})=>fetchPosts({ skip: pageParam}).then(res=>res.data),
    })
}

export { useGetPosts }