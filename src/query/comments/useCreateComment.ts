import { InfiniteData, useMutation, useQueryClient } from "react-query"
import { INewComment } from "../../types/comment"
import { useGetAuthUser } from "../auth/user"
import { useNavigate } from "react-router-dom"
import { addComment, IResponseData } from "../../api/comments"
import { COMMENTS, POSTS } from "../../constants/queryKey"
import { HttpResponseHeaderForArrayData } from "../../types/httpResponse"

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
                if(oldData.pages[0]){
                    oldData.pages[0].comments.unshift({
                        ...response.data, likes: 0,
                    })
                    return oldData
                }
                oldData.pages.push({
                    comments: [],
                    total: 0,
                    skip: 0,
                    limit: 0,
                })
                return oldData
            })
        }
    })
}

export { useCreateComment }