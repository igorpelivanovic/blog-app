import { useInfiniteQuery } from "react-query"
import { fetchPostsBySearch } from "../../api/posts"
import { POSTS } from "../../constants/queryKey"
import { configOptions } from "./config/infinityQueryPosts"

type UseGetPostsBySearchParams = {
  q: string
  key?: string | string[]
}

const useGetPostsBySearch = ({ q, key: queryKeyUser }: UseGetPostsBySearchParams) => {
  return useInfiniteQuery({
    ...configOptions,
    queryKey: [...[POSTS, q], queryKeyUser].flat().filter(val => val !== undefined),
    queryFn: ( { pageParam: skip } ) => fetchPostsBySearch({q, skip}).then(res=>res.data),
    cacheTime: 0,
    staleTime: Infinity,
  })
}

export { useGetPostsBySearch };
