import { useMutation, useQueryClient } from "react-query"
import { UpdatePost } from "../../types/post"
import { updatePost } from "../../api/posts"
import { POSTS } from "../../constants/queryKey"
import { useRef } from "react"

const useUpdatePost = () => {
    const imgRef = useRef<File | undefined>( undefined )
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (post: UpdatePost)=>{
            imgRef.current = post.image
            return updatePost(post)},
        onSuccess: ({data})=>{
            const format = {...data, image: imgRef.current ? URL.createObjectURL(imgRef.current) : null}
            queryClient.setQueryData([POSTS, data.id], format)
            return
        },
        onSettled: ()=>{
            imgRef.current = undefined
            return
        }
    })
}

export { useUpdatePost }