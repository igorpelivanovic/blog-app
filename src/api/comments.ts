import { AxiosResponse } from "axios"
import { commentsAxios } from "../axios/comments"
import { IComment, INewComment, INewCommentResponse, UpdateCommentData } from "../types/comment"
import { HttpResponseHeaderForArrayData } from "../types/httpResponse"

export interface IResponseData {
    comments: IComment[]
}

const selectFields: string[] = ['id', 'body', 'postId', 'likes', 'user.id', 'user.username']

const getCommentsByPostId = (id: number, skip?: number):Promise<AxiosResponse<HttpResponseHeaderForArrayData<IResponseData>>> =>  {
    return commentsAxios.get<HttpResponseHeaderForArrayData<IResponseData>>(`/post/${id}`, {
        params: {
            select: selectFields.join(","),
            skip,
            limit: 4
        }
    })
}

const addComment = (data: INewComment): Promise<AxiosResponse<INewCommentResponse>> => {
    return commentsAxios.post<INewCommentResponse>("/add", data)
}

const updateComment = ({id, ...commentData}: UpdateCommentData): Promise<AxiosResponse<IComment>> =>{
    return commentsAxios.patch<IComment>(`/${id}`, commentData)
}


export { getCommentsByPostId, addComment, updateComment }