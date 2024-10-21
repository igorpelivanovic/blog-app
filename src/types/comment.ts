import { IUser } from "./user"

export interface IComment {
    id: number
    body: string
    postId: number
    likes: number
    user: IUser
}

export interface INewComment extends Pick<IComment, 'body' | 'postId'> {
    userId: number
}

export interface INewCommentResponse extends Omit<INewComment, 'userId'>, Pick<IComment, 'id' | 'user'> {}

export interface UpdateCommentData extends Omit<Partial<IComment>, 'id'>, Pick<IComment, 'id'> {}