import { useMutation } from "react-query"
import { deletePost } from "../../api/posts"

const useDeletePost = ()=>{
    return useMutation({
        mutationFn: (id: number)=>deletePost(id)
    })
}

export { useDeletePost }