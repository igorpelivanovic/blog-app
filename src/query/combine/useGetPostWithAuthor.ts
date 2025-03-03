import { IPostWithAuthor } from "../../types/post"
import { useGetPostById } from "../posts/useGetPostByIdQuery"
import { useGetUserById } from "../users/useGetUserById"

const useGetPostWithAuthor = (postId: number): IPostWithAuthor | null => {
    
    const { data: postData, isError: isPostError } = useGetPostById(postId)

    if( !postData || isPostError ) return null

    const { data: userData, isError: isUserError } = useGetUserById(postData.userId)

    if(!userData || isUserError) return null

    return {
        ...postData,
        userId: userData.id,
        username: userData.username,
    }

}

export { useGetPostWithAuthor }