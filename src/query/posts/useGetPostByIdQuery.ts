import { useQuery, useQueryClient } from "react-query"
import { POSTS } from "../../constants/queryKey"
import { fetchPostById } from "../../api/posts"


const useGetPostById = ( postId: number ) => {
    return useQuery({
        queryKey: [POSTS, postId],
        queryFn: ()=> fetchPostById(postId).then(res=>res.data),
        staleTime: Infinity
    })
}

export { useGetPostById }