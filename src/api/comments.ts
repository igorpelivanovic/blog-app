import { AxiosResponse } from "axios"
import { commentsAxios } from "../axios/comments"
import { IComment, INewComment, INewCommentResponse, UpdateCommentData } from "../types/comment"
import { HttpResponseHeaderForArrayData } from "../types/httpResponse"
import { authAxios } from "../axios/auth"
import { handleHttpRequest } from "../utils/handleHttpRequest"

export interface IResponseData {
    comments: IComment[]
}

const selectFields: string[] = ['id', 'body', 'postId', 'likes', 'user.id', 'user.username']

const getCommentsByPostId = async(id: number, skip?: number):Promise<AxiosResponse<HttpResponseHeaderForArrayData<IResponseData>>> =>  {
    return await handleHttpRequest<HttpResponseHeaderForArrayData<IResponseData>>({
        config: {
            params: {
                select: selectFields.join(","),
                skip,
                limit: 4
            },
            url: `/post/${id}`,
        },
        axios: commentsAxios
    })
    /* return commentsAxios.get<HttpResponseHeaderForArrayData<IResponseData>>(`/post/${id}`, {
        params: {
            select: selectFields.join(","),
            skip,
            limit: 4
        }
    }) */
}

const addComment = async(data: INewComment): Promise<AxiosResponse<INewCommentResponse>> => {
    return await handleHttpRequest<INewCommentResponse, INewComment>({
        config: {
            url: `${import.meta.env.VITE_COMMENTS_PREFIX}/add`,
            method: 'post',
            data
        },
        axios: authAxios
    })
/*     return authAxios.post<INewCommentResponse>(`${import.meta.env.VITE_COMMENTS_PREFIX}/add`, data)
 */}

const updateComment = async({id, ...commentData}: UpdateCommentData): Promise<AxiosResponse<IComment>> =>{
    return await handleHttpRequest<IComment>({
        axios: authAxios,
        config: {
            method: 'patch',
            data: commentData,
            url: `${import.meta.env.VITE_COMMENTS_PREFIX}/${id}`
        }
    })
/*     return authAxios.patch<IComment>(`${import.meta.env.VITE_COMMENTS_PREFIX}/${id}`, commentData)
 */}


export { getCommentsByPostId, addComment, updateComment }