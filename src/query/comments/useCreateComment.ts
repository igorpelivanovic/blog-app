import { InfiniteData, useMutation, useQueryClient } from "react-query"
import { IComment, INewComment } from "../../types/comment"
import { useGetAuthUser } from "../auth/user"
import { useNavigate } from "react-router-dom"
import { addComment, IResponseData } from "../../api/comments"
import { COMMENTS, POSTS } from "../../constants/queryKey"
import { HttpResponseHeaderForArrayData } from "../../types/httpResponse"
import { generateId } from "../../utils/generateId"

const useCreateComment = () => {

    const queryClient = useQueryClient()
    const { data: userData} = useGetAuthUser()
    const navigate = useNavigate()

    if(!userData){
        navigate("/sing-in")
        return 
    }

    return useMutation({
        mutationFn: (data: Omit<INewComment, 'userId'>) => addComment({...data, userId: userData.id}),
        onSuccess: (response)=>{
            queryClient.setQueryData<InfiniteData<HttpResponseHeaderForArrayData<IResponseData>> | undefined>([COMMENTS, POSTS, response.data.postId],(data)=>{
                const oldData: InfiniteData<HttpResponseHeaderForArrayData<IResponseData>> = data || { pages: [], pageParams: []} 
                const formatNewComment: IComment = {...response.data, likes: 0, id: generateId()}
                if(oldData.pages[0]){
                    oldData.pages[0].comments.unshift(formatNewComment)
                    oldData.pages[0].total+=1
                    return oldData
                }
                oldData.pages.push({
                    comments: [formatNewComment],
                    total: 1,
                    skip: 0,
                    limit: 1,
                })
                return oldData
            })
        }
    })
}

export { useCreateComment }