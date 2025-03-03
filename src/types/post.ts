import { IUser } from "./user"
import { Optional } from "./utils"

export type Post = {
    id: number,
    title: string,
    body: string,
    tags: string[],
    reactions: PostReaction,
    views: number,
    userId: number,
    image?: string | null
}

export type DeletedPost = Post & {
    isDeleted: boolean
    deletedOn: string
}

export type PostReaction = Record<'likes' | 'dislikes', number>

export type PreviewPost = Omit<Post, 'userId' | 'body'>

export interface IPostWithAuthor extends Post, Omit<IUser, 'id'>{}

export type NewPost = Pick<Post, 'title' | 'body' | 'tags' | 'userId'> & {
    image?: File
}

export type UpdatePost = Omit<Optional<Post>, 'id' | 'userId' | 'views' | 'image' > & Pick<Post, 'id'> & {
    image?: File
}

export type NewPostResponse= Omit<Post, 'reactions' | 'views'> & {}


