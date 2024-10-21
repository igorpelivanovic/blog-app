export type Post = {
    id: number,
    title: string,
    body: string,
    tags: string[],
    reactions: PostReaction,
    views: number,
    userId: number,
}

export type DeletedPost = Post & {
    isDeleted: boolean
    deletedOn: string
}

export type PostReaction = Record<'likes' | 'dislikes', number>

export type PreviewPost = Omit<Post, 'userId' | 'body'>

export type PostWithAuthor = Post & {
    username: string
}

export type NewPost = Pick<Post, 'title' | 'body' | 'tags' | 'userId'> & {
    image?: File
}

export type NewPostResponse= Omit<Post, 'reactions' | 'views'> & {}


