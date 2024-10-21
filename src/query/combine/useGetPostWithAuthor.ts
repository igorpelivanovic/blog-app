import { PostWithAuthor } from "../../types/post"
import { useGetPostById } from "../posts/useGetPostByIdQuery"
import { useGetUserById } from "../users/useGetUserById"

const useGetPostWithAuthor = (postId: number): PostWithAuthor | null => {
    
    const { data: postData } = useGetPostById(postId)
    if( !postData ) return null
    const { data: userData } = useGetUserById(postData.userId)

    if(!userData) return null
    
    return {
        ...postData,
        userId: userData.id,
        username: userData.username
    }

}

export { useGetPostWithAuthor }