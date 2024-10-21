import { InfiniteData, useMutation, useQueryClient } from "react-query"
import { createPost } from "../../api/posts"
import { COMMENTS, POSTS } from "../../constants/queryKey"
import { useGetAuthUser } from "../auth/user"
import { useNavigate } from "react-router-dom"
import { NewPost, Post } from "../../types/post"
import { IResponseData } from "../../api/comments"
import { HttpResponseHeaderForArrayData } from "../../types/httpResponse"

const useCreatePost = () => {
    const queryClient = useQueryClient()
    const { data: userData } = useGetAuthUser()
    const navigate = useNavigate()

    if(!userData?.id){
        navigate('/singin')
        return
    }

    return useMutation({
        mutationFn: (data: Omit<NewPost, 'userId'>)=>createPost({...data, userId: userData.id}).then(res=>res.data),
        onSuccess: (data)=>{
            const formatNewPost: Post = {...data, reactions: { likes: 0, dislikes: 0}, views: 0 }
            queryClient.setQueryData<Post>([POSTS, data.id], formatNewPost)
            queryClient.setQueryData<InfiniteData<HttpResponseHeaderForArrayData<IResponseData>> | undefined>([COMMENTS, POSTS, data.id], {pageParams: [], pages:[{comments: [], limit: 0, skip: 0, total: 0}]})
            navigate(`/post/${data.id}`)
        }
    })
}

export { useCreatePost }