import { useMutation, useQueryClient } from "react-query"
import { UpdateCommentData } from "../../types/comment"
import { updateComment } from "../../api/comments"
import { COMMENTS, POSTS } from "../../constants/queryKey"

const useUpdateComment = ()=> {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (commentData: UpdateCommentData) => updateComment(commentData),
        onSuccess: (response)=>{
            queryClient.setQueryData([COMMENTS, POSTS, response.data.postId], ((data: any)=>{
                console.log(data)
                data.pages = data.pages.map((page: any)=>({...page, comments: page.comments.map((comment:any)=>comment.id === response.data.id ? response.data : comment)}))
                return data
            }))
            console.log(response)
        }
    })
}


export { useUpdateComment }