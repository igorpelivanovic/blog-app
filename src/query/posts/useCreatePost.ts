import { InfiniteData, useMutation, useQueryClient } from "react-query"
import { createPost } from "../../api/posts"
import { COMMENTS, POSTS } from "../../constants/queryKey"
import { useGetAuthUser } from "../auth/user"
import { useNavigate } from "react-router-dom"
import { NewPost, Post } from "../../types/post"
import { IResponseData } from "../../api/comments"
import { HttpResponseHeaderForArrayData } from "../../types/httpResponse"
import { generateId } from "../../utils/generateId"
import { useRef } from "react"

const useCreatePost = () => {
    const queryClient = useQueryClient()
    const { data: userData } = useGetAuthUser()
    const navigate = useNavigate()

    const imgRef = useRef<File | undefined>(undefined)

    if(!userData?.id){
        navigate('/singin')
        return
    }

    return useMutation({
        mutationFn: (data: Omit<NewPost, 'userId'>)=>{
            imgRef.current = data.image;
            return createPost({...data, userId: userData.id}).then(res=>res.data)
        },
        onSuccess: (data)=>{
            const formatNewPost: Post = {...data, reactions: { likes: 0, dislikes: 0}, views: 0, id: generateId() }
            queryClient.setQueryData<Post>([POSTS, formatNewPost.id], {image: imgRef.current ? URL.createObjectURL(imgRef.current) : null, ...formatNewPost})
            queryClient.setQueryData<InfiniteData<HttpResponseHeaderForArrayData<IResponseData>> | undefined>([COMMENTS, POSTS, formatNewPost.id], {pageParams: [], pages:[{comments: [], limit: 0, skip: 0, total: 0}]})
            navigate(`/post/${formatNewPost.id}`)
        },
        onSettled: ()=>{
            imgRef.current = undefined
            return
        }
    })
}

export { useCreatePost }